/* ==========================================================================
   Wanderluxe — reusable card renderers
   ========================================================================== */

const TYPE_LABELS = {
  family: 'Family', budget: 'Budget', honeymoon: 'Honeymoon', adventure: 'Adventure',
  weekend: 'Weekend', group: 'Group tour', custom: 'Custom'
};

const FAV_KEY = 'wl_favs';

function isFav(id) { return store.get(FAV_KEY, []).includes(id); }

function destCard(d, delay = 0) {
  return `
  <article class="dcard reveal" data-delay="${delay}">
    <a class="dcard__media" href="destination.html?id=${encodeURIComponent(d.id)}" aria-label="${esc(d.name)}">
      <img src="${d.image}" alt="${esc(d.name)}, ${esc(d.state)}" loading="lazy">
      <span class="badge badge--glass dcard__badge">${esc(d.tags[0])}</span>
      <button class="dcard__fav ${isFav(d.id) ? 'is-on' : ''}" data-fav="${esc(d.id)}" aria-label="Save ${esc(d.name)}" type="button">${icon('heart')}</button>
      <span class="dcard__price"><small>from</small> ${money(d.price)}</span>
      <span class="dcard__rating">${icon('star')} ${d.rating}</span>
    </a>
    <div class="dcard__body">
      <p class="dcard__loc">${icon('mapPin')} ${esc(d.state)}, ${esc(d.country)}</p>
      <h3>${esc(d.name)}</h3>
      <p class="dcard__desc">${esc(d.tagline)}</p>
      <div class="dcard__foot">
        <span>Best: <b>${esc(d.bestTime.split('&')[0].trim())}</b></span>
        <a class="link-arrow" href="destination.html?id=${encodeURIComponent(d.id)}">Explore ${icon('arrowRight')}</a>
      </div>
    </div>
  </article>`;
}

function packageCard(p, delay = 0) {
  const onRequest = !!p.priceOnRequest;
  return `
  <article class="pcard reveal" data-delay="${delay}">
    <div class="pcard__media">
      <a href="package.html?id=${encodeURIComponent(p.id)}" aria-label="${esc(p.name)}">
        <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
      </a>
      <div class="pcard__top">
        <span class="badge ${p.region === 'international' ? 'badge--gold' : 'badge--brand'}">${p.region === 'international' ? 'International' : TYPE_LABELS[p.type]}</span>
        <span class="badge badge--glass">${icon('star')} ${p.rating}</span>
      </div>
      <span class="badge badge--glass pcard__duration">${p.days ? `${p.days}D / ${p.nights}N` : 'Flexible dates'}</span>
    </div>
    <div class="pcard__body">
      <div class="pcard__meta">${icon('mapPin')} ${esc(p.location)} ${icon('users')} ${esc(p.groupSize)}</div>
      <h3><a href="package.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
      <div class="pcard__highlights">
        ${p.highlights.slice(0, 3).map(h => `<span>${esc(h)}</span>`).join('')}
      </div>
      <div class="pcard__foot">
        <div class="price">
          <small>${onRequest ? 'Tailored quote' : 'from / person'}</small>
          ${onRequest
            ? '<b style="font-size:1.05rem">On request</b>'
            : `<b>${money(p.price)}</b>${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ''}`}
        </div>
        <a class="btn ${onRequest ? 'btn--dark' : 'btn--primary'} btn--sm" href="package.html?id=${encodeURIComponent(p.id)}">
          ${onRequest ? 'Plan my trip' : 'View trip'} ${icon('arrowRight')}
        </a>
      </div>
    </div>
  </article>`;
}

function stars(n) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span style="opacity:${i < n ? 1 : .28}">${icon('star')}</span>`).join('');
}

function bindFavorites(root = document) {
  $$('[data-fav]', root).forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.fav;
      const favs = store.get(FAV_KEY, []);
      const idx = favs.indexOf(id);
      if (idx > -1) {
        favs.splice(idx, 1);
        btn.classList.remove('is-on');
        showToast('Removed from saved', 'You can add it back any time.', 'info');
      } else {
        favs.push(id);
        btn.classList.add('is-on');
        showToast('Saved to your wishlist', 'Find it again on this page.');
      }
      store.set(FAV_KEY, favs);
    });
  });
}

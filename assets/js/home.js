/* ==========================================================================
   Wanderluxe — home page
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderPopular();
  renderHomePackages();
  renderOffers();
  renderGallery();
  renderTestimonials();
  renderBlogPreview();
  renderFaqPreview();
  initSearch();
  initCounters();
  initNewsletter();
  bindFavorites();
  startCountdown();
});

/* ------------------------------ Destinations ------------------------------ */
function renderPopular() {
  const grid = $('#popularGrid');
  if (!grid) return;
  const picks = DESTINATIONS.filter(d => d.region === 'india' && d.featured).slice(0, 6);
  grid.innerHTML = picks.map((d, i) => destCard(d, i % 3)).join('');
}

/* -------------------------------- Packages -------------------------------- */
function renderHomePackages() {
  const grid = $('#packageGrid');
  if (!grid) return;
  const ids = ['golden-triangle', 'kerala-backwaters', 'maldives-honeymoon', 'ladakh-expedition', 'rajasthan-romance', 'bali-bliss'];
  const picks = ids.map(id => PACKAGES.find(p => p.id === id)).filter(Boolean);
  grid.innerHTML = picks.map((p, i) => packageCard(p, i % 3)).join('');
}

/* --------------------------------- Offers --------------------------------- */
function renderOffers() {
  const grid = $('#offerGrid');
  if (!grid) return;
  grid.innerHTML = OFFERS.map((o, i) => `
    <article class="offer reveal" data-delay="${i}">
      <img src="${o.image}" alt="${esc(o.title)}" loading="lazy">
      <span class="offer__off">${esc(o.off)}</span>
      <h3>${esc(o.title)}</h3>
      <p>${esc(o.text)}</p>
      <div class="offer__code">
        <button class="code-chip" data-code="${esc(o.code)}" type="button">${icon('tag')} ${esc(o.code)}</button>
        <a class="btn btn--outline-white btn--sm" href="packages.html">Book now ${icon('arrowRight')}</a>
      </div>
    </article>`).join('');

  $$('.code-chip', grid).forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.code;
      try {
        await navigator.clipboard.writeText(code);
        showToast('Code copied', `${code} is ready to paste at checkout.`);
      } catch {
        showToast('Your code', code, 'info');
      }
    });
  });
}

let countdownTimer = null;
function startCountdown() {
  const key = 'wl_offer_end';
  let end = Number(localStorage.getItem(key));
  if (!end || end < Date.now()) {
    end = Date.now() + 5 * 24 * 60 * 60 * 1000;
    localStorage.setItem(key, String(end));
  }
  const tick = () => {
    const diff = Math.max(0, end - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff % 86400000 / 3600000);
    const m = Math.floor(diff % 3600000 / 60000);
    const s = Math.floor(diff % 60000 / 1000);
    const pad = n => String(n).padStart(2, '0');
    if ($('#cdDays')) {
      $('#cdDays').textContent = pad(d);
      $('#cdHours').textContent = pad(h);
      $('#cdMins').textContent = pad(m);
      $('#cdSecs').textContent = pad(s);
    }
  };
  tick();
  clearInterval(countdownTimer);
  countdownTimer = setInterval(tick, 1000);
}

/* --------------------------------- Gallery -------------------------------- */
const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80', caption: 'Taj Mahal at first light · Agra', cls: 'gallery__item--wide' },
  { src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80', caption: 'Backwater mornings · Kerala' },
  { src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80', caption: 'The road to Pangong · Ladakh', cls: 'gallery__item--tall' },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80', caption: 'Palolem after the rain · Goa' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80', caption: 'Rice terrace light · Bali', cls: 'gallery__item--wide' },
  { src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80', caption: 'Overwater villas · Maldives' },
  { src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80', caption: 'Hawa Mahal · Jaipur' },
  { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80', caption: 'Toy train country · Darjeeling' }
];

function renderGallery() {
  const grid = $('#homeGallery');
  if (!grid) return;
  grid.innerHTML = GALLERY_ITEMS.map((g, i) =>
    `<div class="gallery__item ${g.cls || ''}" data-gi="${i}" role="button" tabindex="0" aria-label="Open photo: ${esc(g.caption)}">
      <img src="${g.src}" alt="${esc(g.caption)}" loading="lazy"><span>${esc(g.caption)}</span>
    </div>`).join('');

  $$('.gallery__item', grid).forEach(el => {
    const open = () => openLightbox(GALLERY_ITEMS.map(x => ({ src: x.src, caption: x.caption })), Number(el.dataset.gi));
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

/* ------------------------------- Testimonials ----------------------------- */
function renderTestimonials() {
  const grid = $('#testimonialGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t, i) => `
    <article class="quote reveal" data-delay="${i}" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)">
      <div class="quote__stars">${stars(t.rating)}</div>
      <p style="color:#e6f0f7">“${esc(t.text)}”</p>
      <div class="quote__who" style="border-color:rgba(255,255,255,.12)">
        <img src="${t.avatar}" alt="${esc(t.name)}" loading="lazy">
        <div><b style="color:#fff">${esc(t.name)}</b><small style="color:#9fb8ca">${esc(t.trip)}</small></div>
      </div>
    </article>`).join('');
}

/* ---------------------------------- Blog ---------------------------------- */
function renderBlogPreview() {
  const grid = $('#blogGrid');
  if (!grid) return;
  grid.innerHTML = BLOGS.slice(0, 3).map((b, i) => `
    <article class="bcard reveal" data-delay="${i}">
      <a class="bcard__media" href="blog.html#${encodeURIComponent(b.id)}">
        <img src="${b.image}" alt="${esc(b.title)}" loading="lazy">
        <span class="badge badge--brand bcard__cat">${esc(b.category)}</span>
      </a>
      <div class="bcard__body">
        <div class="bcard__meta"><span>${fmtDate(b.date)}</span><span>${esc(b.read)} read</span></div>
        <h3><a href="blog.html#${encodeURIComponent(b.id)}">${esc(b.title)}</a></h3>
        <p>${esc(b.excerpt)}</p>
        <a class="link-arrow" href="blog.html#${encodeURIComponent(b.id)}">Read story ${icon('arrowRight')}</a>
      </div>
    </article>`).join('');
}

/* ----------------------------------- FAQ ---------------------------------- */
function renderFaqPreview() {
  const acc = $('#faqPreview');
  if (!acc) return;
  acc.innerHTML = FAQ_GROUPS[0].items.slice(0, 4).map((f, i) => `
    <div class="acc__item ${i === 0 ? 'is-open' : ''}">
      <button class="acc__q" type="button">${esc(f.q)} ${icon('plus')}</button>
      <div class="acc__a"><div>${esc(f.a)}</div></div>
    </div>`).join('');
  initAccordions(acc);
}

/* --------------------------------- Search --------------------------------- */
function initSearch() {
  const form = $('#searchForm');
  if (!form) return;
  const select = $('#searchDest');
  const dateInput = $('#searchDate');
  let tab = 'india';

  const optionsFor = t => {
    if (t === 'packages') {
      return [{ id: '', name: 'Any package' }, ...PACKAGES.filter(p => !p.priceOnRequest).map(p => ({ id: p.id, name: `${p.name} · ${p.days}D` }))];
    }
    return [{ id: '', name: t === 'india' ? 'Anywhere in India' : 'Anywhere abroad' },
      ...DESTINATIONS.filter(d => d.region === t).map(d => ({ id: d.id, name: `${d.name} · ${d.state}` }))];
  };

  const fill = () => {
    select.innerHTML = optionsFor(tab).map(o => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join('');
  };
  fill();

  $$('.searchbar__tabs button', form).forEach(btn => {
    btn.addEventListener('click', () => {
      tab = btn.dataset.tab;
      $$('.searchbar__tabs button', form).forEach(b => b.classList.toggle('is-active', b === btn));
      fill();
    });
  });

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const dest = select.value;
    const date = dateInput?.value || '';
    const travellers = $('#searchTravellers')?.value || '2';
    const q = `date=${encodeURIComponent(date)}&travellers=${travellers}`;

    if (tab === 'packages') {
      location.href = dest ? `package.html?id=${encodeURIComponent(dest)}` : `packages.html?${q}`;
      return;
    }
    if (dest) {
      location.href = `destination.html?id=${encodeURIComponent(dest)}&${q}`;
    } else {
      location.href = `destinations.html?region=${tab}&${q}`;
    }
  });
}

/* --------------------------------- Counters ------------------------------- */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;
  const run = el => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const dur = 1400;
    const step = now => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN') + (p === 1 && target > 1000 ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }
  const io = new IntersectionObserver(en => {
    en.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: .4 });
  counters.forEach(c => io.observe(c));
}

/* -------------------------------- Newsletter ------------------------------ */
function initNewsletter() {
  const form = $('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!input.value.includes('@')) {
      showToast('Check your email', 'That address does not look quite right.', 'error');
      return;
    }
    showToast('You are on the list!', 'Your first Sunday postcard arrives this weekend.');
    form.reset();
  });
}

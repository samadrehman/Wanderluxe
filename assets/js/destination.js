/* ==========================================================================
   Wanderluxe — destination detail
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(location.search).get('id');
  const d = DESTINATIONS.find(x => x.id === id) || DESTINATIONS[0];
  document.title = `${d.name} Travel Guide — Best Time, Attractions & Photos | Wanderluxe`;

  $('#destHeroImg').src = d.image;
  $('#destHeroImg').alt = `${d.name}, ${d.state}`;
  $('#destCrumb').textContent = d.name;
  $('#destTitle').textContent = d.name;
  $('#destTagline').textContent = `${d.tagline} — ${d.state}, ${d.country}.`;
  $('#relatedName').textContent = d.name;

  $('#destBadges').innerHTML = `
    <span class="badge badge--brand">${d.region === 'india' ? 'India' : 'International'}</span>
    ${d.tags.map(t => `<span class="badge badge--glass">${esc(t)}</span>`).join('')}
    <span class="badge badge--gold">${icon('star')} ${d.rating} · ${d.reviews.toLocaleString('en-IN')} reviews</span>`;

  $('#destMeta').innerHTML = `
    <span>${icon('calendar')} Best time: ${esc(d.bestTime)}</span>
    <span>${icon('clock')} Ideal stay: ${esc(d.idealDuration)}</span>
    <span>${icon('wallet')} From ${money(d.price)} per person</span>`;

  const climate = ['leh-ladakh', 'manali', 'darjeeling', 'switzerland'].includes(d.id)
    ? { winter: '-2° / 12°', summer: '12° / 26°', monsoon: '10° / 20°' }
    : ['goa', 'andaman', 'maldives', 'bali', 'thailand'].includes(d.id)
      ? { winter: '22° / 31°', summer: '26° / 34°', monsoon: '25° / 30°' }
      : ['dubai', 'japan', 'singapore'].includes(d.id)
        ? { winter: '18° / 28°', summer: '28° / 40°', monsoon: '26° / 35°' }
        : { winter: '12° / 27°', summer: '28° / 40°', monsoon: '25° / 33°' };

  const galleryItems = d.gallery.map((src, i) => ({ src, caption: `${d.name} · photo ${i + 1}` }));
  const galCls = ['gallery__item--wide', '', 'gallery__item--tall', ''];

  $('#destDetail').innerHTML = `
    <h2>Why go to ${esc(d.name)}</h2>
    <p>${esc(d.description)}</p>
    <div class="detail__stats">
      <div class="info-tile"><small>Best time</small><b>${esc(d.bestTime)}</b></div>
      <div class="info-tile"><small>Ideal duration</small><b>${esc(d.idealDuration)}</b></div>
      <div class="info-tile"><small>Starting from</small><b>${money(d.price)} / person</b></div>
      <div class="info-tile"><small>Traveller rating</small><b>${d.rating} / 5 (${d.reviews.toLocaleString('en-IN')})</b></div>
    </div>

    <h2>Top tourist attractions</h2>
    <p>The experiences we build into almost every ${esc(d.name)} itinerary — plus a little time to wander.</p>
    <div class="attractions">
      ${d.attractions.map((a, i) => `
        <div class="attraction">
          <span>${icon(['camera', 'mapPin', 'star', 'award'][i % 4])}</span>
          <div><b>${esc(a)}</b><small>${i < 3 ? 'Must-see highlight' : 'Local favourite'}</small></div>
        </div>`).join('')}
    </div>

    <h2>Photo gallery</h2>
    <div class="gallery" id="destGallery" style="grid-auto-rows:150px">
      ${galleryItems.map((g, i) => `
        <div class="gallery__item ${galCls[i]}" data-gi="${i}" role="button" tabindex="0" aria-label="Open photo ${i + 1}">
          <img src="${g.src}" alt="${esc(d.name)} photo ${i + 1}" loading="lazy">
        </div>`).join('')}
    </div>

    <h2>Best time to visit ${esc(d.name)}</h2>
    <p>${bestTimeCopy(d)}</p>
    <div class="weather" style="margin:14px 0 6px">
      <div><b>${climate.winter}</b><small>Nov – Feb</small></div>
      <div><b>${climate.summer}</b><small>Mar – Jun</small></div>
      <div><b>${climate.monsoon}</b><small>Jul – Oct</small></div>
    </div>
    <p class="small muted">Temperatures are typical daytime highs and nighttime lows in °C. We share a live forecast and packing list 10 days before departure.</p>

    <h2>How to reach ${esc(d.name)}</h2>
    <div class="attractions" style="margin-top:10px">
      <div class="attraction"><span>${icon('plane')}</span><div><b>By air</b><small>${airCopy(d)}</small></div></div>
      <div class="attraction"><span>${icon('route')}</span><div><b>By rail &amp; road</b><small>${railCopy(d)}</small></div></div>
    </div>`;

  // gallery lightbox
  $$('#destGallery .gallery__item').forEach(el => {
    const open = () => openLightbox(galleryItems, Number(el.dataset.gi));
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  const favs = isFav(d.id);
  $('#destSide').innerHTML = `
    <div class="side-card" style="padding:0;overflow:hidden">
      <div style="aspect-ratio:16/10;overflow:hidden"><img src="${d.image}" alt="${esc(d.name)}" style="width:100%;height:100%;object-fit:cover"></div>
      <div style="padding:20px">
        <small class="muted" style="font-weight:700;font-size:.74rem;text-transform:uppercase;letter-spacing:.1em">Packages from</small>
        <div style="display:flex;align-items:baseline;gap:8px;margin:2px 0 4px">
          <b style="font-size:1.8rem;letter-spacing:-.03em">${money(d.price)}</b>
          <span class="muted small">/ person</span>
        </div>
        <p class="small muted" style="margin-bottom:16px">Includes stay, transfers and guided experiences.</p>
        <a class="btn btn--primary btn--block" href="#relatedPackages">See tour packages ${icon('arrowRight')}</a>
        <button class="btn btn--ghost btn--block" style="margin-top:8px" data-fav="${esc(d.id)}" type="button">
          ${icon('heart')} ${favs ? 'Saved to wishlist' : 'Save to wishlist'}
        </button>
      </div>
    </div>
    <div class="side-card">
      <h3>${icon('sun')} When to go</h3>
      <ul class="side-list">
        <li>${icon('checkCircle')}<div><b>${esc(d.bestTime)}</b><span class="small muted">Best overall weather</span></div></li>
        <li>${icon('checkCircle')}<div><b>${esc(d.idealDuration)}</b><span class="small muted">Recommended stay</span></div></li>
        <li>${icon('checkCircle')}<div><b>Shoulder season</b><span class="small muted">Fewer crowds, better rates</span></div></li>
      </ul>
    </div>
    <div class="side-card">
      <h3>${icon('headset')} Need a hand?</h3>
      <p class="small muted">Our destination specialists have all been here. Ask us anything — routes, hotels, seasons.</p>
      <a class="btn btn--dark btn--block" href="contact.html">Talk to a planner ${icon('arrowRight')}</a>
      <a class="btn btn--ghost btn--block" style="margin-top:8px" href="tel:+919876543210">${icon('phone')} +91 98765 43210</a>
    </div>`;

  bindFavorites($('#destSide'));

  // related packages
  let related = PACKAGES.filter(p => p.destinationId === d.id && !p.priceOnRequest);
  if (related.length < 3) {
    related = related.concat(PACKAGES.filter(p => p.region === d.region && p.destinationId !== d.id && !p.priceOnRequest && !related.includes(p)));
  }
  $('#relatedPackages').innerHTML = related.slice(0, 3).map((p, i) => packageCard(p, i)).join('');

  const nearby = DESTINATIONS.filter(x => x.region === d.region && x.id !== d.id)
    .sort((a, b) => b.rating - a.rating).slice(0, 3);
  $('#nearbyGrid').innerHTML = nearby.map((x, i) => destCard(x, i)).join('');

  bindFavorites($('#nearbyGrid'));
  initReveal();
});

function bestTimeCopy(d) {
  const id = d.id;
  if (['leh-ladakh', 'manali', 'darjeeling', 'switzerland'].includes(id)) {
    return `Go between ${d.bestTime}. Summer brings open passes, green valleys and long daylight hours, while winter is for snow lovers and quiet trails. Mornings and evenings are cold year-round, so pack layers. Avoid the peak monsoon weeks if you plan to trek.`;
  }
  if (['goa', 'andaman', 'maldives', 'bali', 'thailand'].includes(id)) {
    return `The dry season (${d.bestTime}) is the sweet spot: calm seas, clear snorkelling and reliable sunshine. Shoulder months bring fewer crowds and better hotel rates, with the occasional short shower. Peak December–January is busiest, so book stays at least two months ahead.`;
  }
  if (['dubai', 'japan', 'singapore'].includes(id)) {
    return `Plan around ${d.bestTime}. Days are comfortably warm and evenings pleasant, making it ideal for walking, sightseeing and outdoor dining. Summer can be very hot and humid, so if you travel then, build your day around air-conditioned museums and early mornings.`;
  }
  if (['kerala-backwaters', 'meghalaya'].includes(id)) {
    return `Visit between ${d.bestTime} for lush green landscapes and comfortable temperatures. The monsoon transforms the region into a dramatic, waterfall-filled paradise — beautiful, but expect short travel delays. Carry a light rain jacket and quick-dry footwear either way.`;
  }
  return `The best window is ${d.bestTime}, when days are dry, evenings are cool and monuments are at their most photogenic. October and February are the quietest shoulder months. Summers get hot by midday, so we schedule sightseeing for early morning and late afternoon.`;
}

function airCopy(d) {
  if (d.region === 'international') return `Direct and one-stop flights operate from major Indian metros. We can bundle airfare into your quote.`;
  if (['leh-ladakh'].includes(d.id)) return `Fly into Kushok Bakula Rimpochee Airport (IXL), Leh. Morning flights are recommended for views and smoother landings.`;
  if (['goa', 'andaman', 'kerala-backwaters', 'meghalaya', 'darjeeling'].includes(d.id)) {
    return `Nearest airport: ${d.id === 'goa' ? 'Dabolim / Mopa (GOI/GOX)' : d.id === 'andaman' ? 'Veer Savarkar International (IXZ), Port Blair' : d.id === 'kerala-backwaters' ? 'Cochin International (COK)' : d.id === 'meghalaya' ? 'Guwahati (GAU)' : 'Bagdogra (IXB)'}. Airport transfers are included on all packages.`;
  }
  return `Nearest airport is well connected to Delhi, Mumbai and Bengaluru. We include private airport transfers on every package.`;
}

function railCopy(d) {
  if (d.region === 'international') return `We arrange private transfers from the airport to your hotel, and local transport throughout.`;
  if (['leh-ladakh'].includes(d.id)) return `Road access via Manali–Leh and Srinagar–Leh highways (June–September). A support vehicle is standard on our Ladakh trips.`;
  if (['goa'].includes(d.id)) return `Konkan Railway and the Mumbai–Goa line are scenic options. Scooter or private car is included once you arrive.`;
  return `Well connected by rail and expressway. Private AC cars with drivers are included for all intercity transfers and sightseeing.`;
}

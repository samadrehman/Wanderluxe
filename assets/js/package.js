/* ==========================================================================
   Wanderluxe — package detail
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  let p = PACKAGES.find(x => x.id === params.get('id'));
  if (!p) {
    p = PACKAGES[0];
    setTimeout(() => showToast('Package not found', 'Showing our most popular trip instead.', 'info'), 600);
  }
  const dest = DESTINATIONS.find(d => d.id === p.destinationId);

  document.title = `${p.name} — ${p.days ? p.days + ' Days' : 'Custom'} | Wanderluxe`;

  /* ------------------------------- Hero ---------------------------------- */
  $('#pkgHeroImg').src = p.image;
  $('#pkgHeroImg').alt = p.name;
  $('#pkgCrumb').textContent = p.name;
  $('#pkgTitle').textContent = p.name;
  $('#pkgBadges').innerHTML = `
    <span class="badge badge--brand">${TYPE_LABELS[p.type]}</span>
    <span class="badge badge--glass">${p.region === 'india' ? 'India' : 'International'}</span>
    ${p.badge ? `<span class="badge badge--gold">${esc(p.badge)}</span>` : ''}
    <span class="badge badge--glass">${icon('star')} ${p.rating} · ${p.reviews} reviews</span>`;
  $('#pkgMeta').innerHTML = `
    <span>${icon('clock')} ${p.days ? `${p.days} days / ${p.nights} nights` : 'Flexible duration'}</span>
    <span>${icon('mapPin')} ${esc(p.location)}</span>
    <span>${icon('users')} ${esc(p.groupSize)}</span>
    <span>${icon('plane')} Starts in ${esc(p.startCity)}</span>`;

  /* ----------------------------- Overview -------------------------------- */
  const galleryItems = (p.gallery || [p.image]).map((src, i) => ({ src, caption: `${p.name} · ${p.location}` }));
  $('#panelOverview').innerHTML = `
    <div class="panel-card">
      <h3>About this trip</h3>
      <p>${esc(p.overview)}</p>
      <div class="attractions" style="margin-top:18px">
        ${p.highlights.map(h => `
          <div class="attraction">
            <span>${icon('check')}</span>
            <div><b>${esc(h)}</b><small>Trip highlight</small></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="panel-card">
      <h3>Trip at a glance</h3>
      <div class="detail__stats" style="margin:0">
        <div class="info-tile"><small>Duration</small><b>${p.days ? `${p.days}D / ${p.nights}N` : 'Flexible'}</b></div>
        <div class="info-tile"><small>Starts in</small><b>${esc(p.startCity)}</b></div>
        <div class="info-tile"><small>Group size</small><b>${esc(p.groupSize)}</b></div>
        <div class="info-tile"><small>Best season</small><b>${dest ? esc(dest.bestTime) : 'Year-round'}</b></div>
      </div>
    </div>

    ${p.travelDates?.length ? `
    <div class="panel-card">
      <h3>Upcoming departure dates</h3>
      <p class="small muted">Fixed departures below. Private departures can start on any date — just ask.</p>
      <div class="date-grid" id="overviewDates">
        ${p.travelDates.map((d, i) => {
          const s = shortDate(d);
          return `<button type="button" class="date-chip ${i === 0 ? 'is-active' : ''}" data-date="${d}">
            <b>${s.day} ${s.month}</b><small>${s.weekday}, ${s.year}</small>
          </button>`;
        }).join('')}
      </div>
      <div class="notice notice--teal" style="margin-top:16px">
        ${icon('info')}
        <span>Dates are subject to availability. A 25% deposit confirms your seats; the balance is due 15 days before departure.</span>
      </div>
    </div>` : ''}

    <div class="panel-card">
      <h3>Photos from this trip</h3>
      <div class="gallery" id="pkgGallery" style="grid-auto-rows:160px">
        ${galleryItems.map((g, i) => `
          <div class="gallery__item ${i === 0 ? 'gallery__item--wide' : ''}" data-gi="${i}" role="button" tabindex="0" aria-label="Open photo ${i + 1}">
            <img src="${g.src}" alt="${esc(p.name)} photo ${i + 1}" loading="lazy">
          </div>`).join('')}
      </div>
    </div>`;

  $$('#pkgGallery .gallery__item').forEach(el => {
    const open = () => openLightbox(galleryItems, Number(el.dataset.gi));
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* ----------------------------- Itinerary ------------------------------- */
  $('#panelItinerary').innerHTML = `
    <div class="panel-card">
      <h3>Day-wise itinerary</h3>
      <p class="small muted">A balanced pace with time to actually enjoy each place. Your guide can adjust the order to suit weather and local conditions.</p>
      <div class="itinerary" style="margin-top:20px">
        ${p.itinerary.map(d => {
          const tag = d.day === 1 ? 'Arrival' : d.day === p.itinerary.length ? 'Departure' : 'Explore';
          return `<div class="itin-day">
            <span class="itin-day__num">D${d.day}</span>
            <div class="itin-day__head"><h4>${esc(d.title)}</h4><span class="itin-day__tag">${tag}</span></div>
            <p>${esc(d.detail)}</p>
            <div class="itin-day__meta">
              ${d.meals && d.meals !== '—' ? `<span>${icon('utensils')} ${esc(d.meals)}</span>` : ''}
              ${d.stay && d.stay !== '—' ? `<span>${icon('bed')} ${esc(d.stay)}</span>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="panel-card">
      <h3>What a typical day looks like</h3>
      <div class="check-grid">
        <ul class="check-list check-list--yes">
          <li>${icon('checkCircle')} Morning sightseeing with a local guide</li>
          <li>${icon('checkCircle')} Lunch stop at a recommended local restaurant</li>
          <li>${icon('checkCircle')} Free time for photos, cafés and markets</li>
          <li>${icon('checkCircle')} Sunset experience or optional activity</li>
        </ul>
        <ul class="check-list check-list--yes">
          <li>${icon('checkCircle')} Dinner at the hotel or a chosen local spot</li>
          <li>${icon('checkCircle')} Private transfers, no shared buses</li>
          <li>${icon('checkCircle')} WhatsApp support throughout the day</li>
          <li>${icon('checkCircle')} Flexible pace for families and seniors</li>
        </ul>
      </div>
    </div>`;

  /* --------------------------- Hotels & transport ------------------------ */
  $('#panelStay').innerHTML = `
    <div class="panel-card">
      <h3>${icon('hotel')} Where you'll stay</h3>
      <p class="small muted">Handpicked properties, listed with the number of nights. If a hotel is unavailable we substitute one of equal or higher standard.</p>
      <div style="margin-top:8px">
        ${p.hotels.map(h => `
          <div class="hotel-row">
            <span class="hotel-row__icon">${icon('bed')}</span>
            <div><b>${esc(h.name)}</b><small>${esc(h.city)} · ${h.nights ? h.nights + ' night' + (h.nights > 1 ? 's' : '') : 'as per plan'}</small></div>
            <span class="badge badge--muted">${esc(h.category)}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel-card">
      <h3>${icon('car')} Transport & transfers</h3>
      <div style="margin-top:8px">
        ${p.transport.map(t => `
          <div class="hotel-row">
            <span class="hotel-row__icon">${icon(t.mode.toLowerCase().includes('flight') ? 'plane' : t.mode.toLowerCase().includes('boat') || t.mode.toLowerCase().includes('ferry') ? 'anchor' : t.mode.toLowerCase().includes('bike') || t.mode.toLowerCase().includes('scooter') ? 'bike' : 'car')}</span>
            <div><b>${esc(t.mode)}</b><small>${esc(t.detail)}</small></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel-card">
      <h3>Good to know</h3>
      <ul class="check-list check-list--yes">
        <li>${icon('checkCircle')} Check-in is typically 2 pm and check-out 11 am; early check-in can be requested.</li>
        <li>${icon('checkCircle')} Rooms are on twin-sharing basis unless a single supplement is added.</li>
        <li>${icon('checkCircle')} Drivers are licensed, English-speaking and on call throughout the trip.</li>
        <li>${icon('checkCircle')} We share driver and hotel contact details 48 hours before departure.</li>
      </ul>
    </div>`;

  /* ----------------------------- Inclusions ------------------------------ */
  $('#panelInclusions').innerHTML = `
    <div class="panel-card">
      <h3>What's included</h3>
      <ul class="check-list check-list--yes">
        ${p.included.map(i => `<li>${icon('checkCircle')} ${esc(i)}</li>`).join('')}
      </ul>
    </div>
    <div class="panel-card">
      <h3>What's not included</h3>
      <ul class="check-list check-list--no">
        ${p.excluded.map(i => `<li>${icon('x')} ${esc(i)}</li>`).join('')}
      </ul>
    </div>
    <div class="panel-card">
      <h3>Cancellation policy</h3>
      <ul class="check-list">
        <li>${icon('checkCircle')} <span><b>15+ days before departure:</b> free cancellation, full refund of the package cost.</span></li>
        <li>${icon('info')} <span><b>14–7 days:</b> 50% of the package cost is refundable.</span></li>
        <li>${icon('alert')} <span><b>Within 7 days:</b> non-refundable. Flight and visa costs follow airline/embassy rules.</span></li>
      </ul>
      <div class="notice" style="margin-top:16px">
        ${icon('shield')}
        <span>Refunds are processed to the original payment method within 7–10 working days. If we cancel a departure, you receive a full refund or a free date change.</span>
      </div>
    </div>`;

  /* ------------------------------- Tabs ---------------------------------- */
  const tabs = $$('#pkgTabs button');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.toggle('is-active', b === btn));
      $$('.tabpanel').forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === btn.dataset.tab));
    });
  });

  /* ----------------------------- Book card ------------------------------- */
  const bookCard = $('#bookCard');
  const onRequest = !!p.priceOnRequest;
  const dates = (p.travelDates || []).filter(d => new Date(d + 'T00:00:00') >= new Date(new Date().toDateString()));
  const useDates = dates.length ? dates : (p.travelDates || []);
  const preselect = params.get('date') && useDates.includes(params.get('date')) ? params.get('date') : (useDates[0] || '');
  const travellers = Math.min(8, Math.max(1, Number(params.get('travellers')) || 2));

  if (onRequest) {
    bookCard.innerHTML = `
      <div class="book-card__head">
        <small>Custom tour</small>
        <b style="font-size:1.35rem">Built around you</b>
      </div>
      <div class="book-card__body">
        <p class="small muted" style="margin:0">Tell us your dates, budget and travel style. A planner will send a tailored itinerary and quote within 24 hours.</p>
        <label class="field"><span>Preferred start date</span><input type="date" id="quoteDate"></label>
        <label class="field"><span>Travellers</span>
          <select id="quoteTravellers">${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i + 1 === travellers ? 'selected' : ''}>${i + 1} traveller${i ? 's' : ''}</option>`).join('')}</select>
        </label>
        <a class="btn btn--primary btn--block" id="quoteBtn" href="contact.html">Request my free quote ${icon('arrowRight')}</a>
        <div class="book-card__note">${icon('checkCircle')} No payment needed to plan</div>
      </div>
      <div class="book-card__perks">
        <span>${icon('checkCircle')} A real planner, not a chatbot</span>
        <span>${icon('checkCircle')} Reply within 24 hours</span>
        <span>${icon('checkCircle')} Free changes while planning</span>
      </div>`;
    const qd = $('#quoteDate');
    if (qd) qd.min = new Date().toISOString().split('T')[0];
    const syncQuote = () => {
      const d = qd?.value || '';
      const t = $('#quoteTravellers')?.value || 2;
      $('#quoteBtn').href = `contact.html?subject=custom&date=${encodeURIComponent(d)}&travellers=${t}`;
    };
    qd?.addEventListener('change', syncQuote);
    $('#quoteTravellers')?.addEventListener('change', syncQuote);
    syncQuote();
  } else {
    bookCard.innerHTML = `
      <div class="book-card__head">
        <small>Starting from</small>
        <b>${money(p.price)} <span>/ person</span></b>
        ${p.oldPrice ? `<small style="opacity:.85;text-decoration:line-through">${money(p.oldPrice)}</small> <small style="color:var(--gold)">Save ${money(p.oldPrice - p.price)}</small>` : ''}
      </div>
      <div class="book-card__body">
        <label class="field"><span>Travel date</span>
          <select id="bookDate">
            ${useDates.map(d => `<option value="${d}" ${d === preselect ? 'selected' : ''}>${fmtDate(d)}</option>`).join('')}
            ${!useDates.length ? '<option value="">Choose a date at checkout</option>' : ''}
          </select>
        </label>
        <label class="field"><span>Travellers</span>
          <select id="bookTravellers">${Array.from({ length: 8 }, (_, i) => `<option value="${i + 1}" ${i + 1 === travellers ? 'selected' : ''}>${i + 1} traveller${i ? 's' : ''}</option>`).join('')}</select>
        </label>
        <div style="background:var(--bg);border-radius:12px;padding:12px 14px">
          <div class="price-line"><span>Package cost</span><b id="lineBase">—</b></div>
          <div class="price-line"><span>Taxes (5% GST)</span><b id="lineTax">—</b></div>
          <div class="price-line price-line--total" style="padding-top:8px;margin-top:4px"><span>Estimated total</span><b id="lineTotal">—</b></div>
        </div>
        <a class="btn btn--primary btn--block" id="bookBtn" href="booking.html">Book this tour ${icon('arrowRight')}</a>
        <div class="book-card__note">${icon('checkCircle')} Pay 25% now · free cancellation up to 15 days</div>
      </div>
      <div class="book-card__perks">
        <span>${icon('checkCircle')} Instant confirmation</span>
        <span>${icon('checkCircle')} GST invoice included</span>
        <span>${icon('checkCircle')} 24×7 on-trip support</span>
      </div>`;

    const dateSel = $('#bookDate');
    const travSel = $('#bookTravellers');

    const sync = () => {
      const t = Number(travSel.value);
      const base = p.price * t;
      const tax = Math.round(base * 0.05);
      $('#lineBase').textContent = money(base);
      $('#lineTax').textContent = money(tax);
      $('#lineTotal').textContent = money(base + tax);
      $('#bookBtn').href = `booking.html?id=${encodeURIComponent(p.id)}&date=${encodeURIComponent(dateSel.value)}&travellers=${t}`;
    };
    dateSel?.addEventListener('change', sync);
    travSel?.addEventListener('change', sync);
    sync();

    // departure chips
    $$('#overviewDates .date-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $$('#overviewDates .date-chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        if (dateSel) { dateSel.value = chip.dataset.date; sync(); }
        showToast('Departure selected', `${fmtDate(chip.dataset.date)} — continue when you are ready.`);
      });
    });
  }

  /* --------------------------- Save & print ------------------------------ */
  const saveBtn = $('#saveBtn');
  const setSave = () => {
    const saved = isFav(p.id);
    saveBtn.innerHTML = `${icon('heart')} ${saved ? 'Saved' : 'Save'}`;
    saveBtn.classList.toggle('btn--soft', saved);
  };
  setSave();
  saveBtn?.addEventListener('click', () => {
    const favs = store.get(FAV_KEY, []);
    const idx = favs.indexOf(p.id);
    if (idx > -1) favs.splice(idx, 1); else favs.push(p.id);
    store.set(FAV_KEY, favs);
    setSave();
    showToast(idx > -1 ? 'Removed from wishlist' : 'Saved to wishlist', idx > -1 ? 'Changed your mind? You can add it again.' : 'Find it on the packages page.', 'info');
  });
  $('#printBtn')?.addEventListener('click', () => window.print());

  /* ------------------------------ Similar -------------------------------- */
  let similar = PACKAGES.filter(x => x.id !== p.id && x.type === p.type);
  if (similar.length < 3) similar = similar.concat(PACKAGES.filter(x => x.id !== p.id && x.region === p.region && !similar.includes(x)));
  $('#similarGrid').innerHTML = similar.slice(0, 3).map((x, i) => packageCard(x, i)).join('');

  initReveal();
});

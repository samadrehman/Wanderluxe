/* ==========================================================================
   Wanderluxe — online booking flow (frontend demo, localStorage only)
   ========================================================================== */
const ADDONS = [
  { id: 'insurance', name: 'Travel insurance', desc: 'Medical, baggage and delay cover', price: 799, per: 'person' },
  { id: 'pickup', name: 'Private airport pickup', desc: 'Meet & greet, door to door', price: 1499, per: 'booking' },
  { id: 'guide', name: 'Dedicated local guide', desc: 'Your own guide for the whole trip', price: 2999, per: 'booking' },
  { id: 'upgrade', name: 'Room category upgrade', desc: 'Subject to availability at check-in', price: 3500, per: 'room' }
];

const BOOKING_KEY = 'wl_bookings';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const pkg = PACKAGES.find(p => p.id === params.get('id'));
  const main = $('#bookingMain');
  if (!main) return;

  if (!pkg || pkg.priceOnRequest) {
    renderChooser(main, !pkg ? 'Choose a package to book' : 'This trip is built to order');
    return;
  }

  /* ------------------------------- State --------------------------------- */
  const useDates = (pkg.travelDates || []).filter(d => new Date(d + 'T00:00:00') >= new Date(new Date().toDateString()));
  const today = new Date().toISOString().split('T')[0];
  const state = {
    step: 1,
    date: params.get('date') && (pkg.travelDates || []).includes(params.get('date')) ? params.get('date') : (useDates[0] || ''),
    adults: Math.min(12, Math.max(1, Number(params.get('travellers')) || 2)),
    children: 0,
    rooms: 1,
    addons: new Set(),
    promo: '',
    payment: 'UPI',
    booking: null
  };

  const totalTravellers = () => state.adults + state.children;

  /* ------------------------------- Layout -------------------------------- */
  main.innerHTML = `
    <div class="steps" id="bookingSteps">
      <div class="step is-active" data-step="1"><span class="step__num">1</span><span class="step__label">Dates &amp; travellers</span></div>
      <div class="step" data-step="2"><span class="step__num">2</span><span class="step__label">Traveller details</span></div>
      <div class="step" data-step="3"><span class="step__num">3</span><span class="step__label">Review &amp; confirm</span></div>
      <div class="step" data-step="4"><span class="step__num">4</span><span class="step__label">Confirmation</span></div>
    </div>

    <div class="booking-layout">
      <div>
        <div class="booking-panel is-active" data-panel="1">
          <div class="panel-card">
            <h3>Choose your travel date</h3>
            ${useDates.length ? `
              <p class="small muted">Fixed departures for this trip. Select one, or pick your own start date below.</p>
              <div class="date-grid" id="bookingDates">
                ${useDates.map(d => {
                  const s = shortDate(d);
                  return `<button type="button" class="date-chip ${d === state.date ? 'is-active' : ''}" data-date="${d}">
                    <b>${s.day} ${s.month}</b><small>${s.weekday}, ${s.year}</small>
                  </button>`;
                }).join('')}
              </div>
              <div class="divider"></div>` : ''}
            <div class="form-row">
              <div class="input-group">
                <label for="customDate">Or pick your own start date <span class="req">*</span></label>
                <input class="input" type="date" id="customDate" min="${today}" value="${state.date}">
                <small class="hint">Private departures can start on any date, subject to availability.</small>
                <span class="err" id="dateErr">Please choose a travel date to continue.</span>
              </div>
              <div class="input-group">
                <label>Duration</label>
                <input class="input" value="${pkg.days} days / ${pkg.nights} nights" readonly>
                <small class="hint">Starts in ${esc(pkg.startCity)} · ${esc(pkg.groupSize)}</small>
              </div>
            </div>
          </div>

          <div class="panel-card">
            <h3>Who's travelling?</h3>
            <div class="traveler-row">
              <div class="traveler-row__label"><b>Adults</b><small>Age 13 and above</small></div>
              <div class="stepper" data-trav="adults">
                <button type="button" data-dir="-1" aria-label="Fewer adults" ${state.adults <= 1 ? 'disabled' : ''}>${icon('minus')}</button>
                <span id="countAdults">${state.adults}</span>
                <button type="button" data-dir="1" aria-label="More adults" ${state.adults >= 12 ? 'disabled' : ''}>${icon('plus')}</button>
              </div>
            </div>
            <div class="traveler-row">
              <div class="traveler-row__label"><b>Children</b><small>Ages 2–12 · 40% off the adult rate</small></div>
              <div class="stepper" data-trav="children">
                <button type="button" data-dir="-1" aria-label="Fewer children" ${state.children <= 0 ? 'disabled' : ''}>${icon('minus')}</button>
                <span id="countChildren">${state.children}</span>
                <button type="button" data-dir="1" aria-label="More children" ${state.children >= 6 ? 'disabled' : ''}>${icon('plus')}</button>
              </div>
            </div>
            <div class="traveler-row">
              <div class="traveler-row__label"><b>Rooms</b><small>Twin-sharing by default</small></div>
              <div class="stepper" data-trav="rooms">
                <button type="button" data-dir="-1" aria-label="Fewer rooms" ${state.rooms <= 1 ? 'disabled' : ''}>${icon('minus')}</button>
                <span id="countRooms">${state.rooms}</span>
                <button type="button" data-dir="1" aria-label="More rooms" ${state.rooms >= 6 ? 'disabled' : ''}>${icon('plus')}</button>
              </div>
            </div>
            <div class="notice notice--teal" style="margin-top:16px">
              ${icon('users')}
              <span>Children under 2 travel free. Group of 6 or more? Use code <b>GROUP20</b> for 20% off.</span>
            </div>
          </div>

          <div class="panel-card">
            <h3>Add a little extra</h3>
            <div style="display:grid;gap:10px">
              ${ADDONS.map(a => `
                <label class="addon">
                  <input type="checkbox" data-addon="${a.id}">
                  <div><b>${a.name}</b><small>${a.desc}</small></div>
                  <span class="addon__price">${money(a.price)}<small style="display:block;font-weight:600;color:var(--muted)">per ${a.per}</small></span>
                </label>`).join('')}
            </div>
            <div class="divider"></div>
            <h3 style="font-size:.95rem">Have a promo code?</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <input class="input" id="promoInput" placeholder="e.g. WANDER10" style="flex:1;min-width:180px" aria-label="Promo code">
              <button class="btn btn--dark" type="button" id="applyPromo">Apply code</button>
            </div>
            <div id="promoMsg" class="small" style="margin-top:8px"></div>
          </div>

          <div class="booking-actions">
            <a class="btn btn--ghost" href="package.html?id=${encodeURIComponent(pkg.id)}">${icon('arrowLeft')} Back to package</a>
            <button class="btn btn--primary btn--lg" type="button" id="toStep2">Continue to details ${icon('arrowRight')}</button>
          </div>
        </div>

        <div class="booking-panel" data-panel="2">
          <div class="panel-card">
            <h3>Lead traveller details</h3>
            <p class="small muted">We will send your booking confirmation, invoice and trip documents to these details.</p>
            <form class="form" id="travellerForm" novalidate>
              <div class="form-row">
                <div class="input-group">
                  <label for="custName">Full name <span class="req">*</span></label>
                  <input class="input" id="custName" autocomplete="name" placeholder="As per your government ID">
                  <span class="err" id="nameErr">Please enter your full name (at least 3 characters).</span>
                </div>
                <div class="input-group">
                  <label for="custEmail">Email address <span class="req">*</span></label>
                  <input class="input" id="custEmail" type="email" autocomplete="email" placeholder="you@example.com">
                  <span class="err" id="emailErr">Please enter a valid email address.</span>
                </div>
              </div>
              <div class="form-row">
                <div class="input-group">
                  <label for="custPhone">Mobile number <span class="req">*</span></label>
                  <input class="input" id="custPhone" type="tel" autocomplete="tel" placeholder="+91 98765 43210">
                  <span class="err" id="phoneErr">Enter a valid mobile number (10–13 digits).</span>
                </div>
                <div class="input-group">
                  <label for="custCity">City <span class="req">*</span></label>
                  <input class="input" id="custCity" autocomplete="address-level2" placeholder="Bengaluru">
                  <span class="err" id="cityErr">Please enter your city.</span>
                </div>
              </div>
              <div class="form-row">
                <div class="input-group">
                  <label for="custPin">PIN code</label>
                  <input class="input" id="custPin" inputmode="numeric" maxlength="6" placeholder="560001">
                  <span class="err" id="pinErr">PIN code should be 6 digits.</span>
                </div>
                <div class="input-group">
                  <label for="custState">State</label>
                  <input class="input" id="custState" placeholder="Karnataka">
                </div>
              </div>
              <div class="input-group">
                <label for="travellerNames">Names of other travellers</label>
                <textarea class="textarea" id="travellerNames" placeholder="One name per line (optional — can be added later)"></textarea>
              </div>
              <div class="input-group">
                <label for="custNotes">Special requests</label>
                <textarea class="textarea" id="custNotes" placeholder="Dietary needs, accessibility, celebrations, room preferences…"></textarea>
                <small class="hint">We will do our best. Special requests are not guaranteed until confirmed by the hotel.</small>
              </div>
            </form>
          </div>
          <div class="booking-actions">
            <button class="btn btn--ghost" type="button" data-goto="1">${icon('arrowLeft')} Back</button>
            <button class="btn btn--primary btn--lg" type="button" id="toStep3">Review booking ${icon('arrowRight')}</button>
          </div>
        </div>

        <div class="booking-panel" data-panel="3">
          <div class="panel-card">
            <h3>Review your booking</h3>
            <p class="small muted">Check everything looks right. You can edit any section before paying.</p>
            <div id="reviewArea" style="margin-top:16px"></div>
          </div>

          <div class="panel-card">
            <h3>Payment method</h3>
            <div style="display:grid;gap:10px">
              ${[
                ['UPI', 'Google Pay, PhonePe, Paytm or any UPI app'],
                ['Card', 'Credit or debit card · Visa, Mastercard, RuPay'],
                ['Netbanking', 'All major Indian banks']
              ].map(([name, desc], i) => `
                <label class="addon" style="align-items:center">
                  <input type="radio" name="payMethod" value="${name}" ${i === 0 ? 'checked' : ''}>
                  <div><b>${name}</b><small>${desc}</small></div>
                  <span class="addon__price">${icon(name === 'Card' ? 'creditCard' : name === 'UPI' ? 'wallet' : 'lock')}</span>
                </label>`).join('')}
            </div>
            <label class="check" style="margin-top:18px">
              <input type="checkbox" id="termsCheck">
              <span>I agree to the <a href="faq.html#changes" target="_blank">cancellation policy</a> and <a href="faq.html" target="_blank">terms of service</a>, and confirm that the traveller details above are correct. <span class="req">*</span></span>
            </label>
            <span class="err" id="termsErr">Please accept the terms to continue.</span>
            <div class="notice" style="margin-top:16px">
              ${icon('lock')}
              <span><b>Demo checkout.</b> No payment will be taken and no card details are collected. Your booking is saved in this browser only.</span>
            </div>
          </div>

          <div class="booking-actions">
            <button class="btn btn--ghost" type="button" data-goto="2">${icon('arrowLeft')} Back</button>
            <button class="btn btn--primary btn--lg" type="button" id="confirmBtn">Confirm &amp; pay 25% ${icon('arrowRight')}</button>
          </div>
        </div>

        <div class="booking-panel" data-panel="4" id="confirmationPanel"></div>
      </div>

      <aside id="bookingSide"></aside>
    </div>`;

  /* ------------------------------ Summary -------------------------------- */
  function addonTotal() {
    let total = 0;
    ADDONS.forEach(a => {
      if (!state.addons.has(a.id)) return;
      if (a.per === 'person') total += a.price * totalTravellers();
      else if (a.per === 'room') total += a.price * state.rooms;
      else total += a.price;
    });
    return total;
  }

  function baseTotal() {
    return pkg.price * state.adults + Math.round(pkg.price * 0.6) * state.children;
  }

  function promoDiscount() {
    const base = baseTotal();
    if (state.promo === 'WANDER10') return Math.min(5000, Math.round(base * 0.10));
    if (state.promo === 'HONEYMOON15' && pkg.type === 'honeymoon') return Math.min(8000, Math.round(base * 0.15));
    if (state.promo === 'GROUP20' && totalTravellers() >= 6) return Math.round(base * 0.20);
    return 0;
  }

  function totals() {
    const base = baseTotal();
    const addons = addonTotal();
    const discount = promoDiscount();
    const tax = Math.round((base + addons - discount) * 0.05);
    const total = base + addons - discount + tax;
    return { base, addons, discount, tax, total, advance: Math.round(total * 0.25) };
  }

  function renderSide() {
    const t = totals();
    const addonNames = ADDONS.filter(a => state.addons.has(a.id)).map(a => a.name);
    $('#bookingSide').innerHTML = `
      <div class="summary">
        <div class="summary__media">
          <img src="${pkg.image}" alt="${esc(pkg.name)}">
          <span class="badge badge--brand">${TYPE_LABELS[pkg.type]}</span>
        </div>
        <div class="summary__body">
          <h3>${esc(pkg.name)}</h3>
          <small>${esc(pkg.location)} · ${pkg.days}D / ${pkg.nights}N</small>
          <div id="summaryLines">
            <div class="price-line"><span>Travel date</span><b>${state.date ? fmtDate(state.date) : 'Not selected'}</b></div>
            <div class="price-line"><span>Travellers</span><b>${state.adults} adult${state.adults > 1 ? 's' : ''}${state.children ? `, ${state.children} child${state.children > 1 ? 'ren' : ''}` : ''}</b></div>
            <div class="price-line"><span>Rooms</span><b>${state.rooms}</b></div>
            <div class="price-line"><span>Package cost</span><b>${money(t.base)}</b></div>
            ${t.addons ? `<div class="price-line"><span>Add-ons${addonNames.length ? ` (${addonNames.length})` : ''}</span><b>${money(t.addons)}</b></div>` : ''}
            ${t.discount ? `<div class="price-line price-line--save"><span>Promo ${esc(state.promo)}</span><b>− ${money(t.discount)}</b></div>` : ''}
            <div class="price-line"><span>GST (5%)</span><b>${money(t.tax)}</b></div>
            <div class="price-line price-line--total"><span>Total</span><b>${money(t.total)}</b></div>
            <div class="price-line" style="font-size:.75rem;padding-top:0"><span>Pay now (25%)</span><b>${money(t.advance)}</b></div>
          </div>
        </div>
        <div class="summary__foot">${icon('shield')} Free cancellation up to 15 days before departure</div>
      </div>
      <div class="side-card" style="padding:18px">
        <h3 style="font-size:.95rem">${icon('headset')} Need help booking?</h3>
        <p class="small muted" style="margin-bottom:12px">A real planner can hold your dates while you decide.</p>
        <a class="btn btn--dark btn--block btn--sm" href="contact.html">Chat with a planner ${icon('arrowRight')}</a>
        <a class="btn btn--ghost btn--block btn--sm" style="margin-top:8px" href="tel:+919876543210">${icon('phone')} +91 98765 43210</a>
      </div>`;
    const cb = $('#confirmBtn');
    if (cb) cb.innerHTML = `Confirm &amp; pay ${money(t.advance)} ${icon('arrowRight')}`;
  }

  renderSide();

  /* ----------------------------- Step 1 bind ----------------------------- */
  function syncDateChips() {
    $$('#bookingDates .date-chip').forEach(c => c.classList.toggle('is-active', c.dataset.date === state.date));
  }

  $$('#bookingDates .date-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.date = chip.dataset.date;
      const custom = $('#customDate');
      if (custom) custom.value = state.date;
      syncDateChips();
      $('#dateErr')?.classList.remove('is-on');
      renderSide();
    });
  });

  $('#customDate')?.addEventListener('change', e => {
    state.date = e.target.value;
    syncDateChips();
    $('#dateErr')?.classList.remove('is-on');
    renderSide();
  });

  $$('.stepper', main).forEach(step => {
    step.addEventListener('click', e => {
      const btn = e.target.closest('button[data-dir]');
      if (!btn) return;
      const key = step.dataset.trav;
      const dir = Number(btn.dataset.dir);
      const limits = { adults: [1, 12], children: [0, 6], rooms: [1, 6] };
      const [min, max] = limits[key];
      state[key] = Math.min(max, Math.max(min, state[key] + dir));
      const label = key === 'adults' ? '#countAdults' : key === 'children' ? '#countChildren' : '#countRooms';
      $(label).textContent = state[key];
      step.querySelector('[data-dir="-1"]').disabled = state[key] <= min;
      step.querySelector('[data-dir="1"]').disabled = state[key] >= max;
      renderSide();
    });
  });

  $$('[data-addon]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) state.addons.add(cb.dataset.addon);
      else state.addons.delete(cb.dataset.addon);
      renderSide();
    });
  });

  $('#applyPromo')?.addEventListener('click', () => {
    const input = $('#promoInput');
    const code = input.value.trim().toUpperCase();
    const msg = $('#promoMsg');
    if (!code) { msg.innerHTML = '<span style="color:var(--danger)">Enter a code first.</span>'; return; }
    const valid = ['WANDER10', 'HONEYMOON15', 'GROUP20'];
    if (!valid.includes(code)) {
      msg.innerHTML = '<span style="color:var(--danger)">That code is not valid. Try WANDER10.</span>';
      showToast('Invalid code', 'Check the spelling and try again.', 'error');
      return;
    }
    if (code === 'HONEYMOON15' && pkg.type !== 'honeymoon') {
      msg.innerHTML = '<span style="color:var(--danger)">HONEYMOON15 is only valid on honeymoon packages.</span>';
      return;
    }
    if (code === 'GROUP20' && totalTravellers() < 6) {
      msg.innerHTML = '<span style="color:var(--danger)">GROUP20 needs 6 or more travellers.</span>';
      return;
    }
    state.promo = code;
    msg.innerHTML = `<span class="badge badge--green">${icon('check')} ${code} applied</span> <button type="button" id="removePromo" class="small" style="color:var(--brand-dark);font-weight:700;margin-left:6px">Remove</button>`;
    $('#removePromo')?.addEventListener('click', () => {
      state.promo = '';
      msg.innerHTML = '';
      input.value = '';
      renderSide();
      showToast('Promo removed', '', 'info');
    });
    renderSide();
    showToast('Promo applied', `${code} is now reflected in your total.`);
  });

  /* --------------------------- Step navigation --------------------------- */
  function goStep(n) {
    state.step = n;
    $$('.booking-panel', main).forEach(p => p.classList.toggle('is-active', Number(p.dataset.panel) === n));
    $$('#bookingSteps .step').forEach(s => {
      const num = Number(s.dataset.step);
      s.classList.toggle('is-active', num === n);
      s.classList.toggle('is-done', num < n);
      s.querySelector('.step__num').innerHTML = num < n ? icon('check') : num;
    });
    if (n === 3) renderReview();
    const top = main.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  $('#toStep2')?.addEventListener('click', () => {
    if (!state.date) {
      $('#dateErr')?.classList.add('is-on');
      showToast('Pick a travel date', 'Choose a departure or a custom start date.', 'error');
      return;
    }
    goStep(2);
  });

  $$('[data-goto]').forEach(btn => btn.addEventListener('click', () => goStep(Number(btn.dataset.goto))));

  /* ------------------------------ Validation ----------------------------- */
  function fieldError(input, err, condition) {
    const bad = condition;
    input.classList.toggle('is-invalid', bad);
    err?.classList.toggle('is-on', bad);
    return !bad;
  }

  function validateDetails() {
    const name = $('#custName');
    const email = $('#custEmail');
    const phone = $('#custPhone');
    const city = $('#custCity');
    const pin = $('#custPin');
    let ok = true;
    ok = fieldError(name, $('#nameErr'), name.value.trim().length < 3) && ok;
    ok = fieldError(email, $('#emailErr'), !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.value.trim())) && ok;
    ok = fieldError(phone, $('#phoneErr'), !/^\+?[0-9][0-9\s-]{8,14}$/.test(phone.value.trim())) && ok;
    ok = fieldError(city, $('#cityErr'), city.value.trim().length < 2) && ok;
    ok = fieldError(pin, $('#pinErr'), pin.value.trim() !== '' && !/^\d{6}$/.test(pin.value.trim())) && ok;
    return ok;
  }

  $('#toStep3')?.addEventListener('click', () => {
    if (!validateDetails()) {
      showToast('Check your details', 'A few fields need your attention.', 'error');
      $('#custName').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    goStep(3);
  });

  // live-clear errors
  ['custName', 'custEmail', 'custPhone', 'custCity', 'custPin'].forEach(id => {
    $('#' + id)?.addEventListener('input', () => {
      const el = $('#' + id);
      el.classList.remove('is-invalid');
      $('#err' + id.replace('cust', ''))?.classList.remove('is-on');
    });
  });

  /* ------------------------------- Review -------------------------------- */
  function customer() {
    return {
      name: $('#custName').value.trim(),
      email: $('#custEmail').value.trim(),
      phone: $('#custPhone').value.trim(),
      city: $('#custCity').value.trim(),
      pin: $('#custPin').value.trim(),
      state: $('#custState').value.trim(),
      notes: $('#custNotes').value.trim(),
      extraNames: $('#travellerNames').value.trim()
    };
  }

  function renderReview() {
    const t = totals();
    const c = customer();
    const addonNames = ADDONS.filter(a => state.addons.has(a.id));
    const area = $('#reviewArea');
    area.innerHTML = `
      <div class="review-block">
        <div class="review-block__head"><b>Trip details</b><button type="button" data-goto="1">Edit</button></div>
        <div class="review-list">
          <div><span>Package</span><b>${esc(pkg.name)}</b></div>
          <div><span>Travel date</span><b>${state.date ? fmtDate(state.date) : '—'}</b></div>
          <div><span>Travellers</span><b>${state.adults} adult${state.adults > 1 ? 's' : ''}${state.children ? `, ${state.children} child${state.children > 1 ? 'ren' : ''}` : ''}</b></div>
          <div><span>Rooms</span><b>${state.rooms}</b></div>
          <div><span>Duration</span><b>${pkg.days} days / ${pkg.nights} nights</b></div>
        </div>
      </div>
      <div class="review-block">
        <div class="review-block__head"><b>Extras &amp; offers</b><button type="button" data-goto="1">Edit</button></div>
        <div class="review-list">
          ${addonNames.length ? addonNames.map(a => `<div><span>${esc(a.name)}</span><b>${money(a.price)} / ${a.per}</b></div>`).join('') : '<div><span>Add-ons</span><b>None</b></div>'}
          <div><span>Promo code</span><b>${state.promo ? esc(state.promo) : 'None'}</b></div>
          <div><span>Discount</span><b style="color:var(--success)">${t.discount ? '− ' + money(t.discount) : '—'}</b></div>
        </div>
      </div>
      <div class="review-block">
        <div class="review-block__head"><b>Lead traveller</b><button type="button" data-goto="2">Edit</button></div>
        <div class="review-list">
          <div><span>Name</span><b>${esc(c.name)}</b></div>
          <div><span>Email</span><b>${esc(c.email)}</b></div>
          <div><span>Mobile</span><b>${esc(c.phone)}</b></div>
          <div><span>City</span><b>${esc(c.city)}${c.pin ? ' – ' + esc(c.pin) : ''}</b></div>
          ${c.notes ? `<div><span>Requests</span><b>${esc(c.notes)}</b></div>` : ''}
        </div>
      </div>
      <div class="review-block" style="margin-bottom:0">
        <div class="review-block__head"><b>Payment summary</b></div>
        <div class="review-list">
          <div><span>Package cost</span><b>${money(t.base)}</b></div>
          ${t.addons ? `<div><span>Add-ons</span><b>${money(t.addons)}</b></div>` : ''}
          ${t.discount ? `<div><span>Discount</span><b style="color:var(--success)">− ${money(t.discount)}</b></div>` : ''}
          <div><span>GST (5%)</span><b>${money(t.tax)}</b></div>
          <div><span><b>Total</b></span><b>${money(t.total)}</b></div>
          <div><span>Pay now (25%)</span><b>${money(t.advance)}</b></div>
          <div><span>Balance before departure</span><b>${money(t.total - t.advance)}</b></div>
        </div>
      </div>`;
    $$('#reviewArea [data-goto]').forEach(b => b.addEventListener('click', () => goStep(Number(b.dataset.goto))));
  }

  $$('input[name="payMethod"]').forEach(r => r.addEventListener('change', () => { state.payment = r.value; }));

  /* ------------------------------ Confirm -------------------------------- */
  $('#confirmBtn')?.addEventListener('click', () => {
    const terms = $('#termsCheck');
    if (!terms.checked) {
      $('#termsErr').classList.add('is-on');
      showToast('One more thing', 'Please accept the terms to confirm.', 'error');
      terms.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    $('#termsErr').classList.remove('is-on');
    const btn = $('#confirmBtn');
    btn.disabled = true;
    btn.innerHTML = `Processing payment…`;
    setTimeout(() => finalise(), 950);
  });

  function bookingId() {
    const d = new Date();
    const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    return `WL-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  function finalise() {
    const t = totals();
    const c = customer();
    const addonNames = ADDONS.filter(a => state.addons.has(a.id)).map(a => a.name);
    const booking = {
      id: bookingId(),
      packageId: pkg.id,
      packageName: pkg.name,
      image: pkg.image,
      location: pkg.location,
      duration: `${pkg.days}D / ${pkg.nights}N`,
      date: state.date,
      adults: state.adults,
      children: state.children,
      rooms: state.rooms,
      addons: addonNames,
      promo: state.promo,
      subtotal: t.base + t.addons,
      discount: t.discount,
      tax: t.tax,
      total: t.total,
      paid: t.advance,
      balance: t.total - t.advance,
      payment: state.payment,
      customer: c,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    const all = store.get(BOOKING_KEY, []);
    all.unshift(booking);
    store.set(BOOKING_KEY, all);
    state.booking = booking;
    addNotification({
      icon: 'checkCircle', tone: 'teal',
      title: 'Booking confirmed',
      text: `${pkg.name} · ${fmtDate(state.date)} · ${totalTravellers()} traveller${totalTravellers() > 1 ? 's' : ''}`,
      time: 'Just now', unread: true
    });
    renderConfirmation(booking);
    goStep(4);
    showToast('Booking confirmed!', `Your booking ID is ${booking.id}.`);
    renderSide();
  }

  function renderConfirmation(b) {
    const panel = $('#confirmationPanel');
    panel.innerHTML = `
      <div class="confirm">
        <div class="confirm__icon">${icon('check')}</div>
        <h2 style="margin-bottom:8px">You're going to ${esc(pkg.location.split('·')[0].trim())}!</h2>
        <p class="muted">Booking <b>${b.id}</b> is confirmed. A confirmation has been sent to <b>${esc(b.customer.email)}</b>.</p>

        <div class="ticket">
          <div class="ticket__head">
            <div><small>Booking reference</small><b>${b.id}</b></div>
            <span class="badge badge--green">${icon('check')} ${b.status}</span>
          </div>
          <div class="ticket__body">
            <div class="full"><small>Package</small><b>${esc(b.packageName)}</b></div>
            <div><small>Destination</small><b>${esc(b.location)}</b></div>
            <div><small>Duration</small><b>${esc(b.duration)}</b></div>
            <div><small>Travel date</small><b>${fmtDate(b.date)}</b></div>
            <div><small>Travellers</small><b>${b.adults} adult${b.adults > 1 ? 's' : ''}${b.children ? `, ${b.children} child${b.children > 1 ? 'ren' : ''}` : ''} · ${b.rooms} room${b.rooms > 1 ? 's' : ''}</b></div>
            <div><small>Lead traveller</small><b>${esc(b.customer.name)}</b></div>
            <div><small>Contact</small><b>${esc(b.customer.phone)}</b></div>
            ${b.addons.length ? `<div class="full"><small>Add-ons</small><b>${b.addons.map(esc).join(' · ')}</b></div>` : ''}
            ${b.promo ? `<div><small>Promo applied</small><b>${esc(b.promo)} (− ${money(b.discount)})</b></div>` : ''}
            <div><small>Payment method</small><b>${esc(b.payment)}</b></div>
          </div>
          <div class="ticket__cut"></div>
          <div class="ticket__foot">
            <div>
              <small class="muted" style="display:block;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;font-weight:800">Total package cost</small>
              <b style="font-size:1.3rem">${money(b.total)}</b>
              <div class="small muted">Paid now ${money(b.paid)} · balance ${money(b.balance)} due 15 days before departure</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn--ghost btn--sm" type="button" id="printTicket">${icon('printer')} Print</button>
              <a class="btn btn--soft btn--sm" href="booking-history.html">${icon('ticket')} My bookings</a>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px">
          <a class="btn btn--primary" href="booking-history.html">View booking history ${icon('arrowRight')}</a>
          <a class="btn btn--ghost" href="packages.html">Book another trip</a>
          <a class="btn btn--ghost" href="index.html">Back to home</a>
        </div>
        <p class="small muted" style="margin-top:18px">A planner will call you within 2 hours to say hello and share the pre-trip checklist. No payment was actually taken — this is a frontend demo.</p>
      </div>`;
    $('#printTicket')?.addEventListener('click', () => window.print());
    initReveal();
  }
});

/* ------------------------------- Chooser ---------------------------------- */
function renderChooser(main, title) {
  const picks = PACKAGES.filter(p => !p.priceOnRequest).slice(0, 6);
  main.innerHTML = `
    <div class="section-head" style="max-width:720px">
      <span class="eyebrow">Booking</span>
      <h2>${esc(title)}</h2>
      <p>Pick a trip below to start your booking, or tell us what you have in mind and we will build it for you.</p>
    </div>
    ${title.includes('built') ? `<div class="notice notice--teal" style="margin-bottom:24px">${icon('sparkles')}<span>This is a custom trip, so there is no fixed price. Share your brief and a planner will send a tailored quote within 24 hours.</span></div>` : ''}
    <div class="grid grid--3">${picks.map((p, i) => packageCard(p, i % 3)).join('')}</div>
    <div class="text-center" style="margin-top:30px">
      <a class="btn btn--primary btn--lg" href="packages.html">Browse all packages ${icon('arrowRight')}</a>
      <a class="btn btn--ghost btn--lg" href="contact.html" style="margin-left:8px">Build a custom trip</a>
    </div>`;
  bindFavorites(main);
  initReveal();
}

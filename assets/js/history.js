/* ==========================================================================
   Wanderluxe — booking history (localStorage)
   ========================================================================== */
const BOOKINGS_KEY = 'wl_bookings';

document.addEventListener('DOMContentLoaded', () => {
  const state = { filter: 'all', q: '' };
  const listEl = $('#historyList');
  if (!listEl) return;

  const todayISO = new Date().toISOString().split('T')[0];

  const readAll = () => store.get(BOOKINGS_KEY, []);

  function displayStatus(b) {
    if (b.status === 'Cancelled') return 'Cancelled';
    if (b.date && b.date < todayISO) return 'Completed';
    return 'Confirmed';
  }

  function daysUntil(dateStr) {
    if (!dateStr) return 999;
    return Math.ceil((new Date(dateStr + 'T00:00:00') - new Date(new Date().toDateString())) / 86400000);
  }

  function refundFor(b) {
    const d = daysUntil(b.date);
    const paid = Number(b.paid) || 0;
    const total = Number(b.total) || 0;
    if (b.status === 'Cancelled') return { amount: 0, rule: 'Already cancelled', days: d };
    if (d >= 15) return { amount: paid, rule: '15+ days before departure — full refund of amount paid', days: d };
    if (d >= 7) return { amount: Math.min(paid, Math.round(total * 0.5)), rule: '7–14 days before departure — 50% of package cost refundable', days: d };
    return { amount: 0, rule: 'Within 7 days of departure — non-refundable', days: d };
  }

  function statusBadge(b) {
    const s = displayStatus(b);
    const cls = s === 'Confirmed' ? 'badge--green' : s === 'Cancelled' ? 'badge--red' : 'badge--muted';
    const ic = s === 'Confirmed' ? 'check' : s === 'Cancelled' ? 'x' : 'checkCircle';
    return `<span class="badge ${cls}">${icon(ic)} ${s}</span>`;
  }

  /* -------------------------------- Stats --------------------------------- */
  function renderStats() {
    const all = readAll();
    const upcoming = all.filter(b => displayStatus(b) === 'Confirmed').length;
    const past = all.filter(b => displayStatus(b) === 'Completed').length;
    const spend = all.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + (Number(b.paid) || 0), 0);

    $('#historyStats').innerHTML = `
      <div class="stat">
        <span class="stat__icon">${icon('ticket')}</span>
        <div><b>${all.length}</b><small>Total bookings</small></div>
      </div>
      <div class="stat">
        <span class="stat__icon">${icon('calendar')}</span>
        <div><b>${upcoming}</b><small>Upcoming trips</small></div>
      </div>
      <div class="stat">
        <span class="stat__icon">${icon('checkCircle')}</span>
        <div><b>${past}</b><small>Trips completed</small></div>
      </div>
      <div class="stat">
        <span class="stat__icon">${icon('wallet')}</span>
        <div><b>${money(spend)}</b><small>Paid to date</small></div>
      </div>`;
  }

  /* -------------------------------- Cards --------------------------------- */
  function matches(b) {
    const s = displayStatus(b);
    if (state.filter === 'upcoming' && s !== 'Confirmed') return false;
    if (state.filter === 'past' && s !== 'Completed') return false;
    if (state.filter === 'cancelled' && s !== 'Cancelled') return false;
    if (state.q) {
      const hay = `${b.id} ${b.packageName} ${b.location} ${b.customer?.name || ''}`.toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  }

  function render() {
    const all = readAll().slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const list = all.filter(matches);
    const count = $('#historyCount');

    renderStats();

    if (count) count.textContent = list.length
      ? `${list.length} booking${list.length === 1 ? '' : 's'} shown`
      : '';

    if (!all.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">${icon('ticket')}</div>
          <h3>No bookings yet</h3>
          <p>When you book a trip, it will appear here with its ticket, payment summary and cancellation options.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
            <a class="btn btn--primary" href="packages.html">Explore packages ${icon('arrowRight')}</a>
            <button class="btn btn--ghost" type="button" id="loadDemo">Load a sample booking</button>
          </div>
        </div>`;
      $('#loadDemo')?.addEventListener('click', seedDemo);
      return;
    }

    if (!list.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">${icon('search')}</div>
          <h3>Nothing matches that filter</h3>
          <p>Try another status, or search by your booking ID (starts with WL-).</p>
          <button class="btn btn--ghost" type="button" id="clearHistory">Clear filters ${icon('x')}</button>
        </div>`;
      $('#clearHistory')?.addEventListener('click', () => {
        state.filter = 'all';
        state.q = '';
        $('#historySearch').value = '';
        $$('#historyTabs .chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === 'all'));
        render();
      });
      return;
    }

    listEl.innerHTML = list.map(b => {
      const s = displayStatus(b);
      const travellers = (b.adults || 1) + (b.children || 0);
      return `
      <article class="bh-card" data-id="${esc(b.id)}">
        <div class="bh-card__img"><img src="${b.image}" alt="${esc(b.packageName)}" loading="lazy"></div>
        <div class="bh-card__info">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
            ${statusBadge(b)}
            <small class="muted" style="font-weight:700;letter-spacing:.04em">${esc(b.id)}</small>
          </div>
          <h3>${esc(b.packageName)}</h3>
          <small>${esc(b.location)} · ${esc(b.duration || '')}</small>
          <div class="bh-card__meta">
            <span>${icon('calendar')} ${b.date ? fmtDate(b.date) : 'Date TBC'}</span>
            <span>${icon('users')} ${travellers} traveller${travellers > 1 ? 's' : ''}${b.children ? ` (${b.children} child${b.children > 1 ? 'ren' : ''})` : ''}</span>
            <span>${icon('bed')} ${b.rooms || 1} room${(b.rooms || 1) > 1 ? 's' : ''}</span>
            <span>${icon('creditCard')} ${esc(b.payment || 'UPI')}</span>
          </div>
          ${s === 'Confirmed' ? `<div class="small" style="margin-top:9px;color:var(--success);font-weight:700">${icon('checkCircle')} ${daysUntil(b.date)} day${daysUntil(b.date) === 1 ? '' : 's'} to go · balance ${money(b.balance || 0)} due 15 days before</div>` : ''}
          ${s === 'Cancelled' ? `<div class="small muted" style="margin-top:9px">${icon('info')} Cancelled ${b.cancelledAt ? fmtDate(b.cancelledAt.split('T')[0]) : ''} · refund ${money(b.refund || 0)}</div>` : ''}
        </div>
        <div class="bh-card__side">
          <div class="text-right">
            <b>${money(b.total || 0)}</b>
            <div class="small muted">${money(b.paid || 0)} paid</div>
          </div>
          <div class="bh-card__actions">
            <button class="btn btn--ghost btn--sm" type="button" data-view="${esc(b.id)}">${icon('eye')} View</button>
            <button class="btn btn--ghost btn--sm" type="button" data-print="${esc(b.id)}" aria-label="Print ticket">${icon('printer')}</button>
            ${s === 'Confirmed' ? `<button class="btn btn--ghost btn--sm" type="button" data-cancel="${esc(b.id)}" aria-label="Cancel booking">${icon('trash')}</button>` : ''}
          </div>
        </div>
      </article>`;
    }).join('');

    $$('[data-view]', listEl).forEach(btn => btn.addEventListener('click', () => viewBooking(btn.dataset.view)));
    $$('[data-print]', listEl).forEach(btn => btn.addEventListener('click', () => printBooking(btn.dataset.print)));
    $$('[data-cancel]', listEl).forEach(btn => btn.addEventListener('click', () => confirmCancel(btn.dataset.cancel)));
    initReveal();
  }

  /* -------------------------------- Ticket -------------------------------- */
  function ticketHtml(b) {
    const travellers = (b.adults || 1) + (b.children || 0);
    const s = displayStatus(b);
    return `
      <div class="ticket" style="margin:0;box-shadow:none">
        <div class="ticket__head">
          <div><small>Booking reference</small><b>${esc(b.id)}</b></div>
          ${statusBadge(b)}
        </div>
        <div class="ticket__body">
          <div class="full"><small>Package</small><b>${esc(b.packageName)}</b></div>
          <div><small>Destination</small><b>${esc(b.location)}</b></div>
          <div><small>Duration</small><b>${esc(b.duration || '—')}</b></div>
          <div><small>Travel date</small><b>${b.date ? fmtDate(b.date) : 'TBC'}</b></div>
          <div><small>Travellers</small><b>${travellers} (${b.adults || 1} adult${(b.adults || 1) > 1 ? 's' : ''}${b.children ? `, ${b.children} child${b.children > 1 ? 'ren' : ''}` : ''})</b></div>
          <div><small>Rooms</small><b>${b.rooms || 1}</b></div>
          <div><small>Payment method</small><b>${esc(b.payment || 'UPI')}</b></div>
          <div class="full"><small>Lead traveller</small><b>${esc(b.customer?.name || '—')} · ${esc(b.customer?.email || '')} · ${esc(b.customer?.phone || '')}</b></div>
          ${b.addons?.length ? `<div class="full"><small>Add-ons</small><b>${b.addons.map(esc).join(' · ')}</b></div>` : ''}
          ${b.customer?.notes ? `<div class="full"><small>Special requests</small><b>${esc(b.customer.notes)}</b></div>` : ''}
        </div>
        <div class="ticket__cut"></div>
        <div class="ticket__foot">
          <div>
            <small class="muted" style="display:block;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;font-weight:800">Total package cost</small>
            <b style="font-size:1.25rem">${money(b.total || 0)}</b>
            <div class="small muted">Paid ${money(b.paid || 0)}${s === 'Cancelled' ? ` · refunded ${money(b.refund || 0)}` : ` · balance ${money(b.balance || 0)}`}</div>
          </div>
          <div class="small muted" style="text-align:right">
            Booked ${b.createdAt ? fmtDate(b.createdAt.split('T')[0]) : '—'}<br>Wanderluxe · hello@wanderluxe.in
          </div>
        </div>
      </div>`;
  }

  function viewBooking(id) {
    const b = readAll().find(x => x.id === id);
    if (!b) return;
    const s = displayStatus(b);
    openModal({
      title: 'Booking details',
      body: `
        ${ticketHtml(b)}
        <div class="notice ${s === 'Confirmed' ? 'notice--teal' : ''}" style="margin-top:16px">
          ${icon(s === 'Cancelled' ? 'info' : 'shield')}
          <span>${s === 'Cancelled'
            ? `<b>Cancelled booking.</b> Refund of ${money(b.refund || 0)} is processed to the original payment method within 7–10 working days.`
            : `<b>Free cancellation up to 15 days before departure.</b> Your balance of ${money(b.balance || 0)} is due 15 days before travel. We will send a reminder.`}</span>
        </div>`,
      footer: `
        <button class="btn btn--ghost btn--sm" type="button" onclick="closeModal()">Close</button>
        <button class="btn btn--soft btn--sm" type="button" id="modalPrint">${icon('printer')} Print ticket</button>
        ${s === 'Confirmed' ? `<button class="btn btn--primary btn--sm" type="button" id="modalCancel">${icon('trash')} Cancel booking</button>` : ''}`
    });
    $('#modalPrint')?.addEventListener('click', () => printBooking(id));
    $('#modalCancel')?.addEventListener('click', () => { closeModal(); confirmCancel(id); });
  }

  function printBooking(id) {
    const b = readAll().find(x => x.id === id);
    if (!b) return;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(b.id)} — Wanderluxe</title>
      <style>
        *{box-sizing:border-box}body{font-family:Segoe UI,Arial,sans-serif;color:#0a1b2a;padding:34px;max-width:760px;margin:0 auto}
        .brand{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #ff6a3d;padding-bottom:14px;margin-bottom:22px}
        .brand h1{margin:0;font-size:22px;letter-spacing:-.02em}.brand small{color:#63788a;font-size:12px}
        .ref{font-size:12px;color:#63788a}.ref b{display:block;font-size:17px;color:#0a1b2a;letter-spacing:.02em}
        table{width:100%;border-collapse:collapse;font-size:13px;margin-top:6px}
        td{padding:9px 0;border-bottom:1px dashed #dbe4ec;vertical-align:top}
        td:first-child{color:#63788a;width:38%}td:last-child{font-weight:600}
        .tot{margin-top:18px;background:#f5f8fb;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center}
        .tot b{font-size:20px}
        .foot{margin-top:26px;font-size:11px;color:#63788a;line-height:1.6}
        h2{font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#63788a;margin:24px 0 6px}
      </style></head><body>
      <div class="brand"><div><h1>Wanderluxe</h1><small>India &amp; Beyond · wanderluxe.in</small></div>
      <div class="ref">Booking reference<b>${esc(b.id)}</b></div></div>
      <h2>${esc(b.packageName)}</h2>
      <table>
        <tr><td>Status</td><td>${displayStatus(b)}</td></tr>
        <tr><td>Destination</td><td>${esc(b.location)}</td></tr>
        <tr><td>Duration</td><td>${esc(b.duration || '—')}</td></tr>
        <tr><td>Travel date</td><td>${b.date ? fmtDate(b.date) : 'TBC'}</td></tr>
        <tr><td>Travellers</td><td>${(b.adults || 1)} adult(s)${b.children ? `, ${b.children} child(ren)` : ''} · ${b.rooms || 1} room(s)</td></tr>
        <tr><td>Lead traveller</td><td>${esc(b.customer?.name || '—')}</td></tr>
        <tr><td>Contact</td><td>${esc(b.customer?.phone || '')} · ${esc(b.customer?.email || '')}</td></tr>
        ${b.addons?.length ? `<tr><td>Add-ons</td><td>${b.addons.map(esc).join(', ')}</td></tr>` : ''}
        ${b.promo ? `<tr><td>Promo code</td><td>${esc(b.promo)} (− ${money(b.discount || 0)})</td></tr>` : ''}
        <tr><td>Payment method</td><td>${esc(b.payment || 'UPI')}</td></tr>
        <tr><td>Booked on</td><td>${b.createdAt ? fmtDate(b.createdAt.split('T')[0]) : '—'}</td></tr>
      </table>
      <div class="tot"><span>Total package cost<br><small>Paid ${money(b.paid || 0)}${b.status === 'Cancelled' ? ` · refunded ${money(b.refund || 0)}` : ` · balance ${money(b.balance || 0)}`}</small></span><b>${money(b.total || 0)}</b></div>
      <div class="foot">This is a demo document generated by the Wanderluxe frontend demo. It is not a tax invoice.<br>
      Free cancellation up to 15 days before departure · 50% refundable 7–14 days · non-refundable within 7 days.<br>
      Questions? hello@wanderluxe.in · +91 98765 43210</div>
      </body></html>`;

    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.bottom = '0';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    document.body.appendChild(frame);
    const doc = frame.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    setTimeout(() => {
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } catch {
        showToast('Print blocked', 'Your browser blocked the print dialog.', 'error');
      }
      setTimeout(() => frame.remove(), 1200);
    }, 220);
  }

  /* -------------------------------- Cancel -------------------------------- */
  function confirmCancel(id) {
    const all = readAll();
    const b = all.find(x => x.id === id);
    if (!b) return;
    const r = refundFor(b);

    openModal({
      title: 'Cancel this booking?',
      body: `
        <p style="margin-top:0">You are about to cancel <b>${esc(b.packageName)}</b> (${esc(b.id)}) departing ${b.date ? fmtDate(b.date) : 'TBC'}.</p>
        <div class="review-block" style="margin:16px 0 0">
          <div class="review-block__head"><b>Refund estimate</b><span class="badge ${r.amount > 0 ? 'badge--green' : 'badge--red'}">${r.amount > 0 ? 'Refund due' : 'No refund'}</span></div>
          <div class="review-list">
            <div><span>Days to departure</span><b>${r.days < 0 ? 'Departed' : r.days + ' days'}</b></div>
            <div><span>Amount paid</span><b>${money(b.paid || 0)}</b></div>
            <div><span>Refund amount</span><b style="color:${r.amount > 0 ? 'var(--success)' : 'var(--danger)'}">${money(r.amount)}</b></div>
          </div>
          <p class="small muted" style="margin:10px 0 0">${esc(r.rule)}. Refunds are processed to the original payment method within 7–10 working days.</p>
        </div>
        <div class="notice" style="margin-top:16px">
          ${icon('alert')}
          <span>Cancellation is immediate in this demo. On the live site you would receive an email confirmation and a call from your planner.</span>
        </div>`,
      footer: `
        <button class="btn btn--ghost btn--sm" type="button" onclick="closeModal()">Keep my booking</button>
        <button class="btn btn--primary btn--sm" type="button" id="doCancel" style="background:var(--danger)">Yes, cancel booking</button>`
    });

    $('#doCancel')?.addEventListener('click', () => {
      const idx = all.findIndex(x => x.id === id);
      if (idx < 0) return;
      all[idx] = { ...all[idx], status: 'Cancelled', cancelledAt: new Date().toISOString(), refund: r.amount };
      store.set(BOOKINGS_KEY, all);
      addNotification({
        icon: 'info', tone: 'gold', unread: true, time: 'Just now',
        title: 'Booking cancelled',
        text: `${b.packageName} · ${b.id}${r.amount ? ` · refund ${money(r.amount)}` : ''}`
      });
      closeModal();
      render();
      showToast('Booking cancelled', r.amount > 0 ? `${money(r.amount)} will be refunded within 7–10 working days.` : 'No refund is due under the cancellation policy.', 'info');
    });
  }

  /* --------------------------------- Demo --------------------------------- */
  function seedDemo() {
    const pkg = PACKAGES.find(p => p.id === 'golden-triangle') || PACKAGES[0];
    const date = new Date();
    date.setDate(date.getDate() + 34);
    const iso = date.toISOString().split('T')[0];
    const total = pkg.price * 2 + Math.round((pkg.price * 2) * 0.05);
    const paid = Math.round(total * 0.25);
    const booking = {
      id: 'WL-' + iso.slice(2).replace(/-/g, '') + '-4821',
      packageId: pkg.id,
      packageName: pkg.name,
      image: pkg.image,
      location: pkg.location,
      duration: `${pkg.days}D / ${pkg.nights}N`,
      date: iso,
      adults: 2,
      children: 0,
      rooms: 1,
      addons: ['Travel insurance'],
      promo: 'WANDER10',
      subtotal: pkg.price * 2 + 799 * 2,
      discount: Math.min(5000, Math.round(pkg.price * 2 * 0.1)),
      tax: total - pkg.price * 2,
      total,
      paid,
      balance: total - paid,
      payment: 'UPI',
      customer: { name: 'Demo Traveller', email: 'demo@example.com', phone: '+91 98765 43210', city: 'Bengaluru', pin: '560001', state: 'Karnataka', notes: 'Vegetarian meals, please.', extraNames: '' },
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    const all = readAll();
    all.unshift(booking);
    store.set(BOOKINGS_KEY, all);
    render();
    showToast('Sample booking loaded', 'Explore the ticket, print it or try cancelling.');
  }

  /* -------------------------------- Events -------------------------------- */
  $$('#historyTabs .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.filter = chip.dataset.filter;
      $$('#historyTabs .chip').forEach(c => c.classList.toggle('is-active', c === chip));
      render();
    });
  });

  $('#historySearch')?.addEventListener('input', e => {
    state.q = e.target.value.toLowerCase().trim();
    render();
  });

  render();
});

/* ==========================================================================
   Wanderluxe — contact page
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderOffices();
  renderContactFaq();
  initContactForm();
});

/* --------------------------------- Offices -------------------------------- */
function renderOffices() {
  const grid = $('#officeGrid');
  if (!grid) return;
  const offices = [
    { city: 'Bengaluru', tag: 'Head office', addr: '2nd Floor, Lotus Tower, MG Road, Bengaluru 560001', phone: '+91 80 4123 5678', hours: 'Mon–Sat · 9 am – 8 pm' },
    { city: 'Mumbai', tag: 'West India', addr: 'Unit 704, Marathon Futurex, Lower Parel, Mumbai 400013', phone: '+91 22 4890 1122', hours: 'Mon–Fri · 10 am – 7 pm' },
    { city: 'New Delhi', tag: 'North India', addr: '3rd Floor, Statesman House, Barakhamba Road, New Delhi 110001', phone: '+91 11 4567 8890', hours: 'Mon–Sat · 10 am – 7 pm' }
  ];
  grid.innerHTML = offices.map(o => `
    <div class="office reveal">
      <span class="badge badge--brand">${esc(o.tag)}</span>
      <h4>${esc(o.city)}</h4>
      <p>${esc(o.addr)}</p>
      <p style="margin-top:8px"><a href="tel:${o.phone.replace(/[^+\d]/g, '')}" style="color:var(--brand-dark);font-weight:700">${esc(o.phone)}</a></p>
      <p style="margin-top:2px;font-size:.76rem">${esc(o.hours)}</p>
    </div>`).join('');
}

/* ---------------------------------- FAQ ----------------------------------- */
function renderContactFaq() {
  const acc = $('#contactFaq');
  if (!acc) return;
  const picks = [
    FAQ_GROUPS[0].items[0],
    FAQ_GROUPS[1].items[0],
    FAQ_GROUPS[2].items[0],
    FAQ_GROUPS[3].items[0]
  ];
  acc.innerHTML = picks.map((f, i) => `
    <div class="acc__item ${i === 0 ? 'is-open' : ''}">
      <button class="acc__q" type="button">${esc(f.q)} ${icon('plus')}</button>
      <div class="acc__a"><div>${esc(f.a)}</div></div>
    </div>`).join('');
  initAccordions(acc);
}

/* --------------------------------- Contact -------------------------------- */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const subjectMap = { custom: 'custom', 'existing-booking': 'existing', group: 'group' };

  // prefill from links such as contact.html?subject=custom&date=…&travellers=…
  const subject = params.get('subject');
  if (subject) {
    const val = subjectMap[subject] || subject;
    const sel = $('#cSubject');
    if (sel && [...sel.options].some(o => o.value === val)) sel.value = val;
  }
  const date = params.get('date');
  if (date) {
    const d = $('#cDate');
    d.value = date;
    d.min = new Date().toISOString().split('T')[0];
  } else {
    $('#cDate').min = new Date().toISOString().split('T')[0];
  }
  const travellers = params.get('travellers');
  if (travellers) {
    const t = $('#cTravellers');
    if (t) {
      const v = Number(travellers) >= 6 ? '6' : String(Math.max(1, Number(travellers) || 2));
      t.value = v;
    }
  }

  // deep-link to existing booking: prefill message
  const booking = params.get('booking');
  if (booking) {
    $('#cSubject').value = 'existing';
    $('#cMessage').value = `Hi, I'd like to discuss my booking ${booking}.`;
  }

  const showErr = (input, err, bad) => {
    input.classList.toggle('is-invalid', bad);
    err?.classList.toggle('is-on', bad);
    return !bad;
  };

  ['cName', 'cPhone', 'cEmail', 'cMessage'].forEach(id => {
    $('#' + id)?.addEventListener('input', () => {
      const el = $('#' + id);
      el.classList.remove('is-invalid');
      $('#err' + id.slice(1))?.classList.remove('is-on');
      const map = { cName: 'cNameErr', cPhone: 'cPhoneErr', cEmail: 'cEmailErr', cMessage: 'cMessageErr' };
      $('#' + map[id])?.classList.remove('is-on');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#cName');
    const phone = $('#cPhone');
    const email = $('#cEmail');
    const message = $('#cMessage');

    let ok = true;
    ok = showErr(name, $('#cNameErr'), name.value.trim().length < 2) && ok;
    ok = showErr(phone, $('#cPhoneErr'), !/^\+?[0-9][0-9\s-]{8,14}$/.test(phone.value.trim())) && ok;
    ok = showErr(email, $('#cEmailErr'), !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.value.trim())) && ok;
    ok = showErr(message, $('#cMessageErr'), message.value.trim().length < 8) && ok;

    if (!ok) {
      showToast('Check the form', 'A few fields still need your attention.', 'error');
      form.querySelector('.is-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btn = $('#contactSubmit');
    btn.disabled = true;
    btn.innerHTML = 'Sending…';

    const payload = {
      name: name.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      city: $('#cCity').value.trim(),
      subject: $('#cSubject').value,
      travellers: $('#cTravellers').value,
      date: $('#cDate').value,
      budget: $('#cBudget').value,
      message: message.value.trim(),
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      const all = store.get('wl_enquiries', []);
      all.unshift(payload);
      store.set('wl_enquiries', all.slice(0, 30));

      addNotification({
        icon: 'send', tone: 'teal', unread: true, time: 'Just now',
        title: 'Message received',
        text: `Thanks ${payload.name.split(' ')[0]} — a planner will reply to ${payload.email} shortly.`
      });

      const card = form.closest('.panel-card');
      card.innerHTML = `
        <div class="confirm" style="max-width:none;padding:14px 0">
          <div class="confirm__icon">${icon('check')}</div>
          <h2 style="font-size:1.5rem;margin-bottom:8px">Message sent, ${esc(payload.name.split(' ')[0])}</h2>
          <p class="muted" style="max-width:440px;margin:0 auto 20px">Thank you for writing. A travel planner will reply to <b>${esc(payload.email)}</b> within one working day — usually much sooner.</p>
          <div class="review-block" style="text-align:left;max-width:440px;margin:0 auto 20px">
            <div class="review-block__head"><b>What happens next</b></div>
            <ul class="check-list check-list--yes">
              <li>${icon('checkCircle')} We read your brief and check availability.</li>
              <li>${icon('checkCircle')} You get a day-by-day plan and a clear quote.</li>
              <li>${icon('checkCircle')} We refine it until it feels right — no obligation.</li>
            </ul>
          </div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <a class="btn btn--primary" href="packages.html">Browse packages ${icon('arrowRight')}</a>
            <a class="btn btn--ghost" href="index.html">Back to home</a>
          </div>
          <p class="small muted" style="margin-top:16px">This is a frontend demo — nothing was actually sent or stored outside this browser.</p>
        </div>`;
      showToast('Message sent', 'A planner will be in touch shortly.');
      window.scrollTo({ top: Math.max(0, card.getBoundingClientRect().top + window.scrollY - 120), behavior: 'smooth' });
    }, 850);
  });
}

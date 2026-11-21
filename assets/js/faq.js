/* ==========================================================================
   Wanderluxe — FAQ page
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const nav = $('#faqNav');
  const groupsHost = $('#faqGroups');
  if (!groupsHost) return;
  let q = '';

  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

  /* ------------------------------- Popular -------------------------------- */
  const popular = [
    { label: 'Cancellation policy', target: 'changes' },
    { label: 'Is my booking confirmed?', target: 'booking' },
    { label: 'Are flights included?', target: 'travel' },
    { label: 'Custom itineraries', target: 'custom' }
  ];
  const pop = $('#faqPopular');
  if (pop) {
    pop.innerHTML = `<span class="small muted" style="font-weight:700;align-self:center;margin-right:2px">Popular:</span>` +
      popular.map(p => `<button class="chip" type="button" data-target="${p.target}">${esc(p.label)}</button>`).join('');
    pop.querySelectorAll('[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const first = el.querySelector('.acc__item');
          if (first && !first.classList.contains('is-open')) first.querySelector('.acc__q')?.click();
        }
      });
    });
  }

  /* --------------------------------- Nav ---------------------------------- */
  function renderNav() {
    if (!nav) return;
    nav.innerHTML = FAQ_GROUPS.map(g => {
      const shown = g.items.filter(i => matches(i)).length;
      return `<a href="#${g.id}" data-nav="${g.id}">${esc(g.title)} <span>${q ? shown : g.items.length}</span></a>`;
    }).join('') + `<a href="contact.html" style="color:var(--brand-dark)">Still need help? <span>→</span></a>`;
    nav.querySelectorAll('[data-nav]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById(a.dataset.nav)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* -------------------------------- Render -------------------------------- */
  function matches(item) {
    if (!q) return true;
    return (item.q + ' ' + item.a).toLowerCase().includes(q);
  }

  function renderGroups() {
    groupsHost.innerHTML = FAQ_GROUPS.map(g => {
      const items = g.items.filter(matches);
      if (!items.length) return '';
      return `
        <section class="faq-group" id="${g.id}">
          <div class="faq-group__head">
            <h2>${esc(g.title)}</h2>
            <span class="badge badge--muted">${items.length} question${items.length === 1 ? '' : 's'}</span>
          </div>
          <div class="acc" data-single="true">
            ${items.map((f, i) => `
              <div class="acc__item ${i === 0 && q ? 'is-open' : ''}">
                <button class="acc__q" type="button">${esc(f.q)} ${icon('plus')}</button>
                <div class="acc__a"><div>${esc(f.a)}</div></div>
              </div>`).join('')}
          </div>
        </section>`;
    }).join('');

    if (!groupsHost.innerHTML.trim()) {
      groupsHost.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">${icon('search')}</div>
          <h3>No answers match “${esc(q)}”</h3>
          <p>Try a simpler phrase — “refund”, “visa”, “hotel” — or ask us directly.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px">
            <button class="btn btn--ghost" type="button" id="clearFaq">Clear search ${icon('x')}</button>
            <a class="btn btn--primary" href="contact.html">Ask a planner ${icon('arrowRight')}</a>
          </div>
        </div>`;
      $('#clearFaq')?.addEventListener('click', () => {
        q = '';
        const input = $('#faqSearch');
        if (input) input.value = '';
        renderNav();
        renderGroups();
      });
      return;
    }

    initAccordions(groupsHost);
  }

  function render() {
    renderNav();
    renderGroups();
  }

  $('#faqSearch')?.addEventListener('input', e => {
    q = e.target.value.toLowerCase().trim();
    render();
  });

  /* ------------------------------ Deep links ------------------------------ */
  function goHash() {
    const id = location.hash.replace('#', '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  /* ------------------------------ Active nav ------------------------------ */
  function trackActive() {
    const sections = $$('.faq-group');
    if (!sections.length || !nav) return;
    const y = window.scrollY + 180;
    let activeId = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= y) activeId = s.id; });
    nav.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === activeId));
  }

  window.addEventListener('scroll', trackActive, { passive: true });

  render();
  goHash();
  setTimeout(trackActive, 120);
});

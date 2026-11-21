/* ==========================================================================
   Wanderluxe — travel journal
   ========================================================================== */
const AUTHOR_AVATARS = {
  'Aarav Mehta': 'https://i.pravatar.cc/120?img=11',
  'Rhea Kapoor': 'https://i.pravatar.cc/120?img=45',
  'Nikhil Menon': 'https://i.pravatar.cc/120?img=15',
  'Sara Khan': 'https://i.pravatar.cc/120?img=32',
  'Ishita Rao': 'https://i.pravatar.cc/120?img=47'
};

const ARTICLE_EXTRAS = {
  'best-time-india': {
    quote: 'There is no single best time to visit India — only a best time for the India you want to see.',
    tips: [
      'Book Rajasthan and Kerala between October and March for dry, comfortable days.',
      'Ladakh and Spiti are only realistically open from June to September.',
      'Monsoon is the best-value window for luxury stays in the Western Ghats.',
      'The northeast is at its finest from October to April.'
    ]
  },
  'ladakh-road-trip': {
    quote: 'The mountains do not reward speed. They reward patience, water and a good night of sleep.',
    tips: [
      'Spend two full nights in Leh before attempting Khardung La.',
      'Carry original ID plus photocopies for Inner Line Permits.',
      'Layer up: thermal base, fleece, windproof shell, gloves, balaclava.',
      'Never ride the high passes alone — a support vehicle is not optional.'
    ]
  },
  'kerala-houseboat': {
    quote: 'A houseboat is not a cruise. It is a floating veranda with better food.',
    tips: [
      'Choose a smaller two-bedroom boat over a large one for quieter canals.',
      'Ask for an upper-deck cabin and confirm the route in advance.',
      'Carry mosquito repellent and a power bank — charging points are limited.',
      'Book direct with a reputable operator, or let us vet it for you.'
    ]
  },
  'dubai-family-guide': {
    quote: 'The day your kids remember most will not be the theme park. It will be the pool afternoon.',
    tips: [
      'Schedule a rest block after a late arrival, before any big park day.',
      'Book Burj Khalifa for the last slot before sunset — day and night views.',
      'Choose the shorter desert safari option with younger children.',
      'Keep one full day completely unplanned.'
    ]
  },
  'honeymoon-india': {
    quote: 'One extraordinary night beats five average ones. Spend where it will be remembered.',
    tips: [
      'Udaipur heritage havelis and Alleppey houseboats deliver the most romance per rupee.',
      'Travel late September or early February for shoulder-season rates.',
      'Ask hotels for honeymoon perks — most offer décor or a cake free.',
      'Book the splurge dinner early; the best tables go first.'
    ]
  },
  'packing-smart': {
    quote: 'If you are debating a fourth pair of shoes, you have already packed too many.',
    tips: [
      'One breathable tee, one merino long-sleeve, one packable down jacket.',
      'A rain shell and a scarf cover most Indian weather surprises.',
      'Quick-dry trousers and one comfortable walking shoe will do the rest.',
      'A filtered bottle, power bank and small medical kit finish the kit.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const state = { cat: 'all', q: '' };

  renderFeature();
  renderBlogGrid();
  bindNewsletter();
  initHashRouting();

  $$('#blogChips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.cat = chip.dataset.cat;
      $$('#blogChips .chip').forEach(c => c.classList.toggle('is-active', c === chip));
      renderBlogGrid();
    });
  });

  $('#blogSearch')?.addEventListener('input', e => {
    state.q = e.target.value.toLowerCase().trim();
    renderBlogGrid();
  });

  $('#backToBlog')?.addEventListener('click', () => {
    closeArticle(true);
  });

  function renderFeature() {
    const b = BLOGS[0];
    const host = $('#blogFeature');
    if (!host) return;
    host.innerHTML = `
      <article class="blog-feature reveal">
        <div class="blog-feature__media">
          <img src="${b.image}" alt="${esc(b.title)}">
          <span class="badge badge--brand" style="position:absolute;top:16px;left:16px">Editor's pick</span>
        </div>
        <div class="blog-feature__body">
          <div class="blog-feature__meta">
            <span class="badge badge--muted">${esc(b.category)}</span>
            <span>${fmtDate(b.date)}</span>
            <span>${esc(b.read)} read</span>
          </div>
          <h2>${esc(b.title)}</h2>
          <p>${esc(b.excerpt)}</p>
          <div style="display:flex;align-items:center;gap:12px;margin:18px 0 20px">
            <img src="${AUTHOR_AVATARS[b.author] || 'https://i.pravatar.cc/80?img=12'}" alt="${esc(b.author)}" style="width:38px;height:38px;border-radius:50%;object-fit:cover">
            <div><b style="display:block;font-size:.86rem">${esc(b.author)}</b><small class="muted" style="font-size:.76rem">Travel writer &amp; planner</small></div>
          </div>
          <div>
            <a class="btn btn--primary" href="#${esc(b.id)}" data-article="${esc(b.id)}">Read the story ${icon('arrowRight')}</a>
          </div>
        </div>
      </article>`;

    host.querySelector('[data-article]')?.addEventListener('click', e => {
      e.preventDefault();
      openArticle(b.id);
    });
  }

  function blogCard(b, i) {
    return `
      <article class="bcard reveal" data-delay="${i % 3}">
        <a class="bcard__media" href="#${esc(b.id)}" data-article="${esc(b.id)}">
          <img src="${b.image}" alt="${esc(b.title)}" loading="lazy">
          <span class="badge badge--brand bcard__cat">${esc(b.category)}</span>
        </a>
        <div class="bcard__body">
          <div class="bcard__meta"><span>${fmtDate(b.date)}</span><span>${esc(b.read)} read</span></div>
          <h3><a href="#${esc(b.id)}" data-article="${esc(b.id)}">${esc(b.title)}</a></h3>
          <p>${esc(b.excerpt)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;padding-top:12px">
            <span class="small muted">By ${esc(b.author)}</span>
            <a class="link-arrow" href="#${esc(b.id)}" data-article="${esc(b.id)}">Read ${icon('arrowRight')}</a>
          </div>
        </div>
      </article>`;
  }

  function renderBlogGrid() {
    const grid = $('#blogGrid');
    if (!grid) return;
    const list = BLOGS.slice(1).filter(b => {
      const catOk = state.cat === 'all' || b.category === state.cat;
      const qOk = !state.q || `${b.title} ${b.excerpt} ${b.category} ${b.author}`.toLowerCase().includes(state.q);
      return catOk && qOk;
    });

    const count = $('#blogCount');
    if (count) count.textContent = `${list.length} stor${list.length === 1 ? 'y' : 'ies'}${state.cat === 'all' ? '' : ' in ' + state.cat}`;

    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">${icon('search')}</div>
        <h3>No stories match that search</h3>
        <p>Try another category, or clear the search.</p>
        <button class="btn btn--ghost" type="button" id="clearBlog">Clear filters ${icon('x')}</button>
      </div>`;
      $('#clearBlog')?.addEventListener('click', () => {
        state.cat = 'all';
        state.q = '';
        $('#blogSearch').value = '';
        $$('#blogChips .chip').forEach(c => c.classList.toggle('is-active', c.dataset.cat === 'all'));
        renderBlogGrid();
      });
      return;
    }

    grid.innerHTML = list.map(blogCard).join('');
    grid.querySelectorAll('[data-article]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        openArticle(a.dataset.article);
      });
    });
    initReveal();
  }

  function openArticle(id) {
    const b = BLOGS.find(x => x.id === id);
    if (!b) return;
    const extras = ARTICLE_EXTRAS[b.id] || { quote: '', tips: [] };
    const sentences = b.body.split(/(?<=\.)\s+/);
    const mid = Math.ceil(sentences.length / 2);
    const para1 = sentences.slice(0, mid).join(' ');
    const para2 = sentences.slice(mid).join(' ');
    const related = BLOGS.filter(x => x.id !== b.id && x.category === b.category).slice(0, 2);
    const relatedFinal = related.length ? related : BLOGS.filter(x => x.id !== b.id).slice(0, 2);
    const relatedPkg = PACKAGES.filter(p => !p.priceOnRequest && (b.category === 'Honeymoon' ? p.type === 'honeymoon' : b.category === 'Adventure' ? p.type === 'adventure' : b.category === 'Family' ? p.type === 'family' : true)).slice(0, 2);

    $('#articleWrap').innerHTML = `
      <article class="article">
        <span class="badge badge--brand">${esc(b.category)}</span>
        <h1>${esc(b.title)}</h1>
        <div class="article__meta">
          <img src="${AUTHOR_AVATARS[b.author] || 'https://i.pravatar.cc/80?img=12'}" alt="${esc(b.author)}">
          <div>
            <b>${esc(b.author)}</b>
            <small>${fmtDate(b.date)} · ${esc(b.read)} read</small>
          </div>
          <div class="article__share">
            <button type="button" id="shareArticle" aria-label="Copy link">${icon('send')} Share</button>
          </div>
        </div>
        <div class="article__hero"><img src="${b.image}" alt="${esc(b.title)}"></div>
        <p class="article__lede">${esc(b.excerpt)}</p>
        <p>${esc(para1)}</p>
        ${extras.quote ? `<blockquote>“${esc(extras.quote)}”</blockquote>` : ''}
        <p>${esc(para2)}</p>
        ${extras.tips.length ? `
          <h2>Five things worth knowing</h2>
          <ul class="check-list check-list--yes" style="margin:14px 0 22px">
            ${extras.tips.map(t => `<li>${icon('checkCircle')} ${esc(t)}</li>`).join('')}
          </ul>` : ''}
        <h2>How we would plan it</h2>
        <p>Our planners build this trip around your dates, pace and budget — not a fixed coach schedule. Every itinerary includes handpicked stays, private transfers and a local guide who actually lives there. Tell us what matters to you and we will send a day-by-day plan within 24 hours.</p>
        <div class="notice notice--teal" style="margin:22px 0">
          ${icon('sparkles')}
          <span><b>Planning this trip?</b> Wanderluxe guests get a free itinerary review, even if you booked elsewhere. <a href="contact.html" style="font-weight:800;color:var(--brand-dark)">Talk to a planner →</a></span>
        </div>
      </article>

      <div class="panel-card">
        <h3 style="font-size:1rem">Trips that match this story</h3>
        <div class="grid grid--2" style="margin-top:12px">
          ${relatedPkg.map(p => `
            <a href="package.html?id=${encodeURIComponent(p.id)}" class="mini-trip">
              <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
              <div>
                <b>${esc(p.name)}</b>
                <small>${p.days}D / ${p.nights}N · from ${money(p.price)}</small>
              </div>
              ${icon('arrowRight')}
            </a>`).join('')}
        </div>
      </div>

      <div class="section-head" style="margin:34px 0 16px">
        <span class="eyebrow">Keep reading</span>
        <h2 style="font-size:1.4rem">More from the journal</h2>
      </div>
      <div class="grid grid--2">${relatedFinal.map(blogCard).join('')}</div>`;

    $('#articleWrap').querySelectorAll('[data-article]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        openArticle(a.dataset.article);
      });
    });

    $('#shareArticle')?.addEventListener('click', async () => {
      const url = location.origin + location.pathname + '#' + b.id;
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link copied', 'Share this story with a fellow traveller.');
      } catch {
        showToast('Copy this link', url, 'info');
      }
    });

    $('#blogListSection').hidden = true;
    $('#blogCta').hidden = true;
    $('#articleSection').hidden = false;
    document.title = `${b.title} — Wanderluxe Journal`;
    history.pushState(null, '', '#' + b.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initReveal();
  }

  function closeArticle(push) {
    $('#articleSection').hidden = true;
    $('#blogListSection').hidden = false;
    $('#blogCta').hidden = false;
    document.title = 'Travel Journal — Guides, Tips & Stories | Wanderluxe';
    if (push) history.pushState(null, '', location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initHashRouting() {
    const id = location.hash.replace('#', '');
    if (id && BLOGS.some(b => b.id === id)) {
      setTimeout(() => openArticle(id), 60);
    }
    window.addEventListener('popstate', () => {
      const hash = location.hash.replace('#', '');
      if (hash && BLOGS.some(b => b.id === hash)) openArticle(hash);
      else closeArticle(false);
    });
  }

  function bindNewsletter() {
    ['#blogNewsletter', '#blogNewsletterMain'].forEach(sel => {
      const form = $(sel);
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
    });
  }
});

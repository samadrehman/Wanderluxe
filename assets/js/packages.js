/* ==========================================================================
   Wanderluxe — packages listing
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const validTypes = ['family', 'honeymoon', 'adventure', 'budget', 'weekend', 'group', 'custom'];
  const state = {
    type: validTypes.includes(params.get('type')) ? params.get('type') : 'all',
    region: ['india', 'international'].includes(params.get('region')) ? params.get('region') : 'all',
    q: (params.get('q') || '').toLowerCase().trim(),
    sort: 'popular'
  };

  const grid = $('#pkgGrid');
  const count = $('#pkgCount');
  const search = $('#pkgSearch');
  const region = $('#pkgRegion');
  const sort = $('#pkgSort');

  if (search && params.get('q')) search.value = params.get('q');

  const chips = $$('#typeChips .chip');
  const setType = t => {
    state.type = t;
    chips.forEach(c => c.classList.toggle('is-active', c.dataset.type === t));
    render();
  };
  chips.forEach(c => c.addEventListener('click', () => setType(c.dataset.type)));
  if (state.type !== 'all') setType(state.type);

  if (region && state.region !== 'all') region.value = state.region;
  region?.addEventListener('change', () => { state.region = region.value; render(); });
  sort?.addEventListener('change', () => { state.sort = sort.value; render(); });
  search?.addEventListener('input', () => { state.q = search.value.toLowerCase().trim(); render(); });

  function render() {
    let list = PACKAGES.filter(p => {
      const typeOk = state.type === 'all' || p.type === state.type;
      const regionOk = state.region === 'all' || p.region === state.region;
      const hay = `${p.name} ${p.location} ${p.highlights.join(' ')} ${TYPE_LABELS[p.type]} ${p.region}`.toLowerCase();
      return typeOk && regionOk && (!state.q || hay.includes(state.q));
    });

    if (state.sort === 'price-asc') list.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    else if (state.sort === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (state.sort === 'duration') list.sort((a, b) => b.days - a.days);
    else list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

    if (count) count.textContent = `${list.length} package${list.length === 1 ? '' : 's'}${state.type === 'all' ? '' : ' · ' + TYPE_LABELS[state.type]}`;

    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">${icon('search')}</div>
        <h3>No packages match those filters</h3>
        <p>Try another type or region — or let us design something just for you.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px">
          <button class="btn btn--ghost" type="button" id="clearPkg">Clear filters ${icon('x')}</button>
          <a class="btn btn--primary" href="contact.html">Plan a custom trip ${icon('arrowRight')}</a>
        </div>
      </div>`;
      $('#clearPkg')?.addEventListener('click', () => {
        state.type = 'all'; state.region = 'all'; state.q = ''; state.sort = 'popular';
        chips.forEach(c => c.classList.toggle('is-active', c.dataset.type === 'all'));
        if (region) region.value = 'all';
        if (sort) sort.value = 'popular';
        if (search) search.value = '';
        render();
      });
      return;
    }

    grid.innerHTML = list.map((p, i) => packageCard(p, i % 3)).join('');
    initReveal();
  }

  render();
});

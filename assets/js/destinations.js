/* ==========================================================================
   Wanderluxe — destinations listing
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const state = {
    region: params.get('region') === 'international' ? 'international' : params.get('region') === 'india' ? 'india' : 'all',
    interest: 'all',
    sort: 'popular',
    q: (params.get('q') || '').toLowerCase().trim()
  };

  const grid = $('#destGrid');
  const count = $('#destCount');
  const search = $('#destSearch');
  const interest = $('#destInterest');
  const sort = $('#destSort');

  if (search && state.q) search.value = params.get('q');

  const date = params.get('date');
  const travellers = params.get('travellers');
  if (date && $('#destNote')) {
    $('#destNote').innerHTML = `<div class="notice notice--teal" style="margin-bottom:18px"><i data-icon="calendar"></i><span><b>Showing trips for ${fmtDate(date)}</b> · ${travellers || 2} traveller${travellers === '1' ? '' : 's'}. Availability is confirmed at booking, and dates can be changed free up to 15 days before departure.</span></div>`;
    hydrateIcons($('#destNote'));
  }

  const chips = $$('#regionChips .chip');
  const setRegion = r => {
    state.region = r;
    chips.forEach(c => c.classList.toggle('is-active', c.dataset.region === r));
    render();
  };
  chips.forEach(c => c.addEventListener('click', () => setRegion(c.dataset.region)));
  if (state.region !== 'all') setRegion(state.region);

  search?.addEventListener('input', () => { state.q = search.value.toLowerCase().trim(); render(); });
  interest?.addEventListener('change', () => { state.interest = interest.value; render(); });
  sort?.addEventListener('change', () => { state.sort = sort.value; render(); });

  function render() {
    let list = DESTINATIONS.filter(d => {
      const regionOk = state.region === 'all' || d.region === state.region;
      const interestOk = state.interest === 'all' || d.tags.includes(state.interest);
      const qOk = !state.q || (d.name + ' ' + d.state + ' ' + d.country + ' ' + d.tagline + ' ' + d.tags.join(' ')).toLowerCase().includes(state.q);
      return regionOk && interestOk && qOk;
    });

    if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

    if (count) count.textContent = `${list.length} destination${list.length === 1 ? '' : 's'} found${state.region === 'all' ? '' : ' in ' + (state.region === 'india' ? 'India' : 'the world')}`;

    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">${icon('search')}</div>
        <h3>No destinations match that search</h3>
        <p>Try a broader interest, or ask us — we plan trips to places that are not on this list.</p>
        <button class="btn btn--primary" onclick="document.getElementById('destSearch').value='';document.getElementById('destSearch').dispatchEvent(new Event('input'));document.getElementById('destInterest').value='all';document.getElementById('destInterest').dispatchEvent(new Event('change'));">Clear filters ${icon('x')}</button>
      </div>`;
      return;
    }

    grid.innerHTML = list.map((d, i) => destCard(d, i % 3)).join('');
    initReveal();
    bindFavorites(grid);
  }

  render();
});

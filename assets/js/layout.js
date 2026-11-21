/* ==========================================================================
   Wanderluxe — shared layout, icons, notifications & helpers
   ========================================================================== */

const ICONS = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2.1 4.9-4.9 2.1 2.1-4.9z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  star: '<path fill="currentColor" stroke="none" d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  headset: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  hotel: '<path d="M3 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><path d="M15 21V11h4a2 2 0 0 1 2 2v8M3 21h18M7 9h4M7 13h4M7 17h4"/>',
  car: '<path d="M5 17h14M6.5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM21.5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path d="M3 17v-5l2-5h14l2 5v5"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l5.6 4.6-2.6 2.6-2.7-.6a1 1 0 0 0-.9 1.6l2.9 2.9 2.9 2.9a1 1 0 0 0 1.6-.9l-.6-2.7 2.6-2.6 4.6 5.6a1 1 0 0 0 1.7-.9z"/>',
  bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V6h12v4"/>',
  utensils: '<path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 2c-2 2-3 4-3 7v5h3v8"/>',
  sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
  tag: '<path d="M20.6 13.4 12 22 2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9M12 8v14M12 8S9 2 6.5 4.5 12 8 12 8zM12 8s3-6 5.5-3.5S12 8 12 8z"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
  twitter: '<path d="M22 4a10 10 0 0 1-2.9.8A5 5 0 0 0 21.3 2a10 10 0 0 1-3.2 1.2 5 5 0 0 0-8.5 4.5A14 14 0 0 1 2 3.5a5 5 0 0 0 1.5 6.7A5 5 0 0 1 1.2 9.5v.1a5 5 0 0 0 4 4.9 5 5 0 0 1-2.2.1 5 5 0 0 0 4.6 3.5A10 10 0 0 1 1 20a14 14 0 0 0 7.6 2.2c9 0 14-7.5 14-14v-.6A10 10 0 0 0 22 4z"/>',
  youtube: '<path d="M22.5 6.2a3 3 0 0 0-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.6A3 3 0 0 0 1.5 6.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 8.4.6 8.4.6s6.5 0 8.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-5.8z"/><path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 8.5c.5 3 2.5 5 5.5 5.8"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  cloudRain: '<path d="M17.5 15a4.5 4.5 0 0 0-1-8.9A6 6 0 0 0 5 8a4 4 0 0 0 0 8h12.5z"/><path d="M8 19v2M12 19v2M16 19v2"/>',
  snow: '<path d="M12 2v20M4.2 6l15.6 12M19.8 6 4.2 18M8 4l4 4 4-4M8 20l4-4 4 4"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 8-11 16-11 0 8-5 16-11 16z"/><path d="M4 21c2-6 6-10 12-13"/>',
  mountain: '<path d="m3 20 6-12 4 7 2-3 6 8z"/><path d="m7 12 2-4 2 4"/>',
  anchor: '<circle cx="12" cy="5" r="3"/><path d="M12 8v14M5 12H2a10 10 0 0 0 20 0h-3"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17.5V14l-3-3 4-3 2 3h2"/>',
  ticket: '<path d="M3 9a3 3 0 0 0 0 6v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a3 3 0 0 0 0-6V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  quote: '<path d="M9 11H5a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3M20 11h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3"/><path d="M4 11c0 5 3 8 7 9M15 11c0 5 3 8 7 9"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  creditCard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h5a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h5"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.5-1.7 8L12 19l5.5 2.5-1.7-8"/>',
  umbrella: '<path d="M22 12a10 10 0 0 0-20 0z"/><path d="M12 12v7a3 3 0 0 0 6 0"/>'
};

function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.compass;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ------------------------------- Utilities -------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const money = n => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

function fmtDate(iso, opts = {}) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', ...opts });
}

function shortDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    weekday: d.toLocaleDateString('en-IN', { weekday: 'short' }),
    year: d.getFullYear()
  };
}

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* storage unavailable */ }
  }
};

const placeholder = (label = 'Wanderluxe') => {
  const text = encodeURIComponent(String(label).slice(0, 42));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b2b41"/><stop offset=".55" stop-color="#14506b"/><stop offset="1" stop-color="#ff6a3d"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="650" cy="120" r="150" fill="rgba(255,255,255,.08)"/><circle cx="120" cy="500" r="190" fill="rgba(255,255,255,.06)"/><text x="50%" y="50%" font-family="Segoe UI,Arial" font-size="34" font-weight="700" fill="rgba(255,255,255,.92)" text-anchor="middle">${text}</text><text x="50%" y="58%" font-family="Segoe UI,Arial" font-size="16" fill="rgba(255,255,255,.65)" text-anchor="middle">WANDERLUXE</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

document.addEventListener('error', e => {
  const el = e.target;
  if (el && el.tagName === 'IMG' && !el.dataset.fallback) {
    el.dataset.fallback = '1';
    el.src = placeholder(el.alt || 'Wanderluxe');
  }
}, true);

/* ------------------------------- Notifications ---------------------------- */
const NOTIF_KEY = 'wl_notifs';
const READ_KEY = 'wl_notif_read';

function allNotifications() {
  const custom = store.get(NOTIF_KEY, []);
  return [...custom, ...NOTIFICATIONS];
}

function unreadCount() {
  const read = store.get(READ_KEY, []);
  return allNotifications().filter(n => n.unread && !read.includes(n.id)).length;
}

function addNotification(n) {
  const custom = store.get(NOTIF_KEY, []);
  custom.unshift({ id: 'n_' + Date.now(), unread: true, time: 'Just now', icon: 'checkCircle', tone: 'teal', ...n });
  store.set(NOTIF_KEY, custom.slice(0, 12));
  renderNotifications();
}

function markAllRead() {
  const read = allNotifications().map(n => n.id);
  store.set(READ_KEY, read);
  renderNotifications();
}

function renderNotifications() {
  const list = $('#notifList');
  const dot = $('#notifDot');
  if (!list) return;
  const read = store.get(READ_KEY, []);
  const items = allNotifications();
  const unread = items.filter(n => n.unread && !read.includes(n.id)).length;
  if (dot) dot.classList.toggle('is-on', unread > 0);
  list.innerHTML = items.length ? items.map(n => `
    <div class="notif__item ${n.unread && !read.includes(n.id) ? 'is-new' : ''}">
      <span class="notif__icon ${n.tone === 'teal' ? 'notif__icon--teal' : n.tone === 'gold' ? 'notif__icon--gold' : ''}">${icon(n.icon || 'bell')}</span>
      <div>
        <strong>${esc(n.title)}</strong>
        <p>${esc(n.text)}</p>
        <time>${esc(n.time || '')}</time>
      </div>
    </div>`).join('') : '<div class="notif__empty">No notifications yet.</div>';
}

/* ---------------------------------- Toast --------------------------------- */
function showToast(title, text = '', type = 'success', ms = 4200) {
  let wrap = $('#toasts');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toasts';
    wrap.id = 'toasts';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'error' ? ' toast--error' : type === 'info' ? ' toast--info' : '');
  el.innerHTML = `
    <span class="toast__icon">${icon(type === 'error' ? 'alert' : type === 'info' ? 'info' : 'check')}</span>
    <div><b>${esc(title)}</b>${text ? `<p>${esc(text)}</p>` : ''}</div>
    <button class="toast__close" aria-label="Dismiss">${icon('x')}</button>`;
  const close = () => {
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 320);
  };
  el.querySelector('.toast__close').addEventListener('click', close);
  wrap.appendChild(el);
  setTimeout(close, ms);
}

/* ---------------------------------- Modal --------------------------------- */
function ensureModal() {
  let modal = $('#wlModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'wlModal';
  modal.innerHTML = `
    <div class="modal__scrim" data-close></div>
    <div class="modal__box" role="dialog" aria-modal="true">
      <div class="modal__head"><h3 id="wlModalTitle">Details</h3><button class="modal__close" data-close aria-label="Close">${icon('x')}</button></div>
      <div class="modal__body" id="wlModalBody"></div>
      <div class="modal__foot" id="wlModalFoot"></div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  return modal;
}

function openModal({ title = 'Details', body = '', footer = '' }) {
  const modal = ensureModal();
  $('#wlModalTitle').textContent = title;
  $('#wlModalBody').innerHTML = body;
  const foot = $('#wlModalFoot');
  foot.innerHTML = footer;
  foot.style.display = footer ? 'flex' : 'none';
  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  const modal = $('#wlModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeLightbox();
    closeDrawer();
    const notif = $('#notifPanel');
    if (notif) notif.classList.remove('is-open');
  }
});

/* --------------------------------- Lightbox ------------------------------- */
let LB = { items: [], index: 0 };

function initLightbox() {
  if ($('#lightbox')) return;
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.id = 'lightbox';
  el.innerHTML = `
    <button class="lightbox__close" aria-label="Close">${icon('x')}</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">${icon('arrowLeft')}</button>
    <img alt="Gallery photo">
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">${icon('arrowRight')}</button>
    <div class="lightbox__cap"></div>`;
  document.body.appendChild(el);
  el.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  el.querySelector('.lightbox__nav--prev').addEventListener('click', () => stepLightbox(-1));
  el.querySelector('.lightbox__nav--next').addEventListener('click', () => stepLightbox(1));
  el.addEventListener('click', e => { if (e.target === el) closeLightbox(); });
}

function openLightbox(items, index = 0) {
  initLightbox();
  LB.items = items;
  LB.index = index;
  renderLightbox();
  $('#lightbox').classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function renderLightbox() {
  const el = $('#lightbox');
  if (!el) return;
  const item = LB.items[LB.index];
  const src = typeof item === 'string' ? item : item.src;
  const cap = typeof item === 'string' ? '' : item.caption;
  el.querySelector('img').src = src;
  el.querySelector('.lightbox__cap').textContent = cap || '';
}

function stepLightbox(dir) {
  if (!LB.items.length) return;
  LB.index = (LB.index + dir + LB.items.length) % LB.items.length;
  renderLightbox();
}

function closeLightbox() {
  const el = $('#lightbox');
  if (el) el.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

document.addEventListener('keydown', e => {
  const el = $('#lightbox');
  if (!el || !el.classList.contains('is-open')) return;
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
});

/* --------------------------------- Drawer --------------------------------- */
function openDrawer() {
  $('#drawer')?.classList.add('is-open');
  $('#scrim')?.classList.add('is-open');
  document.body.classList.add('no-scroll');
}
function closeDrawer() {
  $('#drawer')?.classList.remove('is-open');
  $('#scrim')?.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

/* --------------------------------- Accordion ------------------------------ */
function initAccordions(root = document) {
  $$('.acc__item', root).forEach(item => {
    const q = item.querySelector('.acc__q');
    const a = item.querySelector('.acc__a');
    if (!q || !a) return;
    if (item.classList.contains('is-open')) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', () => {
      const parent = item.parentElement;
      const single = parent?.dataset.single !== 'false';
      if (single) {
        $$('.acc__item', parent).forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const oa = other.querySelector('.acc__a');
            if (oa) oa.style.maxHeight = null;
          }
        });
      }
      item.classList.toggle('is-open');
      a.style.maxHeight = item.classList.contains('is-open') ? a.scrollHeight + 'px' : null;
    });
  });
}

/* ---------------------------------- Reveal -------------------------------- */
function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* -------------------------------- Header/Footer --------------------------- */
const NAV = [
  { label: 'Home', href: 'index.html' },
  {
    label: 'Destinations', href: 'destinations.html',
    menu: [
      { href: 'destinations.html', icon: 'globe', title: 'All destinations', sub: '24 curated places' },
      { href: 'destinations.html?region=india', icon: 'mapPin', title: 'Domestic — India', sub: 'Himalayas to backwaters' },
      { href: 'destinations.html?region=international', icon: 'plane', title: 'International', sub: '20+ countries' },
      { href: 'destinations.html#best-time', icon: 'sun', title: 'Best time to visit', sub: 'Season-by-season guide' }
    ]
  },
  {
    label: 'Packages', href: 'packages.html',
    wide: true,
    menu: [
      { href: 'packages.html?type=family', icon: 'users', title: 'Family tours', sub: 'Kid-friendly & easy paced' },
      { href: 'packages.html?type=honeymoon', icon: 'heart', title: 'Honeymoon', sub: 'Romance, sorted' },
      { href: 'packages.html?type=adventure', icon: 'mountain', title: 'Adventure', sub: 'Raft, ride, trek' },
      { href: 'packages.html?type=budget', icon: 'wallet', title: 'Budget tours', sub: 'Big trips, small spends' },
      { href: 'packages.html?type=weekend', icon: 'clock', title: 'Weekend trips', sub: 'Friday to Sunday' },
      { href: 'packages.html?type=group', icon: 'users', title: 'Group tours', sub: 'Travel, make friends' },
      { href: 'packages.html?type=custom', icon: 'sparkles', title: 'Custom packages', sub: 'Built around you' },
      { href: 'packages.html?region=international', icon: 'globe', title: 'International', sub: 'Passport ready' }
    ]
  },
  { label: 'Gallery', href: 'index.html#gallery' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' }
];

function brandMarkup() {
  return `
    <a href="index.html" class="brand" aria-label="Wanderluxe home">
      <span class="brand__mark">${icon('compass')}</span>
      <span class="brand__text"><strong>Wanderluxe</strong><small>India &amp; Beyond</small></span>
    </a>`;
}

function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const page = location.pathname.split('/').pop() || 'index.html';
  const navHtml = NAV.map(item => {
    const active = page === item.href.split('?')[0] || (page === 'package.html' && item.label === 'Packages') ? 'is-active' : '';
    if (!item.menu) {
      return `<li><a class="nav__link ${active}" href="${item.href}">${item.label}</a></li>`;
    }
    const menu = item.menu.map(m => `
      <a href="${m.href}">${icon(m.icon)}<span>${m.title}<small>${m.sub}</small></span></a>`).join('');
    return `<li>
      <a class="nav__link ${active}" href="${item.href}">${item.label} ${icon('chevronDown')}</a>
      <div class="menu ${item.wide ? 'menu--wide' : ''}">${menu}</div>
    </li>`;
  }).join('');

  const drawerNav = NAV.map(item => {
    if (!item.menu) return `<a href="${item.href}">${item.label} ${icon('chevronRight')}</a>`;
    const sub = item.menu.map(m => `<a href="${m.href}">${m.title}</a>`).join('');
    return `<a href="${item.href}">${item.label} ${icon('chevronRight')}</a><div class="drawer__sub">${sub}</div>`;
  }).join('');

  host.innerHTML = `
    <div class="topbar">
      <div class="container topbar__inner">
        <div class="topbar__left">
          <span>${icon('shield')} Free cancellation up to 15 days</span>
          <span>${icon('headset')} 24×7 human support</span>
        </div>
        <div class="topbar__right">
          <a href="tel:+919876543210">${icon('phone')} +91 98765 43210</a>
          <a href="mailto:hello@wanderluxe.in">${icon('mail')} hello@wanderluxe.in</a>
          <span><i class="dot"></i> Open now</span>
        </div>
      </div>
    </div>
    <header class="header" id="header">
      <div class="container header__inner">
        ${brandMarkup()}
        <nav class="nav" aria-label="Main"><ul>${navHtml}</ul></nav>
        <div class="header__actions">
          <button class="iconbtn" id="notifToggle" aria-label="Notifications" aria-expanded="false">
            ${icon('bell')}<span class="iconbtn__dot" id="notifDot"></span>
          </button>
          <a class="btn btn--ghost hide-sm" href="booking-history.html">${icon('ticket')} My bookings</a>
          <a class="btn btn--primary" href="packages.html">Explore tours ${icon('arrowRight')}</a>
          <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
      <div class="notif" id="notifPanel" aria-label="Notifications">
        <div class="notif__head"><h4>Notifications</h4><button id="markRead">Mark all read</button></div>
        <div class="notif__list" id="notifList"></div>
      </div>
    </header>
    <div class="scrim" id="scrim"></div>
    <aside class="drawer" id="drawer" aria-label="Mobile menu">
      <div class="drawer__head">
        ${brandMarkup()}
        <button class="drawer__close" id="drawerClose" aria-label="Close menu">${icon('x')}</button>
      </div>
      <nav>${drawerNav}
        <a href="faq.html">FAQ ${icon('chevronRight')}</a>
        <a href="booking-history.html">My bookings ${icon('chevronRight')}</a>
      </nav>
      <div class="drawer__cta">
        <a class="btn btn--primary btn--block" href="packages.html">Explore tours ${icon('arrowRight')}</a>
        <a class="btn btn--ghost btn--block" href="tel:+919876543210">${icon('phone')} +91 98765 43210</a>
      </div>
    </aside>`;

  // interactions
  const header = $('#header');
  const onScroll = () => header?.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  $('#burger')?.addEventListener('click', openDrawer);
  $('#drawerClose')?.addEventListener('click', closeDrawer);
  $('#scrim')?.addEventListener('click', closeDrawer);

  const notifBtn = $('#notifToggle');
  const notifPanel = $('#notifPanel');
  notifBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = notifPanel.classList.toggle('is-open');
    notifBtn.setAttribute('aria-expanded', String(open));
    if (open) renderNotifications();
  });
  $('#markRead')?.addEventListener('click', markAllRead);
  document.addEventListener('click', e => {
    if (notifPanel?.classList.contains('is-open') && !e.target.closest('#notifPanel') && !e.target.closest('#notifToggle')) {
      notifPanel.classList.remove('is-open');
      notifBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  renderNotifications();
}

function renderFooter() {
  const host = $('#site-footer');
  if (!host) return;
  host.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            ${brandMarkup()}
            <p class="footer__about">Small-group and private journeys across India and 24 countries. Handpicked stays, honest pricing and real people on call — since 2014.</p>
            <div class="footer__social">
              <a href="#" aria-label="Instagram">${icon('instagram')}</a>
              <a href="#" aria-label="Facebook">${icon('facebook')}</a>
              <a href="#" aria-label="YouTube">${icon('youtube')}</a>
              <a href="#" aria-label="WhatsApp">${icon('whatsapp')}</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="destinations.html">All destinations</a></li>
              <li><a href="destinations.html?region=india">India</a></li>
              <li><a href="destinations.html?region=international">International</a></li>
              <li><a href="packages.html">Tour packages</a></li>
              <li><a href="index.html#offers">Offers &amp; discounts</a></li>
              <li><a href="index.html#gallery">Photo gallery</a></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="booking-history.html">My bookings</a></li>
              <li><a href="contact.html">Contact us</a></li>
              <li><a href="blog.html">Travel journal</a></li>
              <li><a href="faq.html#changes">Cancellation policy</a></li>
              <li><a href="contact.html#offices">Our offices</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul class="footer__contact">
              <li>${icon('mapPin')}<span>2nd Floor, Lotus Tower, MG Road,<br>Bengaluru 560001, India</span></li>
              <li>${icon('phone')}<a href="tel:+919876543210">+91 98765 43210</a></li>
              <li>${icon('mail')}<a href="mailto:hello@wanderluxe.in">hello@wanderluxe.in</a></li>
              <li>${icon('clock')}<span>Mon–Sat, 9:00 am – 8:00 pm IST</span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© <span id="year"></span> Wanderluxe Travel Pvt. Ltd. All rights reserved.</span>
          <span class="pay"><span>UPI</span><span>VISA</span><span>Mastercard</span><span>RuPay</span><span>EMI</span></span>
          <span>Made with care in India ${icon('heart')}</span>
        </div>
      </div>
    </footer>
    <button class="totop" id="totop" aria-label="Back to top">${icon('arrowUp')}</button>`;
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
  $('#totop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const totop = $('#totop');
  window.addEventListener('scroll', () => totop?.classList.toggle('is-on', window.scrollY > 700), { passive: true });
}

/* ------------------------------ Icon hydration ---------------------------- */
function hydrateIcons(root = document) {
  $$('[data-icon]', root).forEach(el => {
    if (el.dataset.iconReady) return;
    el.innerHTML = icon(el.dataset.icon);
    el.dataset.iconReady = '1';
    el.classList.add('ico');
  });
}

/* ---------------------------------- Boot ---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  hydrateIcons();
  renderHeader();
  renderFooter();
  initReveal();
  initAccordions();
});

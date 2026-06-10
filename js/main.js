/* ── Dark mode ─────────────────────────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('darkToggle');
  const html = document.documentElement;

  function apply(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (!btn) return;
    btn.textContent = dark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  apply(html.getAttribute('data-theme') === 'dark');

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') !== 'dark';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      apply(isDark);
    });
  }
})();

/* ── Navbar hamburger ──────────────────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ── Menu rendering ────────────────────────────────────────────────────── */
function renderMenu(filterCat) {
  const items     = getMenuData();
  const container = document.getElementById('menuContent');
  container.innerHTML = '';

  const cats = filterCat === 'all' ? ['drinks','food','pizza'] : [filterCat];

  cats.forEach(cat => {
    const meta     = MENU_META[cat];
    const catItems = items.filter(i => i.category === cat && i.available);
    if (!catItems.length) return;

    if (filterCat === 'all') {
      const h = document.createElement('div');
      h.className = 'cat-header';
      h.innerHTML = `<span>${meta.icon}</span><span>${meta.label}</span>`;
      container.appendChild(h);
    }

    const subs = [...new Set(catItems.map(i => i.sub))];

    subs.forEach(sub => {
      const subItems = catItems.filter(i => i.sub === sub);
      if (!subItems.length) return;
      const icon = meta.icons[sub] || '•';

      const sh = document.createElement('div');
      sh.className = 'sub-header';
      sh.innerHTML = `<span>${icon}</span><span>${sub}</span>`;
      container.appendChild(sh);

      if (cat === 'pizza') {
        const grid = document.createElement('div');
        grid.className = 'pizza-grid';
        subItems.forEach(item => {
          const card = document.createElement('div');
          card.className = 'pizza-card';
          card.innerHTML = `
            <div class="pizza-img">
              ${item.imageUrl
                ? `<img src="${escHtml(item.imageUrl)}" alt="${escHtml(item.name)}" loading="lazy">`
                : `<div class="pizza-img-ph">🍕</div>`}
            </div>
            <div class="pizza-body">
              <div class="pizza-name">${escHtml(item.name)}</div>
              ${item.desc ? `<div class="pizza-desc">${escHtml(item.desc)}</div>` : ''}
              <div class="pizza-price">${escHtml(item.price)}</div>
            </div>`;
          grid.appendChild(card);
        });
        container.appendChild(grid);
      } else {
        const list = document.createElement('div');
        list.className = 'menu-list';
        subItems.forEach(item => {
          const row = document.createElement('div');
          row.className = 'menu-row';
          row.innerHTML = `
            <div class="item-icon">${icon}</div>
            <div class="item-info">
              <div class="item-name">${escHtml(item.name)}</div>
              ${item.desc ? `<div class="item-desc">${escHtml(item.desc)}</div>` : ''}
            </div>
            <div class="item-price">${escHtml(item.price)}</div>`;
          list.appendChild(row);
        });
        container.appendChild(list);
      }
    });
  });
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Menu tabs ─────────────────────────────────────────────────────────── */
(function () {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    renderMenu(t.dataset.cat);
  }));
  renderMenu('all');
})();

/* ── Contact form ──────────────────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('successMsg');
    msg.classList.add('show');
    form.reset();
    setTimeout(() => msg.classList.remove('show'), 5000);
  });
})();

/* ── Open / closed status ──────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('openStatus');
  if (!el) return;
  const now  = new Date();
  const day  = now.getDay();
  const h    = now.getHours() + now.getMinutes() / 60;
  let open   = false;
  if      (day >= 1 && day <= 5) open = h >= 7  && h < 21;
  else if (day === 6)            open = h >= 8  && h < 22;
  else                           open = h >= 9  && h < 20;
  el.textContent = open ? "🟢 We're Open Now!" : '🔴 Currently Closed';
  el.style.color = open ? '#86efac' : '#fca5a5';
})();

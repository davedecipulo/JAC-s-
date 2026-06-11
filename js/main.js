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
let _currentTab  = 'all';
let _menuItems   = null;  // cached for cart use

async function renderMenu(filterCat) {
  _currentTab = filterCat;
  const container = document.getElementById('menuContent');
  container.innerHTML = `
    <div class="menu-loading">
      <div class="loading-spinner"></div>
      <span>Loading menu…</span>
    </div>`;

  const items = await getMenuData();
  _menuItems = items;  // cache for addToCart
  container.innerHTML = '';

  const cats = filterCat === 'all' ? ['drinks','food','pizza'] : [filterCat];
  let rendered = 0;

  cats.forEach(cat => {
    const meta     = MENU_META[cat];
    const catItems = items.filter(i => i.category === cat && i.available);
    if (!catItems.length) return;

    if (filterCat === 'all') {
      const h = document.createElement('div');
      h.className = 'cat-header fade-in-row';
      h.innerHTML = `<span>${meta.icon}</span><span>${meta.label}</span>`;
      container.appendChild(h);
    }

    const subs = [...new Set(catItems.map(i => i.sub))];

    subs.forEach(sub => {
      const subItems = catItems.filter(i => i.sub === sub);
      if (!subItems.length) return;
      const icon = meta.icons[sub] || '•';

      const sh = document.createElement('div');
      sh.className = 'sub-header fade-in-row';
      sh.style.animationDelay = `${rendered * 0.03}s`;
      sh.innerHTML = `<span>${icon}</span><span>${sub}</span>`;
      container.appendChild(sh);

      if (cat === 'pizza') {
        const grid = document.createElement('div');
        grid.className = 'pizza-grid';
        subItems.forEach((item, i) => {
          const card = document.createElement('div');
          card.className = 'pizza-card fade-in-row';
          card.style.animationDelay = `${(rendered + i) * 0.05}s`;
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
            </div>
            <button class="btn-add-order-pizza" onclick="addToCart('${escHtml(item.id)}')">Add to Order</button>`;
          grid.appendChild(card);
          rendered++;
        });
        container.appendChild(grid);
      } else {
        const list = document.createElement('div');
        list.className = 'menu-list';
        subItems.forEach((item, i) => {
          const row = document.createElement('div');
          row.className = 'menu-row fade-in-row';
          row.style.animationDelay = `${(rendered + i) * 0.03}s`;
          const imgHtml = item.imageUrl
            ? `<img src="${escHtml(item.imageUrl)}" class="item-thumb" alt="" loading="lazy">`
            : '';
          row.innerHTML = `
            <div class="item-icon">${icon}</div>
            ${imgHtml}
            <div class="item-info">
              <div class="item-name">${escHtml(item.name)}</div>
              ${item.desc ? `<div class="item-desc">${escHtml(item.desc)}</div>` : ''}
            </div>
            <div class="item-price">${escHtml(item.price)}</div>
            <button class="btn-add-order-sm" onclick="addToCart('${escHtml(item.id)}')" aria-label="Add to order">+</button>`;
          list.appendChild(row);
          rendered++;
        });
        container.appendChild(list);
      }
    });
  });

  if (!rendered) {
    container.innerHTML = `<div class="menu-loading"><span>No items available.</span></div>`;
  }
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

  // Live-update from Supabase Realtime when admin makes changes
  if (SUPABASE_CONFIGURED && supabaseClient) {
    supabaseClient
      .channel('menu-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, () => {
        renderMenu(_currentTab);
      })
      .subscribe();
  }
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

/* ── Gallery ─────────────────────────────────────────────────────────────── */
async function renderGallery() {
  const section = document.getElementById('gallery');
  const grid    = document.getElementById('galleryGrid');
  if (!section || !grid) return;

  const photos = await getShopPhotos();
  if (!photos.length) {
    section.style.display = 'none';
    const mLink = document.getElementById('galleryMobileLink');
    if (mLink) mLink.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  const mLink = document.getElementById('galleryMobileLink');
  if (mLink) mLink.style.display = 'block';

  grid.innerHTML = photos.map(p => `
    <div class="gallery-photo fade-in-row">
      <img src="${escHtml(p.imageUrl)}" alt="${escHtml(p.caption || 'Shop photo')}" loading="lazy">
      ${p.caption ? `<div class="gallery-caption">${escHtml(p.caption)}</div>` : ''}
    </div>
  `).join('');
}

(function () {
  renderGallery();
  if (SUPABASE_CONFIGURED && supabaseClient) {
    supabaseClient
      .channel('gallery-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shop_photos' }, () => {
        renderGallery();
      })
      .subscribe();
  }
})();

/* ── Cart state ──────────────────────────────────────────────────────────── */
let _cart = [];

function parsePriceOptions(priceStr) {
  const parts = String(priceStr || '').split(/\s*·\s*/);
  return parts.map(p => {
    const m = p.match(/^(.*?)\s*₱(\d+(?:\.\d+)?)\s*$/);
    if (m) return { label: m[1].trim(), price: parseFloat(m[2]) };
    const n = p.match(/₱(\d+(?:\.\d+)?)/);
    return { label: p.replace(/₱\d+/, '').trim(), price: n ? parseFloat(n[1]) : 0 };
  });
}

function addToCart(itemId) {
  const item = (_menuItems || []).find(i => i.id === itemId);
  if (!item) return;
  const opts = parsePriceOptions(item.price);
  if (opts.length > 1) {
    showSizePicker(item, opts);
  } else {
    _addItemToCart(item, opts[0]?.label || '', opts[0]?.price || item.from || 0);
  }
}

function showSizePicker(item, opts) {
  document.getElementById('sizePickerName').textContent = item.name;
  const optsEl = document.getElementById('sizePickerOpts');
  optsEl.innerHTML = opts.map((o, i) => `
    <button class="size-opt-btn" onclick="pickSize('${escHtml(item.id)}',${i})">
      <span>${escHtml(o.label || 'Regular')}</span>
      <span class="size-opt-price">₱${o.price.toFixed(0)}</span>
    </button>
  `).join('');
  document.getElementById('sizePickerOverlay').classList.add('open');
}

function pickSize(itemId, optIdx) {
  const item = (_menuItems || []).find(i => i.id === itemId);
  if (!item) return;
  const opts = parsePriceOptions(item.price);
  const opt  = opts[optIdx];
  if (opt) _addItemToCart(item, opt.label || '', opt.price);
  document.getElementById('sizePickerOverlay').classList.remove('open');
}

function closeSizePickerOnBg(e) {
  if (e.target === document.getElementById('sizePickerOverlay')) {
    document.getElementById('sizePickerOverlay').classList.remove('open');
  }
}

function _addItemToCart(item, variant, price) {
  const existing = _cart.find(c => c.itemId === item.id && c.variant === variant);
  if (existing) {
    existing.qty++;
  } else {
    _cart.push({
      id:      'ci_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      itemId:  item.id,
      name:    item.name,
      variant,
      price,
      qty: 1,
    });
  }
  _updateCartUI();
  _flashCartBtn();
}

function removeFromCart(cartId) {
  _cart = _cart.filter(c => c.id !== cartId);
  _updateCartUI();
}

function updateCartQty(cartId, delta) {
  const c = _cart.find(x => x.id === cartId);
  if (!c) return;
  c.qty = c.qty + delta;
  if (c.qty <= 0) { removeFromCart(cartId); return; }
  _updateCartUI();
}

function _flashCartBtn() {
  const btn = document.getElementById('cartBtn');
  if (!btn) return;
  btn.style.transition = 'transform 0.15s';
  btn.style.transform  = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

/* ── Cart open / close ───────────────────────────────────────────────────── */
function toggleCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeCart();
  } else {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // If cart is empty and there's an active order, auto-show tracker
    if (_cart.length === 0 && _activeOrder) {
      showTrackerView();
    }
  }
}

function closeCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  // Reset tracker view so cart items are shown next open (if no active order)
  if (!_activeOrder) {
    const tracker = document.getElementById('orderTracker');
    if (tracker) tracker.style.display = 'none';
    _updateCartUI();
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart();
    document.getElementById('sizePickerOverlay')?.classList.remove('open');
  }
});

/* ── Place order ─────────────────────────────────────────────────────────── */
async function placeOrder() {
  const name  = (document.getElementById('orderName')?.value  || '').trim();
  const phone = (document.getElementById('orderPhone')?.value || '').trim();
  if (!name)  { document.getElementById('orderName').focus();  return; }
  if (!phone) { document.getElementById('orderPhone').focus(); return; }
  if (_cart.length === 0) return;

  const btn = document.getElementById('btnPlaceOrder');
  if (btn) { btn.disabled = true; btn.textContent = 'Placing order…'; }

  const order = {
    id:            generateId(),
    customerName:  name,
    customerPhone: phone,
    orderType:     document.getElementById('orderType')?.value || 'dine-in',
    notes:         (document.getElementById('orderNotes')?.value || '').trim(),
    items:         _cart.map(c => ({
      itemId: c.itemId, name: c.name, variant: c.variant, price: c.price, qty: c.qty,
    })),
    status: 'pending',
  };

  try {
    await createOrder(order);
    _cart = [];
    document.getElementById('orderName').value  = '';
    document.getElementById('orderPhone').value = '';
    document.getElementById('orderNotes').value = '';
    _saveLastOrder(order);
    showOrderTracker(order);
  } catch (err) {
    console.error('Order error:', err);
    alert('Could not place order. Please try again.');
    if (btn) { btn.disabled = false; btn.textContent = 'Place Order 🎉'; }
  }
}

/* ── Order Tracker ───────────────────────────────────────────────────────── */
const TRACKER_STEPS = [
  { key: 'pending',   label: 'Order Placed', icon: '📋' },
  { key: 'preparing', label: 'Preparing',    icon: '👨‍🍳' },
  { key: 'ready',     label: 'Ready!',       icon: '✅' },
];

let _activeOrder    = null;
let _trackerChannel = null;

function _saveLastOrder(order) {
  try { localStorage.setItem('jacs_last_order', JSON.stringify(order)); } catch {}
}
function _loadLastOrder() {
  try {
    const s = localStorage.getItem('jacs_last_order');
    if (s) _activeOrder = JSON.parse(s);
  } catch {}
}
function _clearLastOrder() {
  _activeOrder = null;
  try { localStorage.removeItem('jacs_last_order'); } catch {}
}

function _showTrackerBtn() {
  const btn = document.getElementById('trackLastOrderBtn');
  if (btn) btn.style.display = _activeOrder ? 'inline-block' : 'none';
}

function showTrackerView() {
  if (!_activeOrder) return;
  document.getElementById('cartItems').style.display   = 'none';
  document.getElementById('cartEmpty').style.display   = 'none';
  document.getElementById('cartFooter').style.display  = 'none';
  document.getElementById('orderTracker').style.display = 'flex';
  _renderTrackerContent(_activeOrder);

  // Hide refresh button when Supabase gives real-time updates
  const refreshBtn = document.getElementById('trackerRefreshBtn');
  if (refreshBtn) refreshBtn.style.display = SUPABASE_CONFIGURED ? 'none' : 'block';
}

function showOrderTracker(order) {
  _activeOrder = { ...order };
  showTrackerView();

  // Subscribe for real-time status pushes from admin
  if (SUPABASE_CONFIGURED && supabaseClient) {
    if (_trackerChannel) supabaseClient.removeChannel(_trackerChannel);
    _trackerChannel = supabaseClient
      .channel('track-' + order.id)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'orders',
        filter: `id=eq.${order.id}`,
      }, payload => {
        if (!payload.new) return;
        _activeOrder.status = payload.new.status;
        _saveLastOrder(_activeOrder);
        _updateTrackerSteps(payload.new.status);
        if (payload.new.status === 'ready') {
          _notifyReady();
        }
      })
      .subscribe();
  }
}

function _renderTrackerContent(order) {
  const status    = order.status || 'pending';
  const name      = order.customerName || order.customer_name || '';
  const orderType = order.orderType    || order.order_type    || 'dine-in';
  const items     = Array.isArray(order.items) ? order.items : [];
  const ref       = (order.id || '').slice(-8).toUpperCase();

  const refEl = document.getElementById('trackerRef');
  if (refEl) refEl.textContent = `Ref #${ref}`;

  const metaEl = document.getElementById('trackerMeta');
  if (metaEl) metaEl.innerHTML = `
    <strong>${escHtml(name)}</strong>
    &nbsp;·&nbsp;
    <span class="tracker-type-badge">${orderType === 'takeout' ? '📦 Takeout' : '🍽 Dine In'}</span>
  `;

  _updateTrackerSteps(status);

  const listEl = document.getElementById('trackerItemsList');
  if (listEl) {
    listEl.innerHTML = items.map(i => {
      const p = parseFloat(i.price || 0);
      const q = parseInt(i.qty   || 1, 10);
      return `<div class="tracker-item-row">
        <span>${escHtml(i.name)}${i.variant ? ` <span style="color:#a8a29e;font-size:0.72rem;">(${escHtml(i.variant)})</span>` : ''} ×${q}</span>
        <span class="tracker-item-price">₱${(p * q).toFixed(0)}</span>
      </div>`;
    }).join('');
  }

  const total    = items.reduce((s, i) => s + parseFloat(i.price || 0) * parseInt(i.qty || 1, 10), 0);
  const totalEl  = document.getElementById('trackerTotal');
  if (totalEl) totalEl.textContent = '₱' + total.toFixed(0);
}

function _updateTrackerSteps(status) {
  const el = document.getElementById('trackerSteps');
  if (!el) return;

  if (status === 'cancelled') {
    el.innerHTML = `<div class="tracker-cancelled-msg">✗ Order Cancelled</div>`;
    _clearLastOrder();
    return;
  }
  if (status === 'completed') {
    el.innerHTML = `<div class="tracker-completed-msg">🎉 Order Completed — Enjoy!</div>`;
    _clearLastOrder();
    return;
  }

  const statusOrder = ['pending', 'preparing', 'ready'];
  const cur = statusOrder.indexOf(status);
  el.innerHTML = TRACKER_STEPS.map((step, i) => {
    const done   = i < cur;
    const active = i === cur;
    const cls    = done ? 'done' : active ? 'active' : '';
    return `<div class="tracker-step ${cls}">
      <div class="tracker-step-dot">${done ? '✓' : step.icon}</div>
      <div class="tracker-step-label">${step.label}</div>
    </div>`;
  }).join('');
}

function startNewOrder() {
  if (_trackerChannel && SUPABASE_CONFIGURED && supabaseClient) {
    supabaseClient.removeChannel(_trackerChannel);
    _trackerChannel = null;
  }
  _clearLastOrder();
  document.getElementById('orderTracker').style.display = 'none';
  _updateCartUI(); // shows empty cart
}

async function refreshOrderStatus() {
  if (!_activeOrder) return;
  const btn = document.getElementById('trackerRefreshBtn');
  if (btn) { btn.disabled = true; btn.textContent = '↺ Refreshing…'; }
  try {
    const orders = await getOrders();
    const latest = orders.find(o => o.id === _activeOrder.id);
    if (latest) {
      _activeOrder.status = latest.status;
      _saveLastOrder(_activeOrder);
      _updateTrackerSteps(latest.status);
    }
  } catch (err) {
    console.error('Refresh error:', err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '↺ Refresh Status'; }
  }
}

function _notifyReady() {
  const toast = document.getElementById('orderSuccessToast');
  if (!toast) return;
  toast.textContent = '🔔 Your order is READY! Please proceed to the counter.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 8000);
}

// On page load: restore last order reference so the "Track my last order" button appears
_loadLastOrder();
_showTrackerBtn();

function _updateCartUI() {
  // Don't touch UI if tracker is showing
  if (document.getElementById('orderTracker')?.style.display !== 'none') return;
  const count = _cart.reduce((s, c) => s + c.qty, 0);
  const total = _cart.reduce((s, c) => s + c.price * c.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }

  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter  = document.getElementById('cartFooter');
  const cartEmpty   = document.getElementById('cartEmpty');
  const cartTotalEl = document.getElementById('cartTotal');
  if (!cartItemsEl) return;

  if (_cart.length === 0) {
    cartEmpty.style.display  = 'flex';
    cartFooter.style.display = 'none';
    cartItemsEl.innerHTML    = '';
    _showTrackerBtn();
  } else {
    cartEmpty.style.display  = 'none';
    cartFooter.style.display = 'block';
    if (cartTotalEl) cartTotalEl.textContent = '₱' + total.toFixed(0);
    cartItemsEl.innerHTML = _cart.map(c => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">
            ${escHtml(c.name)}${c.variant ? ` <span class="cart-item-variant">— ${escHtml(c.variant)}</span>` : ''}
          </div>
          <div class="cart-item-price">₱${c.price.toFixed(0)} each</div>
        </div>
        <div class="cart-item-controls">
          <button onclick="updateCartQty('${c.id}',-1)" aria-label="Decrease">−</button>
          <span>${c.qty}</span>
          <button onclick="updateCartQty('${c.id}',1)"  aria-label="Increase">+</button>
          <button onclick="removeFromCart('${c.id}')"
            style="border-color:#fca5a5;color:#b91c1c;" aria-label="Remove">✕</button>
        </div>
      </div>
    `).join('');
  }
}

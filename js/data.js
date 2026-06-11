// ── Category & subcategory metadata ──────────────────────────────────────────
const MENU_META = {
  drinks: {
    label: 'Drinks', icon: '🧋',
    subs: ['Iced Coffee','Premium Series','Milkshake','Milk Series','Float Series','Milktea','Honey Lime','Soda'],
    icons: { 'Iced Coffee':'☕','Premium Series':'✨','Milkshake':'🥤','Milk Series':'🥛','Float Series':'🫧','Milktea':'🧋','Honey Lime':'🍋','Soda':'🫧' }
  },
  food: {
    label: 'Food', icon: '🍔',
    subs: ['Burgers','Sandwiches','Combo Meals','Pika Bites','Waffle Craze','Graham Float','Noodles & More','Nachos'],
    icons: { 'Burgers':'🍔','Sandwiches':'🌭','Combo Meals':'🍱','Pika Bites':'🍟','Waffle Craze':'🧇','Graham Float':'🍨','Noodles & More':'🍜','Nachos':'🌽' }
  },
  pizza: {
    label: 'Pizza', icon: '🍕',
    subs: ['Pizza'],
    icons: { 'Pizza':'🍕' }
  }
};

// ── Default menu items ────────────────────────────────────────────────────────
const DEFAULT_ITEMS = [
  // ── ICED COFFEE ──────────────────────────────────────────────────
  { id:'d01', name:'Americano',            category:'drinks', sub:'Iced Coffee',    price:'12oz ₱29 · 16oz ₱35 · 22oz ₱49',   from:29,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d02', name:'Coffee Latte',         category:'drinks', sub:'Iced Coffee',    price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59',   from:39,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d03', name:'Spanish Latte',        category:'drinks', sub:'Iced Coffee',    price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69',   from:49,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d04', name:'French Vanilla Latte', category:'drinks', sub:'Iced Coffee',    price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69',   from:49,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d05', name:'Hazelnut Latte',       category:'drinks', sub:'Iced Coffee',    price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69',   from:49,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d06', name:'Dirty Matcha Latte',   category:'drinks', sub:'Iced Coffee',    price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79',   from:59,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d07', name:'Caramel Macchiato',    category:'drinks', sub:'Iced Coffee',    price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79',   from:59,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d08', name:'Biscoff Latte',        category:'drinks', sub:'Iced Coffee',    price:'12oz ₱99 · 16oz ₱105 · 22oz ₱129', from:99,  available:true, featured:true,  desc:'', imageUrl:'' },
  // ── PREMIUM SERIES ───────────────────────────────────────────────
  { id:'d09', name:'BlackPink Oreo',       category:'drinks', sub:'Premium Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69',   from:49,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d10', name:'Cocoa Oreo',           category:'drinks', sub:'Premium Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69',   from:49,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d11', name:'BlackPink Forest',     category:'drinks', sub:'Premium Series', price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79',   from:59,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d12', name:'Pink Matcha',          category:'drinks', sub:'Premium Series', price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79',   from:59,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d13', name:'Matcha Oreo',          category:'drinks', sub:'Premium Series', price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79',   from:59,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d14', name:'Double Cocoa Caramel', category:'drinks', sub:'Premium Series', price:'12oz ₱69 · 16oz ₱75 · 22oz ₱89',   from:69,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d15', name:'Biscoff Oreo',         category:'drinks', sub:'Premium Series', price:'12oz ₱99 · 16oz ₱105 · 22oz ₱129', from:99,  available:true, featured:true,  desc:'', imageUrl:'' },
  // ── MILKSHAKE ────────────────────────────────────────────────────
  { id:'d16', name:'Green Apple Milkshake',    category:'drinks', sub:'Milkshake', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d17', name:'Strawberry Milkshake',     category:'drinks', sub:'Milkshake', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d18', name:'Blueberry Milkshake',      category:'drinks', sub:'Milkshake', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d19', name:'Mango Milkshake',          category:'drinks', sub:'Milkshake', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d20', name:'Cookies & Cream Milkshake',category:'drinks', sub:'Milkshake', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d21', name:'Chocolate Milkshake',      category:'drinks', sub:'Milkshake', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d22', name:'Avocado Milkshake',        category:'drinks', sub:'Milkshake', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d23', name:'Melon Milkshake',          category:'drinks', sub:'Milkshake', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  // ── MILK SERIES ──────────────────────────────────────────────────
  { id:'d24', name:'Strawberry Milk',  category:'drinks', sub:'Milk Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d25', name:'Green Apple Milk', category:'drinks', sub:'Milk Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d26', name:'Blueberry Milk',   category:'drinks', sub:'Milk Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d27', name:'Mango Milk',       category:'drinks', sub:'Milk Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d28', name:'Oreo Milk',        category:'drinks', sub:'Milk Series', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d29', name:'Chocolate Latte',  category:'drinks', sub:'Milk Series', price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79', from:59, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d30', name:'Matcha Latte',     category:'drinks', sub:'Milk Series', price:'12oz ₱59 · 16oz ₱65 · 22oz ₱79', from:59, available:true, featured:false, desc:'', imageUrl:'' },
  // ── FLOAT SERIES ─────────────────────────────────────────────────
  { id:'d31', name:'Chuckie Float', category:'drinks', sub:'Float Series', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'Add ons: Whip cream +₱10, Nata +₱10, Pearl +₱10', imageUrl:'' },
  { id:'d32', name:'Coke Float',    category:'drinks', sub:'Float Series', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'Add ons: Whip cream +₱10, Nata +₱10, Pearl +₱10', imageUrl:'' },
  // ── MILKTEA ──────────────────────────────────────────────────────
  { id:'d33', name:'Taro Milk Tea',            category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d34', name:'Okinawa Milk Tea',         category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d35', name:'Matcha Milk Tea',          category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d36', name:'Wintermelon Milk Tea',     category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d37', name:'Cookies & Cream Milk Tea', category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d38', name:'Red Velvet Milk Tea',      category:'drinks', sub:'Milktea', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  // ── HONEY LIME ───────────────────────────────────────────────────
  { id:'d39', name:'Strawberry Honey Lime',  category:'drinks', sub:'Honey Lime', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d40', name:'Green Apple Honey Lime', category:'drinks', sub:'Honey Lime', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d41', name:'Lychee Honey Lime',      category:'drinks', sub:'Honey Lime', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d42', name:'Blueberry Honey Lime',   category:'drinks', sub:'Honey Lime', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d43', name:'Mango Honey Lime',       category:'drinks', sub:'Honey Lime', price:'12oz ₱49 · 16oz ₱55 · 22oz ₱69', from:49, available:true, featured:false, desc:'', imageUrl:'' },
  // ── SODA ─────────────────────────────────────────────────────────
  { id:'d44', name:'Strawberry Soda',  category:'drinks', sub:'Soda', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d45', name:'Green Apple Soda', category:'drinks', sub:'Soda', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d46', name:'Mango Soda',       category:'drinks', sub:'Soda', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d47', name:'Blueberry Soda',   category:'drinks', sub:'Soda', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'d48', name:'Lychee Soda',      category:'drinks', sub:'Soda', price:'12oz ₱39 · 16oz ₱45 · 22oz ₱59', from:39, available:true, featured:false, desc:'', imageUrl:'' },

  // ── BURGERS ──────────────────────────────────────────────────────
  { id:'f01', name:"JAC's Regular Burger",   category:'food', sub:'Burgers', price:'Solo ₱28 · Buy1Take1 ₱49',   from:28,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f02', name:"JAC's Cheesy Burger",    category:'food', sub:'Burgers', price:'Solo ₱38 · Buy1Take1 ₱69',   from:38,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f03', name:"JAC's Ham & Egg Burger", category:'food', sub:'Burgers', price:'Solo ₱50 · Buy1Take1 ₱92',   from:50,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f04', name:"JAC's Deluxe Burger",    category:'food', sub:'Burgers', price:'Solo ₱90 · Buy1Take1 ₱172',  from:90,  available:true, featured:true,  desc:'', imageUrl:'' },
  // ── SANDWICHES ───────────────────────────────────────────────────
  { id:'f05', name:'Regular Hotdog Sandwich', category:'food', sub:'Sandwiches', price:'Solo ₱35 · Buy1Take1 ₱59',  from:35,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f06', name:'Cheesy Hotdog Sandwich',  category:'food', sub:'Sandwiches', price:'Solo ₱45 · Buy1Take1 ₱79',  from:45,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f07', name:'Hungarian Sandwich',      category:'food', sub:'Sandwiches', price:'Solo ₱87 · Buy1Take1 ₱174', from:87,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f08', name:'Clubhouse Sandwich',      category:'food', sub:'Sandwiches', price:'Whole ₱95',                 from:95,  available:true, featured:false, desc:'', imageUrl:'' },
  // ── COMBO MEALS ──────────────────────────────────────────────────
  { id:'f09', name:'J1 Combo', category:'food', sub:'Combo Meals', price:'₱85',  from:85,  available:true, featured:false, desc:'Regular Burger, fries & soda drink', imageUrl:'' },
  { id:'f10', name:'J2 Combo', category:'food', sub:'Combo Meals', price:'₱95',  from:95,  available:true, featured:false, desc:'Hotdog sandwich, fries & soda drink', imageUrl:'' },
  { id:'f11', name:'J3 Combo', category:'food', sub:'Combo Meals', price:'₱130', from:130, available:true, featured:false, desc:'Clubhouse sandwich & soda drink', imageUrl:'' },
  { id:'f12', name:'J5 Combo', category:'food', sub:'Combo Meals', price:'₱99',  from:99,  available:true, featured:false, desc:'Hotdog, Lumpia, Fries, Kikiam, Squidballs & Fishballs', imageUrl:'' },
  // ── PIKA BITES ───────────────────────────────────────────────────
  { id:'f13', name:'Lumpia',               category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f14', name:'Fries',                category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f15', name:'Cheesy Fries Overload',category:'food', sub:'Pika Bites', price:'₱120',                    from:120, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f16', name:'Siomai',               category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f17', name:'Onion Rings',          category:'food', sub:'Pika Bites', price:'Regular ₱30 · Medium ₱45', from:30,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f18', name:'Kikiam',               category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f19', name:'SquidBalls',           category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f20', name:'FishBalls',            category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f21', name:'Tufo Squares',         category:'food', sub:'Pika Bites', price:'Regular ₱25 · Medium ₱40', from:25,  available:true, featured:false, desc:'', imageUrl:'' },
  // ── WAFFLE CRAZE ─────────────────────────────────────────────────
  { id:'f22', name:'Caramel Dream',     category:'food', sub:'Waffle Craze', price:'₱40', from:40, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f23', name:'Choco Chic',        category:'food', sub:'Waffle Craze', price:'₱40', from:40, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f24', name:'Cookie Crush',      category:'food', sub:'Waffle Craze', price:'₱45', from:45, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f25', name:'Almond Almour',     category:'food', sub:'Waffle Craze', price:'₱50', from:50, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f26', name:'Strawberry Waffle', category:'food', sub:'Waffle Craze', price:'₱45', from:45, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f27', name:'Mango Waffle',      category:'food', sub:'Waffle Craze', price:'₱45', from:45, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f28', name:'Blueberry Waffle',  category:'food', sub:'Waffle Craze', price:'₱45', from:45, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f29', name:'Biscoff Delight',   category:'food', sub:'Waffle Craze', price:'₱50', from:50, available:true, featured:true,  desc:'', imageUrl:'' },
  // ── GRAHAM FLOAT ─────────────────────────────────────────────────
  { id:'f30', name:'Oreo Graham Float',   category:'food', sub:'Graham Float', price:'₱60', from:60, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f31', name:'Biscoff Graham Float',category:'food', sub:'Graham Float', price:'₱70', from:70, available:true, featured:true,  desc:'', imageUrl:'' },
  { id:'f32', name:'Mango Graham Float',  category:'food', sub:'Graham Float', price:'₱50', from:50, available:true, featured:false, desc:'', imageUrl:'' },
  // ── NOODLES ──────────────────────────────────────────────────────
  { id:'f33', name:'Samyang',       category:'food', sub:'Noodles & More', price:'₱99', from:99, available:true, featured:false, desc:'Add ons: Egg +₱15, Cheese +₱10', imageUrl:'' },
  { id:'f34', name:'Ramen',         category:'food', sub:'Noodles & More', price:'₱99', from:99, available:true, featured:false, desc:'Add ons: Egg +₱15, Cheese +₱10', imageUrl:'' },
  { id:'f35', name:'Pancit Canton', category:'food', sub:'Noodles & More', price:'₱25', from:25, available:true, featured:false, desc:'', imageUrl:'' },
  // ── NACHOS ───────────────────────────────────────────────────────
  { id:'f36', name:'Regular Nachos',         category:'food', sub:'Nachos', price:'₱110', from:110, available:true, featured:false, desc:'', imageUrl:'' },
  { id:'f37', name:'Chessy Overload Nachos', category:'food', sub:'Nachos', price:'₱120', from:120, available:true, featured:false, desc:'', imageUrl:'' },

  // ── PIZZA ─────────────────────────────────────────────────────────
  { id:'p01', name:'Ham & Cheese Pizza',   category:'pizza', sub:'Pizza', price:'₱150', from:150, available:true, featured:false, desc:'Classic ham and cheese, freshly baked homemade style', imageUrl:'' },
  { id:'p02', name:'Hawaiian Pizza',       category:'pizza', sub:'Pizza', price:'₱160', from:160, available:true, featured:false, desc:'Ham, pineapple, and loads of melted cheese',          imageUrl:'' },
  { id:'p03', name:'Beef & Veggies Pizza', category:'pizza', sub:'Pizza', price:'₱175', from:175, available:true, featured:true,  desc:'Seasoned beef with fresh garden vegetables',          imageUrl:'' },
  { id:'p04', name:'Supreme Pizza',        category:'pizza', sub:'Pizza', price:'₱175', from:175, available:true, featured:false, desc:'Loaded with all your favorite toppings',              imageUrl:'' },
  { id:'p05', name:'4 Flavors Pizza',      category:'pizza', sub:'Pizza', price:'₱180', from:180, available:true, featured:true,  desc:'Four different flavors in one amazing pizza',         imageUrl:'' },
];

// ── Row ↔ Item mapping ────────────────────────────────────────────────────────
function rowToItem(r) {
  return {
    id:        r.id,
    name:      r.name,
    category:  r.category,
    sub:       r.sub,
    price:     r.price,
    from:      r.from_price,
    available: r.available,
    featured:  r.featured,
    desc:      r.description,
    imageUrl:  r.image_url,
  };
}

function itemToRow(i) {
  return {
    id:          i.id,
    name:        i.name,
    category:    i.category,
    sub:         i.sub,
    price:       i.price,
    from_price:  i.from  || 0,
    available:   i.available,
    featured:    i.featured,
    description: i.desc  || '',
    image_url:   i.imageUrl || '',
  };
}

// ── Menu CRUD (Supabase) ──────────────────────────────────────────────────────
async function getMenuData() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return DEFAULT_ITEMS;
  try {
    const { data, error } = await supabaseClient
      .from('menu_items')
      .select('*')
      .order('category')
      .order('from_price', { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) {
      await _seedDefaultItems();
      return DEFAULT_ITEMS;
    }
    return data.map(rowToItem);
  } catch (err) {
    console.error('Supabase getMenuData error:', err);
    return DEFAULT_ITEMS;
  }
}

async function _seedDefaultItems() {
  try {
    await supabaseClient
      .from('menu_items')
      .insert(DEFAULT_ITEMS.map(itemToRow));
  } catch (err) {
    console.error('Seed error:', err);
  }
}

async function addMenuItem(item) {
  const { error } = await supabaseClient
    .from('menu_items')
    .insert(itemToRow(item));
  if (error) throw error;
}

async function updateMenuItem(item) {
  const { error } = await supabaseClient
    .from('menu_items')
    .update(itemToRow(item))
    .eq('id', item.id);
  if (error) throw error;
}

async function deleteMenuItem(id) {
  const { error } = await supabaseClient
    .from('menu_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function toggleMenuItemAvailability(id, available) {
  const { error } = await supabaseClient
    .from('menu_items')
    .update({ available })
    .eq('id', id);
  if (error) throw error;
}

async function resetMenuData() {
  await supabaseClient.from('menu_items').delete().neq('id', '___');
  await _seedDefaultItems();
}

// ── Image upload (Supabase Storage) ──────────────────────────────────────────
async function uploadProductImage(file, itemId) {
  const ext  = file.name.split('.').pop().toLowerCase();
  const path = `${itemId}.${ext}`;
  const { error } = await supabaseClient.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabaseClient.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}

// ── Delivery fee ──────────────────────────────────────────────────────────────
async function getDeliveryFee() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return 50;
  try {
    const { data, error } = await supabaseClient
      .from('admin_config').select('value').eq('key', 'delivery_fee').single();
    if (error || !data) return 50;
    return parseFloat(data.value) || 50;
  } catch { return 50; }
}

async function setDeliveryFee(fee) {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return;
  const { error } = await supabaseClient
    .from('admin_config')
    .upsert({ key: 'delivery_fee', value: String(fee) }, { onConflict: 'key' });
  if (error) throw error;
}

// ── Announcement ─────────────────────────────────────────────────────────────
async function getAnnouncement() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('admin_config').select('value').eq('key', 'announcement').single();
    if (error || !data) return null;
    return JSON.parse(data.value);
  } catch { return null; }
}

async function setAnnouncement(text, active) {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return;
  const { error } = await supabaseClient
    .from('admin_config')
    .upsert({ key: 'announcement', value: JSON.stringify({ text, active }) }, { onConflict: 'key' });
  if (error) throw error;
}

// ── Password helpers (Supabase-backed, SHA-256 hashed) ───────────────────────
// Default hash = SHA-256('jacs2024'). Run admin-config-setup.sql once in Supabase.
const DEFAULT_PASS_HASH = 'be1a0c80d5cefe9b9ae6086bcf8ede8c7efaed1637065cf1091332460d49ada9';

async function _sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function _getStoredHash() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return DEFAULT_PASS_HASH;
  try {
    const { data, error } = await supabaseClient
      .from('admin_config').select('value').eq('key', 'password_hash').single();
    if (error || !data) return DEFAULT_PASS_HASH;
    return data.value;
  } catch { return DEFAULT_PASS_HASH; }
}

async function checkAdminPass(plain) {
  const hash   = await _sha256(plain);
  const stored = await _getStoredHash();
  return hash === stored;
}

async function setAdminPass(plain) {
  const hash = await _sha256(plain);
  if (!SUPABASE_CONFIGURED || !supabaseClient) return;
  const { error } = await supabaseClient
    .from('admin_config')
    .upsert({ key: 'password_hash', value: hash }, { onConflict: 'key' });
  if (error) throw error;
}

function generateId() {
  return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

// ── Shop Gallery ──────────────────────────────────────────────────────────────
const GALLERY_LS_KEY = 'jacs_gallery';

async function getShopPhotos() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) {
    try { return JSON.parse(localStorage.getItem(GALLERY_LS_KEY) || '[]'); } catch { return []; }
  }
  try {
    const { data, error } = await supabaseClient
      .from('shop_photos').select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []).map(r => ({ id: r.id, caption: r.caption, imageUrl: r.image_url }));
  } catch (err) {
    console.error('getShopPhotos:', err);
    return [];
  }
}

async function addShopPhotoRecord(photo) {
  if (!SUPABASE_CONFIGURED || !supabaseClient) {
    const photos = await getShopPhotos();
    photos.push(photo);
    localStorage.setItem(GALLERY_LS_KEY, JSON.stringify(photos));
    return;
  }
  const { error } = await supabaseClient.from('shop_photos').insert({
    id: photo.id, caption: photo.caption || '', image_url: photo.imageUrl, sort_order: 0,
  });
  if (error) throw error;
}

async function deleteShopPhoto(id) {
  if (!SUPABASE_CONFIGURED || !supabaseClient) {
    const photos = await getShopPhotos();
    localStorage.setItem(GALLERY_LS_KEY, JSON.stringify(photos.filter(p => p.id !== id)));
    return;
  }
  const { error } = await supabaseClient.from('shop_photos').delete().eq('id', id);
  if (error) throw error;
}

async function uploadShopPhoto(file, photoId) {
  const ext  = file.name.split('.').pop().toLowerCase();
  const path = `gallery_${photoId}.${ext}`;
  const { error } = await supabaseClient.storage
    .from(SHOP_PHOTOS_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabaseClient.storage.from(SHOP_PHOTOS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ── Orders ────────────────────────────────────────────────────────────────────
const ORDERS_LS_KEY = 'jacs_orders';

async function createOrder(order) {
  const record = {
    id:               order.id,
    customer_name:    order.customerName,
    customer_phone:   order.customerPhone,
    order_type:       order.orderType,
    notes:            order.notes || '',
    items:            order.items,
    status:           'pending',
    delivery_address: order.deliveryAddress || '',
    delivery_fee:     order.deliveryFee     || 0,
    created_at:       new Date().toISOString(),
    updated_at:       new Date().toISOString(),
  };
  if (!SUPABASE_CONFIGURED || !supabaseClient) {
    const orders = _getLocalOrders();
    orders.unshift(record);
    localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));
    return;
  }
  const { error } = await supabaseClient.from('orders').insert(record);
  if (error) throw error;
}

async function getOrders() {
  if (!SUPABASE_CONFIGURED || !supabaseClient) return _getLocalOrders();
  try {
    const { data, error } = await supabaseClient
      .from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('getOrders:', err);
    return [];
  }
}

async function updateOrderStatus(id, status) {
  if (!SUPABASE_CONFIGURED || !supabaseClient) {
    const orders = _getLocalOrders();
    const o = orders.find(x => x.id === id);
    if (o) { o.status = status; o.updated_at = new Date().toISOString(); }
    localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));
    return;
  }
  const { error } = await supabaseClient.from('orders')
    .update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) throw error;
}

function _getLocalOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_LS_KEY) || '[]'); } catch { return []; }
}

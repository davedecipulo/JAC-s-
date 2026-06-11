-- ══════════════════════════════════════════════════════════════
-- JAC's Snack Haven — Supabase Setup
-- Run this entire file in your Supabase SQL Editor
-- (Project Dashboard → SQL Editor → New Query → Paste → Run)
-- ══════════════════════════════════════════════════════════════

-- 1. Create the menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  sub         TEXT NOT NULL,
  price       TEXT NOT NULL,
  from_price  NUMERIC DEFAULT 0,
  available   BOOLEAN DEFAULT TRUE,
  featured    BOOLEAN DEFAULT FALSE,
  description TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read (home page can display menu)
DROP POLICY IF EXISTS "Allow public read" ON public.menu_items;
CREATE POLICY "Allow public read" ON public.menu_items
  FOR SELECT USING (TRUE);

-- 4. Allow all operations via anon key
--    (admin uses client-side password protection)
DROP POLICY IF EXISTS "Allow all write operations" ON public.menu_items;
CREATE POLICY "Allow all write operations" ON public.menu_items
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- 5. Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category  ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(available);

-- ══════════════════════════════════════════════════════════════
-- 6. Shop photos table
CREATE TABLE IF NOT EXISTS public.shop_photos (
  id          TEXT PRIMARY KEY,
  caption     TEXT DEFAULT '',
  image_url   TEXT NOT NULL DEFAULT '',
  sort_order  INT  DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.shop_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read photos" ON public.shop_photos;
CREATE POLICY "Allow public read photos"  ON public.shop_photos FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Allow all write photos" ON public.shop_photos;
CREATE POLICY "Allow all write photos"    ON public.shop_photos FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- 7. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id             TEXT PRIMARY KEY,
  customer_name  TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  order_type     TEXT NOT NULL DEFAULT 'dine-in',
  notes          TEXT DEFAULT '',
  items          JSONB NOT NULL DEFAULT '[]'::jsonb,
  status         TEXT NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public create orders" ON public.orders;
CREATE POLICY "Allow public create orders" ON public.orders FOR INSERT WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Allow public read orders" ON public.orders;
CREATE POLICY "Allow public read orders"   ON public.orders FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Allow update orders" ON public.orders;
CREATE POLICY "Allow update orders"        ON public.orders FOR UPDATE USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Allow delete orders" ON public.orders;
CREATE POLICY "Allow delete orders"        ON public.orders FOR DELETE USING (TRUE);

CREATE INDEX IF NOT EXISTS idx_orders_status     ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ══════════════════════════════════════════════════════════════
-- 8. Admin config table (stores hashed admin password)
CREATE TABLE IF NOT EXISTS public.admin_config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;
-- Anyone can read (needed to verify login client-side)
DROP POLICY IF EXISTS "Allow read admin_config" ON public.admin_config;
CREATE POLICY "Allow read admin_config"   ON public.admin_config FOR SELECT USING (TRUE);
-- Allow update so the admin can change their password
DROP POLICY IF EXISTS "Allow update admin_config" ON public.admin_config;
CREATE POLICY "Allow update admin_config" ON public.admin_config FOR UPDATE USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Allow insert admin_config" ON public.admin_config;
CREATE POLICY "Allow insert admin_config" ON public.admin_config FOR INSERT WITH CHECK (TRUE);

-- Insert default password hash (SHA-256 of 'jacs2024')
-- Change this immediately after first login via the Settings → Change Password panel
INSERT INTO public.admin_config (key, value)
VALUES ('password_hash', 'be1a0c80d5cefe9b9ae6086bcf8ede8c7efaed1637065cf1091332460d49ada9')
ON CONFLICT (key) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- STORAGE SETUP (do this in the Supabase Dashboard UI):
-- 1. Go to Storage in your project sidebar
-- 2. Click "New bucket"
-- 3. Name it: product-images   → Check "Public bucket" → Save
-- 4. Name it: shop-photos      → Check "Public bucket" → Save
-- 5. In each bucket Policies, add a policy to allow all operations
--    for the anon role (INSERT, SELECT, UPDATE, DELETE)
-- ══════════════════════════════════════════════════════════════

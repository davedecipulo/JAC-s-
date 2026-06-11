-- ══════════════════════════════════════════════════════════════
-- JAC's Snack Haven — Supabase Setup  (safe to re-run)
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ══════════════════════════════════════════════════════════════

-- ── 1. menu_items ─────────────────────────────────────────────
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

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read"        ON public.menu_items;
DROP POLICY IF EXISTS "Allow all write operations" ON public.menu_items;
CREATE POLICY "Allow public read"          ON public.menu_items FOR SELECT USING (TRUE);
CREATE POLICY "Allow all write operations" ON public.menu_items FOR ALL    USING (TRUE) WITH CHECK (TRUE);

CREATE INDEX IF NOT EXISTS idx_menu_items_category  ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(available);

ALTER TABLE public.menu_items REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'menu_items'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.menu_items;
  END IF;
END $$;

-- ── 2. shop_photos ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.shop_photos (
  id          TEXT PRIMARY KEY,
  caption     TEXT DEFAULT '',
  image_url   TEXT NOT NULL DEFAULT '',
  sort_order  INT  DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.shop_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read photos" ON public.shop_photos;
DROP POLICY IF EXISTS "Allow all write photos"   ON public.shop_photos;
CREATE POLICY "Allow public read photos" ON public.shop_photos FOR SELECT USING (TRUE);
CREATE POLICY "Allow all write photos"   ON public.shop_photos FOR ALL    USING (TRUE) WITH CHECK (TRUE);

ALTER TABLE public.shop_photos REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'shop_photos'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.shop_photos;
  END IF;
END $$;

-- ── 3. orders ─────────────────────────────────────────────────
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
DROP POLICY IF EXISTS "Allow public read orders"   ON public.orders;
DROP POLICY IF EXISTS "Allow update orders"        ON public.orders;
DROP POLICY IF EXISTS "Allow delete orders"        ON public.orders;
CREATE POLICY "Allow public create orders" ON public.orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Allow public read orders"   ON public.orders FOR SELECT USING (TRUE);
CREATE POLICY "Allow update orders"        ON public.orders FOR UPDATE USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow delete orders"        ON public.orders FOR DELETE USING (TRUE);

CREATE INDEX IF NOT EXISTS idx_orders_status     ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

ALTER TABLE public.orders REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;

-- ── Delivery columns (safe to run on existing DB) ─────────────
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_address TEXT DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_fee     NUMERIC DEFAULT 0;

-- ── 4. admin_config ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read admin_config"   ON public.admin_config;
DROP POLICY IF EXISTS "Allow update admin_config" ON public.admin_config;
DROP POLICY IF EXISTS "Allow insert admin_config" ON public.admin_config;
CREATE POLICY "Allow read admin_config"   ON public.admin_config FOR SELECT USING (TRUE);
CREATE POLICY "Allow update admin_config" ON public.admin_config FOR UPDATE USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow insert admin_config" ON public.admin_config FOR INSERT WITH CHECK (TRUE);

ALTER TABLE public.admin_config REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'admin_config'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_config;
  END IF;
END $$;

-- Default password hash (SHA-256 of 'jacs2024')
INSERT INTO public.admin_config (key, value)
VALUES ('password_hash', 'be1a0c80d5cefe9b9ae6086bcf8ede8c7efaed1637065cf1091332460d49ada9')
ON CONFLICT (key) DO NOTHING;

-- Default delivery fee (₱50)
INSERT INTO public.admin_config (key, value)
VALUES ('delivery_fee', '50')
ON CONFLICT (key) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- STORAGE POLICIES
-- Make sure these buckets exist first:
--   Storage → New bucket → "product-images" → Public ✓
--   Storage → New bucket → "shop-photos"    → Public ✓
-- ══════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Allow anon all on product-images"  ON storage.objects;
DROP POLICY IF EXISTS "Allow public read product-images"  ON storage.objects;
CREATE POLICY "Allow anon all on product-images"
  ON storage.objects FOR ALL TO anon
  USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow public read product-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow anon all on shop-photos"  ON storage.objects;
DROP POLICY IF EXISTS "Allow public read shop-photos"  ON storage.objects;
CREATE POLICY "Allow anon all on shop-photos"
  ON storage.objects FOR ALL TO anon
  USING (bucket_id = 'shop-photos') WITH CHECK (bucket_id = 'shop-photos');
CREATE POLICY "Allow public read shop-photos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'shop-photos');

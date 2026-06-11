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
CREATE POLICY "Allow public read" ON public.menu_items
  FOR SELECT USING (TRUE);

-- 4. Allow all operations via anon key
--    (admin uses client-side password protection)
CREATE POLICY "Allow all write operations" ON public.menu_items
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- 5. Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category  ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(available);

-- ══════════════════════════════════════════════════════════════
-- STORAGE SETUP (do this in the Supabase Dashboard UI):
-- 1. Go to Storage in your project sidebar
-- 2. Click "New bucket"
-- 3. Name it: product-images
-- 4. Check "Public bucket" → Save
-- 5. In the bucket Policies, add a policy to allow all operations
--    for the anon role (INSERT, SELECT, UPDATE, DELETE)
-- ══════════════════════════════════════════════════════════════

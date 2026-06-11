// ── Supabase Configuration ────────────────────────────────────────────────────
// 1. Sign up at https://supabase.com and create a new project
// 2. Go to your project → Settings → API
// 3. Paste your Project URL and anon/public key below
// 4. Run supabase-setup.sql in your project's SQL Editor
// 5. Go to Storage → create a public bucket named: product-images

const SUPABASE_URL      = 'https://nlyxewweieqxlqzwmlnf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jYfgW5qlMKAMUXJOD_GauQ_pmQMBbP0';
const IMAGE_BUCKET        = 'product-images';
const SHOP_PHOTOS_BUCKET  = 'shop-photos';

const SUPABASE_CONFIGURED = !SUPABASE_URL.startsWith('YOUR_');

const supabaseClient = SUPABASE_CONFIGURED
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

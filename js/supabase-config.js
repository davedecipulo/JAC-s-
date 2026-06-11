// ── Supabase Configuration ────────────────────────────────────────────────────
// 1. Sign up at https://supabase.com and create a new project
// 2. Go to your project → Settings → API
// 3. Paste your Project URL and anon/public key below
// 4. Run supabase-setup.sql in your project's SQL Editor
// 5. Go to Storage → create a public bucket named: product-images

const SUPABASE_URL      = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const IMAGE_BUCKET      = 'product-images';

const SUPABASE_CONFIGURED = !SUPABASE_URL.startsWith('YOUR_');

const supabaseClient = SUPABASE_CONFIGURED
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

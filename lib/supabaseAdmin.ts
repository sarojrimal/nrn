import { createClient } from "@supabase/supabase-js";

// Server-side only. Never import this file in client components.
// Uses the service role key, which bypasses Row Level Security —
// that's fine here because it's only ever called from API routes.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    auth: { persistSession: false },
  }
);

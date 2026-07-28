# NRNA Youth UK

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.local.example` to `.env.local` and fill in your Supabase values
   (Project Settings → API in Supabase gives you the URL and both keys):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

3. In your Supabase project, run `sql/001_registrations.sql` in the SQL Editor.
   This creates the `registrations` table and the private `payment-screenshots`
   storage bucket.

4. Add the tournament poster image at `public/nrna-cup-poster.jpg`
   (the file you uploaded earlier — `1000046982.jpg` — rename it to match, or
   update the `src` in `pages/index.tsx`).

5. Run locally:
   ```
   npm run dev
   ```

## Deploying

Push this whole project to `sarojrimal/nrn` on GitHub (replacing the old static
`index.html` / `register.html` files), then re-import or redeploy in Vercel —
it will auto-detect Next.js. Add the three env vars above under Vercel's
Project Settings → Environment Variables before deploying.

## Viewing registrations

For now, registrations land in the `registrations` table in Supabase and
screenshots in the `payment-screenshots` storage bucket — you can view both
directly in the Supabase dashboard (Table Editor / Storage). An admin page in
the app to browse these is a natural next step once this is live.

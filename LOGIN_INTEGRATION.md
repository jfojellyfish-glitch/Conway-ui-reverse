# Conway Landing Page / Login Integration

This branch introduces a native `/login` page using the existing Zen Trading brand palette and wordmark. The header's Log In link is now internal. Homepage content, subscription checkout, and Strategy Monitor are unchanged.

## Auth deployment requirements
1. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL` in Render for this branch. Use the SAME Supabase project as the existing GSA login.
2. In Supabase Auth > URL Configuration, allow the deployment origin and `/auth/callback` (including preview origin) as redirect URLs; verify Google is enabled.
3. Verify the `public.profiles` row-level security for each authenticated user, and its `is_active`/`active_until` values. Subscription checks **fail closed** if unavailable.
4. Currently the dashboard destination remains `https://zentradings.com/dashboards/energy`. This repository does NOT contain that page. On a different origin, auth cookies do not transfer automatically. Before replacing production, decide whether to migrate dashboards, proxy the old route, or establish a shared-domain/session handoff. Do not mistake successful sign-in for working cross-service SSO.
5. Test a paid account, an inactive account, Google OAuth, email sign-up and sign-out on the Render preview before merging or changing DNS.

No secret or service_role key is included in the code.

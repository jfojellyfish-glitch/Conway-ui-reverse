# Zen Trading — Conway-first GSA merge (V3)

Conway UI is the layout and new-content baseline. Zen Trading's original brand mark/wordmark, favicon and research journal are retained.

Local: `npm ci && npm run dev` (Node.js 22+). Typecheck: `npm run typecheck`. Production: `npm run build && npm run start`.

Read [MERGE_NOTES.md](MERGE_NOTES.md) before releasing.


**V12 Newsletter:** click the Newsletter card to choose Standard or Pro; plan checkout buttons are intentionally disabled pending link verification. See CHANGELOG_V12.md.

**V13 payment safety:** no direct checkout for Coding Agent; Newsletter Standard/Pro chooser is available, but payment remains disabled pending verification. See CHANGELOG_V13.md.


V14: Standard newsletter is linked to Yvette’s shared Newsletter Payment Link; Pro checkout is disabled pending its own URL. See CHANGELOG_V14.md.

V16: Coding Agent Subscribe opens Yvette’s shared Stripe link; checkout product/price requires verification before live release. See CHANGELOG_V16.md.

## V17 Newsletter update
The Newsletter is now a single $9.99/month card with direct Subscribe link (no tier selector). See `CHANGELOG_V17.md` for details. Check actual Stripe checkout price before deployment.

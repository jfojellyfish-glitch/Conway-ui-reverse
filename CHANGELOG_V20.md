# V20 – Original Conway Pipeline entrance animation restored

- Replaced `src/components/pipeline-flow.tsx` byte-for-byte with `Conway-ui-reverse-main(1).zip` original component.
- Removed V19 continuous step highlighting, timer, active-state connector styling and glow keyframes from `src/app/globals.css`.
- Restored the standalone HTML preview to the original Conway reveal behavior: IntersectionObserver threshold 0.2, each card transitions opacity 0→1 and moves 10px→0 over 450ms with a 90ms per-card stagger; animation plays once.
- Other sections, mobile strip, brand assets, prices and Stripe links unchanged.
- No change to Stripe configuration and no production deployment.

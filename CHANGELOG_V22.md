# V22 A — Our Systems + Pipeline motion

- **Our Systems:** The original four-stage loop remains clickable and advances every six seconds while visible; the ring now includes a quiet flowing trace, an orbit marker that travels between stages, and a thin progress rule in the selected stage card. Hover/focus pauses automatic cycling.
- **Pipeline:** Retains all eight original cards, text, decision gates and connectors. The original staggered scroll reveal now transitions into a gentle eight-step highlight with connected arrows. The animation pauses out of view.
- **Accessibility:** Respects `prefers-reduced-motion: reduce` and avoids horizontal overflow on narrow screens.
- No changes to pricing, Stripe links, logo, navigation, or other page sections.

## Validation

- TypeScript: `tsc --noEmit` passed in a local environment with compatible Next.js 16 / React 19 dependencies.
- Standalone HTML desktop/mobile: stage buttons, pipeline progression, reduced-motion support and overflow checks passed.
- Local Next.js build could not complete because the local container lacks the platform SWC binary; use the Render production build as the release gate.

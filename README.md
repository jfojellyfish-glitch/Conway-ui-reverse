# Neutral frontend reconstruction

Standalone **Next.js, React, and Tailwind CSS** reconstruction. Original implementation; neutral `Example` branding and replacement copy. No copied application source, licensed fonts, proprietary images, or backend.

## Preview

Node.js 22 recommended.

```sh
cd conway-ui-rebuild
npm install
npm run dev
```

Open **http://localhost:3000**.

Production preview:

```sh
npm run build
npm start
```

## Pages and behavior

- `/` — original single-viewport header / two-column hero / stacked animated graphics / compact footer hierarchy. At smaller widths, the hero stacks and graphics consume the remaining viewport height.
- Full-screen mobile menu with the original four navigation items and bottom credits.
- `/careers` — seven cards, original category order, functional filters, and expanded footer.
- `/careers/[slug]` — role detail template and application form, with local validation and file selection. Submission only displays a local demo confirmation; nothing is uploaded.
- `/terms`, `/privacy` — original section order, paragraph/list hierarchy, sticky desktop contents rail, smooth contents scrolling, and mobile document layout. Text is explicitly non-binding placeholder content.

Company-owned external links are replaced with **example.com** destinations. Contact links use **team@example.com**. These are intentional placeholders, not authentication or real contact services. The certification slot contains a dimension-matched **DEMO** label rather than claiming certification.

## Fidelity and verification

The rendered reference was captured at **1440×900** and **390×844**, including navigation and linked pages. Homepage checks also cover **320×568**, **768×1024**, **1024×768**, **1280×720**, and **1920×1080**.

Measured geometry, colors, type scales, breakpoints, gutters, borders, header/footer dimensions, and entrance timings guide the reconstruction. The former invented homepage modals, forecast demo, extra menu links, and visible animation controls have been removed. Keyboard users can still pause animation through a focus-only accessibility control; reduced-motion preferences are respected.

The licensed reference font is replaced with local Arial/Helvetica. The logo retains its measured bounding box using a neutral inline SVG. Two independently generated canvas lattices replace the reference artwork. Neutral copy is sized to preserve the original text block hierarchy; glyph shapes and replacement artwork are intentionally not pixel-identical.

```sh
npm run typecheck
npm run build
npm run inspect:reference  # optional: refresh live reference screenshots/measurements
npm test
```

Browser scripts use the development-only `playwright-core` package and an installed Google Chrome. Set `BROWSER_CHANNEL` for another installed browser channel. Tests start and stop their own production server.

Generated inspection artifacts (not part of the app):

- `.artifacts/reference/` — desktop/mobile reference screenshots and rendered measurements.
- `.artifacts/implementation/` — matching reconstruction screenshots and `structural-differences.json`.
- `.artifacts/comparison.html` — side-by-side comparison at identical viewport sizes.

Tests verify viewport fit, horizontal overflow, measured homepage/careers geometry, navigation, menu focus and Escape handling, category filters, application validation, legal scrolling, motion preferences, console errors, and the absence of third-party requests. The geometric comparison runs when reference measurements are available.

All changes are contained in this directory. Runtime dependencies are only Next.js, React, and React DOM.

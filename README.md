# Zen Trading — Landing Page

The Zen Trading landing-page frontend, built with **Next.js 16, React 19, TypeScript and Tailwind CSS 4**.

This branch adopts the revised Conway-inspired page structure and interactions while retaining Zen Trading's existing brand identity, including its logo, wordmark and research content. It is a frontend implementation; an animated research workflow should not be mistaken for a live trading or agent execution system.

> **Deployment status:** `landingpage` is the working branch for the redesigned site. The code has **not been verified in a completed Render production build** or released to `zentradings.com` as part of this README update.

## What is included

| Area | Current implementation |
| --- | --- |
| Hero | Responsive copy and a scripted **ZEN OS DEMO** terminal with expandable view and cycling example sessions |
| Process strip | **Source → Reason → Measure → Steer**; horizontal auto-pan and manual swiping on mobile, static on desktop |
| Our Systems | Interactive four-stage research loop; automatically advances roughly every six seconds when not held |
| Pipeline | Eight-step flow with two decision gates; sequential UI highlighting roughly every 1.25 seconds after entering view |
| Subscriptions | **Quant Coding Agent — $49/month** and **Zen Personal Newsletter — $9.99/month**, each with a hosted Stripe Payment Link |
| Blog | Research-journal index and individual articles from the local post data |
| Careers | Role listings, filters and a demonstration application experience; **not a connected hiring backend** |
| Other pages | Pricing, Terms of Service and Privacy Policy; external links for existing Zen Trading login, documentation and related destinations |

The ZEN OS terminal, process loop and Pipeline visualize a proposed research workflow. They do **not** execute strategies, read user files, place trades or report live results.

## Technology

- Next.js `^16.2.0` (App Router)
- React / React DOM `^19.2.0`
- TypeScript `^5.9.0`
- Tailwind CSS / PostCSS `^4.2.0`
- Node.js 22 recommended for consistent local and Render builds

## Run locally

Requirements: Node.js 22 and npm, plus access to the repository.

```bash
git clone https://github.com/jfojellyfish-glitch/Conway-ui-reverse.git
cd Conway-ui-reverse
git switch landingpage
npm ci
npm run dev
```

Open **http://localhost:3000**.

Other useful commands:

```bash
npm run typecheck          # TypeScript only
npm run build              # Production build
npm run start              # Serve the production build (after build)
```

`npm run test` invokes the older browser smoke-test script (`scripts/smoke-test.mjs`). Some assertions still target older navigation/content, and it requires a compatible Playwright/Chrome browser. **Update those assertions before relying on the test as a release gate.** A successful typecheck alone is not a production-build or visual-test pass.

## Project map

```text
src/
  app/
    page.tsx               # Homepage route
    pricing/               # Subscription details
    blog/                  # Research journal and article routes
    careers/               # Jobs and role details
    terms/                 # Terms
    privacy/               # Privacy
    globals.css            # Site styles and animation treatments
  components/
    home.tsx               # Landing-page composition
    site-shell.tsx         # Header, navigation and footer
    zen-os-demo.tsx        # Scripted expandable terminal
    process-strip.tsx      # Mobile-only horizontal motion
    systems-loop.tsx       # Four-stage interactive loop
    pipeline-flow.tsx      # Eight-stage animated UI flow
    pricing.tsx            # Plan details and checkout buttons
    careers.tsx            # Frontend role listing
  lib/
    terminal-sessions.ts   # Terminal demo scripts
    pricing.ts             # Display prices and Stripe Payment Links
    site.ts                # External Zen Trading destinations
    posts.ts               # Journal content
scripts/
  smoke-test.mjs           # Legacy browser QA script
```

## Deploy to Render — preview first

Create a **new Render Web Service** for the redesign rather than pointing the production domain at an unverified build.

| Render setting | Value |
| --- | --- |
| Repository | `https://github.com/jfojellyfish-glitch/Conway-ui-reverse` |
| Branch | `landingpage` |
| Runtime | Node |
| Root directory | Repository root (leave empty) |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Node version | 22 (set `NODE_VERSION=22` in Render if required) |
| Region / instance | Select in the intended Render workspace according to team requirements |

Deploy the preview service and inspect **Render build logs**. Once it reports a successful deploy, test the Render preview URL on desktop and mobile. Do not assume a successful source push or typecheck means the deployed site works.

The account has more than one Render workspace; verify the intended workspace with the team **before** creating or changing a service. This repository update does not itself create a Render service, deploy code or alter DNS.

## Payments and external services

The homepage and `/pricing` page read plans and checkout URLs from **`src/lib/pricing.ts`**:

- **Quant Coding Agent:** frontend display **$49/month**.
- **Zen Personal Newsletter:** frontend display **$9.99/month**, one plan only (no Standard/Pro picker).

The current Stripe links were supplied by Yvette in Slack. These are hosted checkout destinations, **not an in-app Stripe API integration**. Before publishing, open each checkout link and confirm that its **actual product, recurring price, currency, tax behavior and billing terms** match the site. Editing a frontend price does **not** change the amount Stripe charges. Do not insert Stripe secret keys into frontend code.

Existing login, docs, dashboard, contact and social destinations are maintained in **`src/lib/site.ts`**. A link to an existing service does not mean that service was rebuilt in this repository.

## Before replacing the live website

- [ ] `npm ci`, `npm run typecheck` and `npm run build` complete without errors.
- [ ] Render preview deploy succeeds; inspect runtime logs.
- [ ] Confirm correct Zen Trading logo, navigation, links and footer on mobile and desktop.
- [ ] Check ZEN OS expansion, simulated terminal sessions, Systems tabs, Pipeline highlights and mobile process-strip swiping.
- [ ] Test reduced-motion behavior and check for horizontal overflow.
- [ ] Verify both Stripe checkout products and actual monthly charges; do not make an unnecessary test payment on live links.
- [ ] Review blog, Careers example content, legal copy and all external destinations before public release.
- [ ] Obtain the team's approval before changing the production service, custom domain or DNS.

## Notes

- This is a Zen Trading-branded implementation based on a UI reverse-engineering exercise; it is **not** an affiliation with Conway.
- Demo or placeholder text, particularly in Systems and Careers, should be reviewed for publication.
- This README describes the current **`landingpage` branch**, not necessarily the repository's `main` branch or the currently live **[zentradings.com](https://zentradings.com/)**.
- Earlier design changes are documented in the local V-series changelogs where available; those notes are not a substitute for validating the current code.

// Prices shown in the Conway UI are illustrative until independently verified.
// The following official Stripe Payment Links were supplied by Yvette via Slack 2026-11-20.
export type Plan = {
  slug: string;
  eyebrow: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  tags: string[];
  checkout: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "coding-agent",
    eyebrow: "Research",
    name: "Quant Coding Agent",
    price: "$49 / month",
    tagline: "zen-coding: a terminal coding agent for quant research. You can audit every paper it reads, backtest it runs, and commit it makes.",
    features: [
      "Papers: search and read full text from alphaXiv, arXiv, and SSRN",
      "Backtests: tracks every variant and seed you try",
      "Guardrails: blocks destructive commands and writes to secrets or protected paths",
      "Audit trail: every commit and trace is tagged by session, with sources, checks, and errors",
      "Models: Anthropic, OpenAI, DigitalOcean, and Fireworks, plus a jev/auto router that plans, then builds",
      "Metrics: latency, tokens, and cost per session, plus a reproducible eval harness",
    ],
    tags: ["research", "guardrails", "audit trail"],
    checkout: "https://buy.stripe.com/dRmdRb2yP8Ar99Zdmi5c40c", // Payment Link supplied by Yvette on Slack; Stripe product and price MUST be verified before live release.
    featured: true,
  },
  {
    slug: "newsletter-agent",
    eyebrow: "Markets",
    name: "Zen Personal Newsletter",
    price: "$9.99 / month",
    tagline: "A daily market brief written by an agent from sourced filings, prices, and news — every claim cited.",
    features: [
      "Daily pre-market brief in your inbox",
      "Every claim linked to its source",
      "Watchlist and sector customisation",
      "Weekly performance and attribution recap",
      "Full archive and search",
    ],
    tags: ["daily brief", "sourced", "watchlist"],
    checkout: "https://buy.stripe.com/6oU7sNddteYPbi71DA5c40b", // Newsletter payment link supplied by Yvette in Slack. Verify product and amount at checkout.
  },
];

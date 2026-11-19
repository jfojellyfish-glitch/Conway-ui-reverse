// Placeholder prices and checkout destinations. Replace `checkout` with real
// payment links (e.g. Stripe Payment Links) when billing is wired up.
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
    price: "$99",
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
    checkout: "https://example.com/?destination=subscribe-coding-agent",
    featured: true,
  },
  {
    slug: "newsletter-agent",
    eyebrow: "Markets",
    name: "Market Newsletter Agent",
    price: "$29",
    tagline: "A daily market brief written by an agent from sourced filings, prices, and news — every claim cited.",
    features: [
      "Daily pre-market brief in your inbox",
      "Every claim linked to its source",
      "Watchlist and sector customisation",
      "Weekly performance and attribution recap",
      "Full archive and search",
    ],
    tags: ["daily brief", "sourced", "watchlist"],
    checkout: "https://example.com/?destination=subscribe-newsletter-agent",
  },
];

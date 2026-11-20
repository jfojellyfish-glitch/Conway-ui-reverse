/** Public Zen Trading service information reflected from the supplied GSA project
 * and the current public homepage. Checkout is hosted on the existing GSA site.
 * Verify live pricing and checkout availability before publishing or collecting payment.
 */
export const liveOfferings = [
  {
    slug: "reasoning-panel",
    ordinal: "01 / FUNDAMENTAL INTELLIGENCE",
    name: "Fundamental Reasoning Panel",
    headline: "The semiconductor supply chain, reasoned end to end.",
    description: "Live research dashboards for networking, memory, energy, foundry and fab equipment, with a traceable company thesis for each vendor.",
    details: ["Financial data from SEC EDGAR, DART and TWSE filings", "Theses connect market shifts to suppliers and customers", "Editable context and an audit trail for each thesis"],
    price: "$499",
    href: "https://zentradings.com/subscribe?plan=reasoning-panel",
    accent: "semiconductor",
  },
  {
    slug: "quant-infra",
    ordinal: "02 / QUANT INFRASTRUCTURE",
    name: "Quant Strategy & Infrastructure",
    headline: "One weight vector, from backtest to broker.",
    description: "Built on FinRL-X, the same strategy weights progress from research and backtesting to broker execution with risk checks.",
    details: ["Consistent code path for backtest and live trading", "Replaceable selection, allocation, timing and risk modules", "Broker execution with pre-trade risk checks"],
    price: "$2,499",
    href: "https://zentradings.com/subscribe?plan=quant-infra",
    accent: "strategy",
  },
] as const;
export const investorDeckHref = "mailto:support@zentradings.com?subject=Zen%20Trading%20investor%20deck%20request";

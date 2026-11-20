/**
 * Blog posts — research and insights. Add a post by appending to the
 * array; it appears on /blog and gets its own page at /blog/<slug>.
 */

export type PostSection = {
  heading?: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  /** Display date, e.g. "June 5, 2026" */
  date: string;
  tag: string;
  excerpt: string;
  readMinutes: number;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "personal-research-kept-personal",
    title: "Personal research, kept personal",
    date: "November 2, 2026",
    tag: "Product",
    excerpt:
      "Generic newsletters firehose everyone with the same headlines. This is the opposite: a brief built from your chosen coverage, for you alone — never profiled, shared, or sold — with every claim sourced and the run cost on the page.",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Every market newsletter makes the same promise — stay informed — and delivers the same result: a hundred headlines between you and the three facts that matter to your book. The industry optimises for send volume because volume is cheap. Attention is not, and neither is verification. You end up paying twice: once in time spent filtering, and again in the cost of what you missed while filtering.",
          "We built the opposite. Personal research is a brief assembled by our agents overnight from primary sources — SEC EDGAR filings, transcripts, and the venues you care about — scoped to exactly the tickers, sectors, and questions you chose. Your coverage list is yours: it lives in your account, is used only to build your brief, and is never profiled, shared, or sold. Anything off your list is filtered out before it can waste a minute of your morning.",
        ],
      },
      {
        heading: "What lands in your inbox",
        paragraphs: [
          "The brief opens with what actually changed: new filings, shifted guidance, supplier and customer relationships that moved. Each item is one claim, one citation, one link back to the source — the same evidence-tracing pipeline that powers our research dashboards. If nothing moved in your coverage, the brief says so in a single line and costs almost nothing to generate. No filler to justify its own existence.",
          "Because every run is traced, the brief also shows what it cost to produce — the tokens and compute behind that morning's read. When a topic keeps paying for itself, you expand it. When it doesn't, you cut it, and the next brief is cheaper. It's the same feedback loop we use for our own research: cost next to return, every time.",
        ],
      },
      {
        heading: "Built on the same rails as our research",
        paragraphs: [
          "This is not a summariser bolted onto an RSS feed. It runs on the tracing and evaluation infrastructure we use internally — the same harness that logs usage, cost, and eval quality on every agent run, and the same evals that check a cited source actually supports the claim attached to it. When the model gets something wrong, the trace shows exactly where, and the fix feeds back into the next run.",
          "The newsletter is general research, not personalised investment advice — we tell you what changed and where to check, not what to buy. Subscribers can start with a small coverage list and steer from there. Your brief, your sources, your costs, every claim checkable.",
        ],
      },
    ],
  },
  {
    slug: "how-our-machines-read-a-supply-chain-shock",
    title: "How our machines read a supply chain shock",
    date: "June 5, 2026",
    tag: "Research",
    excerpt:
      "Price moves first, explanations come later. We built our research stack the other way around: the machine reads the filings, traces the shock through suppliers and customers, and writes down its reasoning before anyone trades.",
    readMinutes: 6,
    sections: [
      {
        paragraphs: [
          "When something breaks in the semiconductor supply chain — an export control, a fab outage, a surprise capex cut — the price reaction is nearly instant. The explanation usually arrives days later, in sell-side notes assembled by analysts working through the same filings everyone has had all along. The information was public; the bottleneck was reading speed.",
          "That bottleneck is exactly what we built our research stack to remove. Our models don't watch tickers. They read primary sources — SEC EDGAR for US issuers, DART for Korea, TWSE/MOPS for Taiwan — and maintain a live, structured thesis on every vendor in the chain: what they make, who supplies them, who buys from them, and what has to be true for their earnings to hold up.",
        ],
      },
      {
        heading: "Tracing the shock, hop by hop",
        paragraphs: [
          "Consider a tightening in high-bandwidth memory. A screen tells you memory makers are up. Our system instead asks the question a careful analyst would: who sits one hop away? Packaging and test capacity gets scarcer; GPU vendors face a new bill-of-materials constraint; the power and cooling vendors serving datacenter buildouts see their backlog quality improve. Each hop is a claim about a real commercial relationship, and each claim is written down with the evidence that supports it.",
          "The output is not a sentiment score. It is a chain of reasoning — supplier to customer, with direction, magnitude, and confidence at every link — that a human can audit and challenge. When the model is wrong, we can see exactly which hop failed, fix the context, and re-run it.",
        ],
      },
      {
        heading: "Why auditability is the product",
        paragraphs: [
          "Most machine-generated research fails in the same place: it produces conclusions without showing its work, so when markets disagree, there is nothing to learn from. We took the opposite constraint. Every thesis in our dashboards traces back to filings and disclosed relationships, every revision is logged, and subscribers can edit the context the model reasons over.",
          "That discipline is what lets the same system run our own trading and serve our research clients. The dashboards you can subscribe to are not a marketing window — they are the working surface of the process we trade on.",
        ],
      },
    ],
  },
  {
    slug: "one-weight-vector-from-backtest-to-broker",
    title: "One weight vector, from backtest to broker",
    date: "May 21, 2026",
    tag: "Engineering",
    excerpt:
      "The quiet killer of quant returns is the gap between the strategy you tested and the strategy you actually run. We closed it by making backtest and live trading share a single code path.",
    readMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Every quant team has lived some version of this story: a strategy looks excellent in research, gets re-implemented for production, and the live track record never resembles the backtest. The usual suspects — lookahead bias, survivorship, fill assumptions — get the blame. But the most common cause is more mundane: the research code and the production code are two different programs, and they disagree in a hundred small ways.",
          "Our infrastructure, FinRL-X, removes the translation step. The weight vector your backtest produces is the same object the execution layer consumes. There is no re-implementation, because there is nothing to re-implement.",
        ],
      },
      {
        heading: "Strategies as swappable modules",
        paragraphs: [
          "A strategy in FinRL-X is four decisions, each behind an interface: selection (what universe), allocation (what weights), timing (when to act), and risk (what limits apply). Researchers iterate on any module independently and compose them freely — a reinforcement-learning allocator can sit behind the same risk module as a simple momentum sleeve, and both are tested by the same engine that will trade them.",
          "Because the engine is shared, a backtest is not a simulation of the strategy — it is the strategy, run against history instead of a broker. The day you go live, the only thing that changes is the data feed and the order endpoint.",
        ],
      },
      {
        heading: "Risk checks where they belong",
        paragraphs: [
          "Pre-trade risk lives in the execution layer, not in the strategy code. Position limits, drawdown controls, and sanity checks on order size run on every order, regardless of which strategy produced it. Humans oversee allocation and risk; machines handle the loop from signal to order.",
          "This is the same infrastructure behind our own trading and our Quant Strategy & Infrastructure subscription. If you want the longer technical treatment, the platform is published — and the dashboards show it running, live.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

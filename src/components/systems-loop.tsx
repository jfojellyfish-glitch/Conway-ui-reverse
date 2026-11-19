"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { links } from "@/lib/site";

type Stage = { label: string; status: string; title: string; body: string; tags: string[]; tools?: { repo: string; text: string }[] };

// Stages 03/04 copy is placeholder written to match stages 01/02.
const stages: Stage[] = [
  { label: "Research", status: "Tracing", title: "Research with agents",
    body: "Agents read filings, write quantitative code, and search for candidate signals. A harness traces every run — tokens, compute, and eval quality.",
    tags: ["usage", "cost per run", "eval quality"],
    tools: [
      { repo: "zen-tradings/zen-coding", text: "Agent-assisted quant development" },
      { repo: "zen-tradings/zen-fundamentals", text: "Source-grounded fundamental research" },
      { repo: "zen-tradings/wq-alpha-research", text: "Candidate signal exploration" },
    ] },
  { label: "Deploy", status: "Logging", title: "Deploy strategies",
    body: "Ideas that survive review ship with deployment logging and performance tracing, so every strategy reports its own P&L and risk.",
    tags: ["deployment logs", "P&L tracing", "risk"] },
  { label: "Measure", status: "Measuring", title: "Measure cost against return",
    body: "Research spend is joined to live strategy results. Each idea carries its full cost — from first agent run to production — next to the returns it earns.",
    tags: ["research cost", "net return", "attribution"] },
  { label: "Steer", status: "Steering", title: "Steer the next cycle",
    body: "Budget and attention move toward the research directions that pay for themselves, and away from those that don't. Then the loop runs again.",
    tags: ["allocation", "budget", "priorities"] },
];

const R = 150, C = 2 * Math.PI * R;
const nodes = [[200, 50], [350, 200], [200, 350], [50, 200]] as const;

export function SystemsLoop() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hold || reduce) return;
    const id = window.setTimeout(() => setActive(i => (i + 1) % stages.length), 6000);
    return () => window.clearTimeout(id);
  }, [active, hold]);

  const stage = stages[active];
  const n = String(active + 1).padStart(2, "0");

  return <section id="systems" className="systems page-gutters" aria-labelledby="systems-title">
    <p className="eyebrow">// Our systems</p>
    <h2 id="systems-title">A feedback loop<br/>that keeps research costs<br/><span className="text-accent">below strategy returns.</span></h2>
    <p className="systems-lede">Research → deploy → measure → steer. Then again.</p>

    <div className="systems-grid" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="loop">
        <svg className="loop-ring" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r={R} className="loop-track"/>
          <circle cx="200" cy="200" r={R} className="loop-progress" strokeDasharray={C} strokeDashoffset={C * (1 - active / stages.length)} transform="rotate(-90 200 200)"/>
          <circle cx="200" cy="200" r="86" className="loop-core"/>
        </svg>
        <div className="loop-center" aria-live="polite">
          <strong>Cost vs<br/>Return</strong>
          <span><i aria-hidden="true"/>{stage.status}</span>
        </div>
        <div role="tablist" aria-label="Loop stages">
          {stages.map((s, i) => <button key={s.label} role="tab" id={`stage-tab-${i}`} aria-selected={i === active} aria-controls="stage-panel"
            className={`loop-node loop-node-${i}`} style={{ left: `${nodes[i][0] / 4}%`, top: `${nodes[i][1] / 4}%` }} onClick={() => setActive(i)}>
            <span className="loop-dot">{String(i + 1).padStart(2, "0")}</span><span className="loop-label">{s.label}</span>
          </button>)}
        </div>
      </div>

      <article className="stage-card" id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} key={active}>
        <p className="eyebrow">Stage {n} / 04</p>
        <h3>{stage.title}</h3>
        <p className="stage-body">{stage.body}</p>
        <ul className="stage-tags">{stage.tags.map(t => <li key={t}>{t}</li>)}</ul>
        {stage.tools && <>
          <p className="stage-tools-label">Tools in this stage</p>
          <ul className="stage-tools">{stage.tools.map(t => <li key={t.repo}>
            <a href={`https://github.com/${t.repo}`} target="_blank" rel="noopener noreferrer"><code>{t.repo}<Icon name="arrow" width="11" height="11"/></code><span>{t.text}</span></a>
          </li>)}</ul>
        </>}
      </article>
    </div>

    <p className="systems-outro">Explore our research tools and open-source projects — <a href={links.github} target="_blank" rel="noopener noreferrer">github.com/zen-tradings<Icon name="arrow" width="11" height="11"/></a></p>
  </section>;
}

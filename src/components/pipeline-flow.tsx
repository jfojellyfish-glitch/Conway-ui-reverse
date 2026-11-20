"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Step = { title: string; body: string; decision?: { yes: string; no: string } };

// Placeholder copy written to match the systems loop above.
const rows: Step[][] = [
  [
    { title: "Hypothesis", body: "A candidate signal or thesis, written down with its expected edge." },
    { title: "Agent research", body: "Agents gather sources and write the code. Each run is traced and costed." },
    { title: "Survives review?", body: "Backtest, source check and risk review.", decision: { yes: "Deploy", no: "Archived, cost logged" } },
    { title: "Deploy", body: "Ships with deployment logging and live P&L tracing." },
  ],
  [
    { title: "Trace returns", body: "Live P&L, risk and drawdown are recorded per strategy." },
    { title: "Join research cost", body: "Every agent run, from the first, is attributed to the idea." },
    { title: "Return > cost?", body: "Net return is compared with the full research spend.", decision: { yes: "Scale", no: "Retire" } },
    { title: "Reallocate", body: "Budget moves toward the directions that pay for themselves." },
  ],
];

export function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); setInView(true); return; }
    // A low threshold also works when the long, vertically stacked flow enters a phone viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
      setInView(entry.isIntersecting);
    }, { threshold: 0.02 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Let the original staggered entrance finish before the quieter flowing highlight begins.
    const start = window.setTimeout(() => setActiveStep(0), 1150);
    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveStep(previous => (previous + 1) % 8);
    }, 3450);
    return () => { window.clearTimeout(start); window.clearInterval(interval); };
  }, [inView, visible]);

  let n = 0, step = 0;
  return <section id="pipeline" className="pipeline page-gutters" aria-labelledby="pipeline-title">
    <p className="eyebrow">// The pipeline</p>
    <h2 id="pipeline-title">Every idea earns its place<br/><span className="text-accent">or gets cut.</span></h2>
    <p className="systems-lede">One idea, from hypothesis to reallocation. Two gates decide whether it continues.</p>

    <div ref={ref} className="flow" data-visible={visible} data-cycle-step={activeStep}>
      {rows.map((row, r) => <div key={r} className="flow-block">
        {r > 0 && <div className="flow-turn" aria-hidden="true"><i/></div>}
        <ol className="flow-row">
          {row.map(s => { const i = n++; const label = s.decision ? "◇" : String(++step).padStart(2, "0"); return <li key={s.title} className={`flow-node${s.decision ? " flow-decision" : ""}`} data-active={activeStep === i} style={{ "--i": i } as CSSProperties}>
            <span className="flow-index" aria-hidden="true">{label}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            {s.decision && <dl className="flow-branches">
              <div><dt>Yes</dt><dd>{s.decision.yes}</dd></div>
              <div className="flow-no"><dt>No</dt><dd>{s.decision.no}</dd></div>
            </dl>}
          </li>; })}
        </ol>
      </div>)}
      <p className="flow-return"><span aria-hidden="true">↺</span> Back to Hypothesis. The loop runs again.</p>
    </div>
  </section>;
}

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

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let n = 0, step = 0;
  return <section id="pipeline" className="pipeline page-gutters" aria-labelledby="pipeline-title">
    <p className="eyebrow">// The pipeline</p>
    <h2 id="pipeline-title">Every idea earns its place<br/><span className="text-accent">or gets cut.</span></h2>
    <p className="systems-lede">One idea, from hypothesis to reallocation. Two gates decide whether it continues.</p>

    <div ref={ref} className="flow" data-visible={visible}>
      {rows.map((row, r) => <div key={r} className="flow-block">
        {r > 0 && <div className="flow-turn" aria-hidden="true"><i/></div>}
        <ol className="flow-row">
          {row.map(s => { const i = n++; const label = s.decision ? "◇" : String(++step).padStart(2, "0"); return <li key={s.title} className={`flow-node${s.decision ? " flow-decision" : ""}`} style={{ "--i": i } as CSSProperties}>
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

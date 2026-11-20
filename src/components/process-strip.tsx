const stages = [
  { number: "01", label: "SOURCE" },
  { number: "02", label: "REASON" },
  { number: "03", label: "MEASURE" },
  { number: "04", label: "STEER" },
] as const;

/** A single seamless, screen-width process ticker on desktop and mobile. */
export function ProcessStrip() {
  return (
    <section className="process-strip" aria-label="Research process">
      <div className="process-strip-viewport">
        <div className="process-strip-marquee">
          <ol className="process-strip-list">
            {stages.map((stage) => (
              <li key={stage.number} className="process-strip-item">
                <strong>{stage.number}</strong><span>{stage.label}</span>
              </li>
            ))}
          </ol>
          {/* Duplicate once for the seamless loop; hidden from screen readers. */}
          <ol className="process-strip-list" aria-hidden="true">
            {stages.map((stage) => (
              <li key={stage.number} className="process-strip-item">
                <strong>{stage.number}</strong><span>{stage.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

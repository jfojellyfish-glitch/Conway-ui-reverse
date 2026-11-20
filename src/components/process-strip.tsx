"use client";

import { useEffect, useRef } from "react";

const stages = [
  { number: "01", label: "SOURCE" },
  { number: "02", label: "REASON" },
  { number: "03", label: "MEASURE" },
  { number: "04", label: "STEER" },
] as const;

/** The original Conway strip stays static on desktop; only phones auto-pan. */
export function ProcessStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const mobile = window.matchMedia("(max-width: 760px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let direction = 1;
    let pauseUntil = 0;
    let visible = false;

    const syncProgress = () => {
      const total = Math.max(0, track.scrollWidth - track.clientWidth);
      const ratio = total ? Math.min(1, Math.max(0, track.scrollLeft / total)) : 0;
      const width = track.scrollWidth ? Math.max(18, Math.min(100, track.clientWidth / track.scrollWidth * 100)) : 100;
      thumb.style.width = `${width}%`;
      thumb.style.left = `${(100 - width) * ratio}%`;
    };
    const pause = () => { pauseUntil = performance.now() + 7500; };
    const animate = (now: number) => {
      const delta = previous ? Math.min(now - previous, 60) : 0;
      previous = now;
      if (mobile.matches && !reducedMotion.matches && visible && now > pauseUntil) {
        const max = track.scrollWidth - track.clientWidth;
        if (max > 1) {
          track.scrollLeft += delta * 0.036 * direction;
          if (track.scrollLeft >= max - 1) direction = -1;
          if (track.scrollLeft <= 1) direction = 1;
        }
      }
      syncProgress();
      frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
    }, { threshold: 0.1 });
    observer.observe(track);
    track.addEventListener("pointerdown", pause, { passive: true });
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("wheel", pause, { passive: true });
    track.addEventListener("keydown", pause);
    track.addEventListener("focusin", pause);
    window.addEventListener("resize", syncProgress);
    syncProgress();
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("wheel", pause);
      track.removeEventListener("keydown", pause);
      track.removeEventListener("focusin", pause);
      window.removeEventListener("resize", syncProgress);
    };
  }, []);

  return <section className="process-strip" aria-label="Research process">
    <div className="process-strip-track" ref={trackRef} tabIndex={0} aria-label="Research stages; on mobile swipe horizontally to explore">
      <ol className="process-strip-list">
        {stages.map((stage) => <li key={stage.number} className="process-strip-item">
          <strong>{stage.number}</strong><span>{stage.label}</span>
        </li>)}
      </ol>
    </div>
    <div className="process-strip-progress" aria-hidden="true"><div className="process-strip-thumb" ref={thumbRef}/></div>
  </section>;
}

"use client";

import { useEffect, useRef, useState } from "react";

/** Original generative artwork: a gently moving, two-dimensional signal lattice. */
function SignalCanvas({ layer, paused }: { layer: number; paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let inView = true;

    const point = (x: number, y: number, time: number) => {
      const bend = Math.sin(x * 0.009 + time * 0.12 + layer * 2);
      const depth = y / Math.max(height, 1);
      return {
        x: x + bend * depth * (8 + layer * 9) + Math.sin(y * 0.006 + x * 0.004 + time * 0.14) * 3,
        y: y + Math.sin(x * 0.009 + time * 0.1 + layer) * 2,
      };
    };

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const time = elapsed.current;
      context.strokeStyle = "rgba(23, 20, 16, 0.17)";
      context.lineWidth = 0.55;
      for (let x = -45; x < width + 45; x += 45) {
        context.beginPath();
        for (let y = -10; y <= height + 10; y += 8) {
          const p = point(x, y, time);
          if (y === -10) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        }
        context.stroke();
      }
      for (let col = -1; col <= Math.ceil(width / 15); col++) {
        for (let row = -1; row <= Math.ceil(height / 15); row++) {
          const x = col * 15 + 7;
          const y = row * 15 + 8;
          const p = point(x, y, time);
          const wave = Math.sin(col * 0.35 + row * 0.09 - time * 0.32 + layer * 2.6);
          const grain = (Math.sin(col * 27.13 + row * 57.71) + 1) / 2;
          const opacity = 0.2 + Math.pow((wave + 1) / 2, 8) * 0.65 + grain * 0.08;
          context.fillStyle = `rgba(30, 28, 25, ${opacity})`;
          context.beginPath();
          context.ellipse(p.x, p.y, 0.68 + grain * 0.15, 0.8 + grain * 0.16, 0.3, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const tick = (now: number) => {
      // Cap drawing to ~30 fps; motion depends on elapsed time, not refresh rate.
      if (now - lastTime >= 32) {
        elapsed.current += lastTime ? Math.min((now - lastTime) / 1000, 0.08) : 0;
        lastTime = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const updatePlayback = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (!paused && inView && !document.hidden) frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", updatePlayback);
    resize();
    updatePlayback();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [layer, paused]);

  return <canvas ref={canvasRef} aria-hidden="true" className="signal-canvas" />;
}

export function SignalField() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualPause, setManualPause] = useState<boolean | null>(null);
  const paused = manualPause ?? reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <figure className="signal-field" aria-label="Two flowing fields of data points, suggesting patterns emerging from event streams.">
      {[0, 1].map(layer => (
        <div className={`signal-panel signal-panel-${layer}`} key={layer}>
          <SignalCanvas layer={layer} paused={paused} />
          <span className="frame-edge edge-top" aria-hidden="true" />
          <span className="frame-edge edge-right" aria-hidden="true" />
          <span className="frame-edge edge-bottom" aria-hidden="true" />
          <span className="frame-edge edge-left" aria-hidden="true" />
        </div>
      ))}
      <button className="assistive-control" onClick={() => setManualPause(!paused)}>{paused ? "Play animation" : "Pause animation"}</button>
      <figcaption className="sr-only">An original, animated interpretation of a prediction signal. Use the animation control to pause or resume.</figcaption>
    </figure>
  );
}

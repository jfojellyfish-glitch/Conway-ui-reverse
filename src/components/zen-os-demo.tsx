"use client";

import { useEffect, useRef, useState } from "react";
import { terminalSessions, terminalFootnote, type TerminalStep } from "@/lib/terminal-sessions";

// This is the original GSA scripted demonstration, presented inside the Conway layout.
// It never reads local files or executes commands: all tool results are illustrative.
const spinnerFrames = ["·", "✢", "✳︎", "✶", "✻", "✽", "✻", "✶", "✳︎", "✢"];
const escapeHtml = (text: string) => text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

export function ZenOsDemo() {
  const [expanded, setExpanded] = useState(false);
  const output = useRef<HTMLPreElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", close); expandButton.current?.focus(); };
  }, [expanded]);

  useEffect(() => {
    const node = output.current;
    if (!node) return;
    let active = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lines: string[] = [];
    let live = "";
    const sleep = async (ms: number) => {
      await new Promise<void>(resolve => window.setTimeout(resolve, reduce ? 0 : ms));
      if (!active) throw new Error("terminal demo unmounted");
    };
    const paint = (caret: boolean) => {
      if (!active) return;
      node.innerHTML = lines.join("\n") + (lines.length ? "\n" : "") + live + (caret ? '<span class="zen-terminal-caret">&nbsp;</span>' : "");
      node.scrollTop = node.scrollHeight;
    };
    const commit = (text: string) => { lines.push(text); live = ""; paint(false); };
    const jitter = (base: number, spread: number) => base + Math.random() * spread;

    const typeInto = async (prefix: string, text: string, cls: string, speed: number) => {
      if (reduce) { live = prefix + `<span class="${cls}">${escapeHtml(text)}</span>`; paint(false); return; }
      for (let i = 1; i <= text.length; i++) {
        live = prefix + `<span class="${cls}">${escapeHtml(text.slice(0, i))}</span>`;
        paint(true);
        const ch = text[i - 1];
        await sleep(ch === " " ? jitter(speed * 1.6, 40) : jitter(speed, speed * .8));
      }
    };

    const spinner = async (label: string, ms: number) => {
      if (reduce) return Math.max(1, Math.round(ms / 1000));
      const start = performance.now();
      let f = 0;
      while (performance.now() - start < ms) {
        const seconds = Math.floor((performance.now() - start) / 1000);
        live = `<span class="t-spin">${spinnerFrames[f++ % spinnerFrames.length]}</span> <span class="t-dim">${escapeHtml(label)}… (${seconds}s)</span>`;
        paint(false);
        await sleep(110);
      }
      return Math.max(1, Math.round(ms / 1000));
    };

    const runStep = async (step: TerminalStep) => {
      switch (step.t) {
        case "prompt":
          await typeInto('<span class="t-accent">&gt;</span> ', step.text, "t-user", 42);
          await sleep(400);
          commit(live);
          commit("");
          break;
        case "think": {
          const seconds = await spinner(step.verb || "Thinking", step.ms || 2000);
          commit(`<span class="t-dim">✻ ${escapeHtml(step.verb || "Thought")} for ${seconds}s</span>`);
          await sleep(250);
          break;
        }
        case "say": {
          let msg = "";
          for (const word of step.text.split(" ")) {
            msg += (msg ? " " : "") + word;
            live = `<span class="t-accent">⏺︎</span> ${escapeHtml(msg)}`;
            paint(true);
            await sleep(jitter(70, 90));
          }
          commit(live); commit("");
          await sleep(650);
          break;
        }
        case "tool": {
          const head = `<span class="t-tool">${escapeHtml(step.name)}</span>(<span class="t-arg">${escapeHtml(step.arg)}</span>)`;
          if (!reduce) {
            const start = performance.now();
            let f = 0;
            while (performance.now() - start < (step.ms || 1500)) {
              live = `<span class="t-spin">${spinnerFrames[f++ % spinnerFrames.length]}</span> ${head}\n  <span class="t-dim">⎿ running…</span>`;
              paint(false);
              await sleep(110);
            }
          }
          commit(`<span class="t-ok">⏺︎</span> ${head}`);
          for (let i = 0; i < (step.out || []).length; i++) {
            commit(`  <span class="t-dim">${i === 0 ? "⎿" : " "} ${escapeHtml(step.out![i])}</span>`);
            await sleep(260);
          }
          commit("");
          await sleep(450);
          break;
        }
        case "diff":
          commit(`<span class="t-ok">⏺︎</span> <span class="t-tool">Edit</span>(<span class="t-arg">${escapeHtml(step.file)}</span>)`);
          for (const line of step.lines) {
            const cls = line.startsWith("+") ? "t-add" : line.startsWith("-") ? "t-del" : "t-dim";
            await sleep(420);
            commit(`  <span class="${cls}">${escapeHtml(line)}</span>`);
          }
          commit("");
          await sleep(700);
          break;
        case "pause":
          await sleep(step.ms || 1000);
          break;
      }
    };

    const run = async () => {
      try {
        for (let index = 0; active; index = (index + 1) % terminalSessions.length) {
          const session = terminalSessions[index];
          lines = [
            `<span class="t-accent">✻</span> <span class="t-strong">zen-coding</span> <span class="t-dim">· ~/${escapeHtml(session.title)}</span>`,
            "",
          ];
          live = "";
          paint(true);
          await sleep(reduce ? 0 : 650);
          for (const step of session.steps) await runStep(step);
          if (terminalFootnote) commit(`<span class="t-dim">${escapeHtml(terminalFootnote)}</span>`);
          live = '<span class="t-accent">&gt;</span> ';
          paint(true);
          // Reduced motion freezes the completed code sample, rather than cycling.
          if (reduce) return;
          await sleep(5200);
        }
      } catch {
        // Expected when the component unmounts while a scripted line is pending.
      }
    };
    void run();
    return () => { active = false; };
  }, []);

  return (
    <figure className={`zen-os-visual${expanded ? " is-expanded" : ""}`} aria-label="Zen OS scripted code demonstration">
      <div className="zen-os-window">
        <div className="zen-os-titlebar"><span>ZEN OS</span><span className="zen-os-title-soft">DEMO</span></div>
        <pre ref={output} className="zen-os-body zen-os-output" aria-hidden="true" suppressHydrationWarning>
          {"✻ zen-coding · ~/quant/review\n\n> review ./strategies/momentum.py for lookahead bias\n\n✻ Reading for 2s\n⏺︎ Read(strategies/momentum.py)\n  ⎿ 142 lines\n\n✢ Grep(\"shift\\(|rolling\\(\" strategies/)\n  ⎿ running…"}
        </pre>
        <button ref={expandButton} type="button" className="zen-os-expand" onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Close enlarged demo" : "Enlarge Zen OS demo"} aria-pressed={expanded} title={expanded ? "Close demo (Esc)" : "Expand demo"}>
          {expanded
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true"><path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true"><path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"/></svg>}
        </button>
      </div>
      <figcaption className="sr-only">Illustrative scripted demo. It cycles through strategy code review, citation evaluation, and research-file searches. No real files are opened and no code is executed.</figcaption>
    </figure>
  );
}

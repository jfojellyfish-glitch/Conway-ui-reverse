/** Original GSA animated terminal sessions, unmodified content. Scripted demos, not real execution. */
export type TerminalStep =
  | {t:"prompt";text:string}
  | {t:"think";verb?:string;ms?:number}
  | {t:"say";text:string}
  | {t:"tool";name:string;arg:string;ms?:number;out?:string[]}
  | {t:"diff";file:string;lines:string[]}
  | {t:"pause";ms?:number};
export type TerminalSession = {title:string;steps:TerminalStep[]};
export const terminalSessions: TerminalSession[] = [
  {
    "title": "quant/review",
    "steps": [
      {
        "t": "prompt",
        "text": "review ./strategies/momentum.py for lookahead bias"
      },
      {
        "t": "think",
        "verb": "Reading",
        "ms": 2000
      },
      {
        "t": "tool",
        "name": "Read",
        "arg": "strategies/momentum.py",
        "ms": 1600,
        "out": [
          "142 lines"
        ]
      },
      {
        "t": "tool",
        "name": "Grep",
        "arg": "\"shift\\(|rolling\\(\" strategies/",
        "ms": 1400,
        "out": [
          "3 matches in 1 file"
        ]
      },
      {
        "t": "think",
        "verb": "Analyzing",
        "ms": 2800
      },
      {
        "t": "say",
        "text": "Line 58 computes the signal from today's close, then trades on the same bar. That leaks future data."
      },
      {
        "t": "diff",
        "file": "strategies/momentum.py",
        "lines": [
          "- signal = close.pct_change(20)",
          "+ signal = close.pct_change(20).shift(1)"
        ]
      },
      {
        "t": "tool",
        "name": "Bash",
        "arg": "pytest tests/test_momentum.py -q",
        "ms": 3200,
        "out": [
          "8 passed"
        ]
      },
      {
        "t": "say",
        "text": "Patch proposed and tests pass. Waiting for your approval to apply."
      }
    ]
  },
  {
    "title": "evals/checks",
    "steps": [
      {
        "t": "prompt",
        "text": "run the citation eval on the sample dataset"
      },
      {
        "t": "think",
        "verb": "Preparing",
        "ms": 1800
      },
      {
        "t": "tool",
        "name": "Bash",
        "arg": "zen eval --dataset sample --check citations",
        "ms": 3600,
        "out": [
          "scoring criteria ....... loaded",
          "evidence tracing ....... enabled",
          "cases evaluated ........ 50 / 50"
        ]
      },
      {
        "t": "think",
        "verb": "Verifying",
        "ms": 2200
      },
      {
        "t": "say",
        "text": "4 answers cite sources that don't support the claim. I've listed them in evals/report.md for manual verification."
      }
    ]
  },
  {
    "title": "research/filings",
    "steps": [
      {
        "t": "prompt",
        "text": "summarize the risk factors in the latest 10-K for EXAMPLE and cite sources"
      },
      {
        "t": "think",
        "verb": "Planning",
        "ms": 2200
      },
      {
        "t": "say",
        "text": "I'll locate the filing, pull the risk section, and keep every claim tied to a page reference."
      },
      {
        "t": "tool",
        "name": "Search",
        "arg": "filings ticker=EXAMPLE form=10-K",
        "ms": 1800,
        "out": [
          "Found 1 filing · FY sample"
        ]
      },
      {
        "t": "tool",
        "name": "Read",
        "arg": "10-K § Item 1A Risk Factors",
        "ms": 2400,
        "out": [
          "Read 38 pages"
        ]
      },
      {
        "t": "think",
        "verb": "Extracting",
        "ms": 2600
      },
      {
        "t": "tool",
        "name": "Write",
        "arg": "notes/example-risk-factors.md",
        "ms": 1400,
        "out": [
          "12 findings · 12 citations attached"
        ]
      },
      {
        "t": "say",
        "text": "Done. Notes are drafted with source references — flagged for human review before use."
      }
    ]
  }
];
export const terminalFootnote = "// Illustrative demo \u2014 not live market data";

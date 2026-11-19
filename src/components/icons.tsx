import type { SVGProps } from "react";

type Name = "arrow" | "right" | "left" | "menu" | "close" | "shield" | "upload" | "x" | "linkedin";
const paths: Record<Name, React.ReactNode> = {
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  right: <path d="M4 12h16m-7-7 7 7-7 7" />,
  left: <path d="M20 12H4m7-7-7 7 7 7" />,
  menu: <path d="M5 5h14M5 12h14M5 19h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  shield: <><path d="m12 2 8 4v5c0 5-5 9-8 11-3-2-8-6-8-11V6Z"/><path d="m8 12 3 3 5-6"/></>,
  upload: <path d="M12 16V3m-5 5 5-5 5 5M4 18v3h16v-3" />,
  x: <><path d="m4 3 16 18h-5L3 3h5l13 18M20 3 4 21" strokeWidth="1.2"/></>,
  linkedin: <><rect x="2" y="2" width="20" height="20" rx="1" fill="currentColor" stroke="none"/><path d="M7 10v8m0-11v.1M11 18v-8m0 4c0-5 6-5 6 0v4" stroke="var(--paper)" strokeWidth="2"/></>,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: Name }) {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

/** Neutral wordmark sized to the logo rectangle; text is squeezed to a fixed length. */
export function Wordmark() {
  return <svg className="wordmark" viewBox="0 0 162 25" role="img" aria-label="Zen Trading"><rect x="1.5" y="3.5" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M6 8h9v9H6Z" fill="currentColor"/><text x="29" y="20.5" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="23" letterSpacing="-1" textLength="132" lengthAdjust="spacingAndGlyphs">Zen Trading</text></svg>;
}

import type { SVGProps } from "react";

type Name = "arrow" | "right" | "left" | "menu" | "close" | "shield" | "upload" | "x" | "linkedin" | "github";
const paths: Record<Name, React.ReactNode> = {
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  right: <path d="M4 12h16m-7-7 7 7-7 7" />,
  left: <path d="M20 12H4m7-7-7 7 7 7" />,
  menu: <path d="M5 5h14M5 12h14M5 19h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  shield: <><path d="m12 2 8 4v5c0 5-5 9-8 11-3-2-8-6-8-11V6Z"/><path d="m8 12 3 3 5-6"/></>,
  upload: <path d="M12 16V3m-5 5 5-5 5 5M4 18v3h16v-3" />,
  x: <><path d="m4 3 16 18h-5L3 3h5l13 18M20 3 4 21" strokeWidth="1.2"/></>,
  github: <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.087 3.292 9.408 7.86 10.93.575.105.79-.249.79-.557 0-.275-.011-1.188-.017-2.139-3.197.695-3.872-1.544-3.872-1.544-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.08-.699.08-.699 1.154.081 1.76 1.185 1.76 1.185 1.027 1.76 2.694 1.252 3.35.957.104-.744.401-1.251.73-1.539-2.55-.29-5.231-1.275-5.231-5.68 0-1.254.448-2.278 1.182-3.082-.119-.291-.512-1.459.112-3.042 0 0 .965-.309 3.161 1.177 a11.018 11.018 0 0 1 5.753 0c2.196-1.486 3.16-1.177 3.16-1.177.626 1.583.232 2.751.114 3.042.735.804 1.18 1.828 1.18 3.082 0 4.416-2.685 5.387-5.244 5.671.412.357.779 1.062.779 2.14 0 1.544-.014 2.79-.014 3.168 0 .311.207.668.79.556C20.71 21.405 24 17.085 24 12 24 5.648 18.852.5 12 .5Z" fill="currentColor" stroke="none"/>,
  linkedin: <><rect x="2" y="2" width="20" height="20" rx="1" fill="currentColor" stroke="none"/><path d="M7 10v8m0-11v.1M11 18v-8m0 4c0-5 6-5 6 0v4" stroke="var(--paper)" strokeWidth="2"/></>,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: Name }) {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

/** Neutral wordmark sized to the logo rectangle; text is squeezed to a fixed length. */
export function Wordmark() {
  return <span className="gsa-wordmark" aria-label="Zen Trading">
    <span className="gsa-wordmark-icon"><img src="/brand/zen-trading-mark-dark.png" width="52" height="34" alt="" /></span>
    <span className="gsa-wordmark-text">Zen<span> Trading</span></span>
  </span>;
}

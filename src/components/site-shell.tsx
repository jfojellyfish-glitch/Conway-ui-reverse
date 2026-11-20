"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, Wordmark } from "./icons";
import { links } from "@/lib/site";

export function Credits() {
  return <div className="credits flex flex-wrap items-center">
    <div className="social-links flex items-center gap-2">
      <a className="social-link" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="Zen Trading GitHub"><Icon name="github" width="17" height="17" /></a>
      <a className="social-link" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Zen Trading LinkedIn"><Icon name="linkedin" /></a>
    </div>
    <span className="copyright">© 2026 Zen Trading</span>
    <span className="gsa-footer-caption">Research · Verify · Deploy</span>
  </div>;
}

function FooterLinks() {
  return <nav className="footer-links" aria-label="Footer navigation"><ul className="flex flex-wrap items-center justify-center">
    <li><Link href="/terms">Terms of Service</Link></li>
    <li><Link href="/privacy">Privacy Policy</Link></li>
    <li><a href={links.docs} target="_blank" rel="noopener noreferrer">Docs</a></li>
  </ul></nav>;
}

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return <footer className={compact ? "site-footer compact-footer page-gutters" : "site-footer full-footer page-gutters"}>
    {compact ? <div className="footer-row"><Credits/><FooterLinks/></div> : <><div className="footer-brand-row"><Link href="/" aria-label="Zen Trading home"><Wordmark/></Link><FooterLinks/></div><Credits/></>}
  </footer>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 4);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const desktop = window.matchMedia("(min-width: 768px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", resize);
    return () => { window.removeEventListener("scroll", scroll); desktop.removeEventListener("change", resize); };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = before; };
  }, [open]);

  return <>
    <header className="site-header page-gutters flex items-center justify-between" data-scrolled={scrolled}>
      <Link href="/" className="brand-link" aria-label="Zen Trading home"><Wordmark/></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="/#systems" className="button button-outline">Systems</a><Link href="/pricing" className="button button-outline">Agents</Link><Link href="/blog" className="button button-outline">Blog</Link><Link href="/careers" className="button button-outline careers-button">Careers</Link><a href={links.login} className="button button-dark login-button">Log In</a></nav>
      <button className="menu-trigger icon-button" aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(true)}><Icon name="menu" width="16" height="16"/></button>
    </header>
    <dialog ref={dialogRef} className="mobile-menu" aria-label="Navigation" onCancel={event => { event.preventDefault(); setOpen(false); }} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]"));
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="menu-inner">
        <button className="icon-button menu-close" aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" width="16" height="16"/></button>
        <nav className="mobile-links" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <a href="/#systems" onClick={() => setOpen(false)}>Systems</a>
          <Link href="/pricing" onClick={() => setOpen(false)}>Agents</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/careers" onClick={() => setOpen(false)}>Careers</Link>
          <a href={links.contact} onClick={() => setOpen(false)}>Contact</a>
          <a href={links.login}>Log In</a>
        </nav>
        <div className="menu-credits"><Credits/></div>
      </div>
    </dialog>
  </>;
}

export function SiteShell({ children, home = false, footer = true }: { children: ReactNode; home?: boolean; footer?: boolean }) {
  return <div className={home ? "site-shell home-shell" : "site-shell"}>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>{children}{footer && <SiteFooter compact={home}/>}
  </div>;
}

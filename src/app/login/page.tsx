import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Wordmark } from "@/components/icons";
import LoginClient from "./LoginClient";
import "./conway-login.css";

export const metadata: Metadata = {
  title: "Log In — Zen Trading",
  description: "Sign in to access Zen Trading research.",
};

export default function LoginPage() {
  return <div className="conway-auth-page">
    <a className="conway-auth-skip" href="#auth-form">Skip to sign-in</a>
    <header className="conway-auth-header">
      <Link href="/" aria-label="Zen Trading home" className="conway-auth-brand"><Wordmark /></Link>
      <nav aria-label="Login navigation" className="conway-auth-nav">
        <Link href="/" className="conway-auth-outline">Home ↗</Link>
        <Link href="/pricing" className="conway-auth-outline">Plans ↗</Link>
      </nav>
    </header>
    <main className="conway-auth-main" id="auth-form">
      <div className="conway-auth-intro">
        <p className="conway-auth-eyebrow">// ZEN TRADING / RESEARCH ACCESS</p>
        <h1>Research.<br/>Verified.<br/><em>Accessible.</em></h1>
        <p className="conway-auth-lede">One account for your research workspace.<br/>Sign in to continue where you left off.</p>
        <div className="conway-auth-process" aria-label="Research workflow">
          <span>01 / SOURCE</span><span>02 / REASON</span>
          <span>03 / MEASURE</span><span>04 / STEER</span>
        </div>
      </div>
      <Suspense fallback={<div className="conway-auth-panel" aria-busy="true">Loading sign-in…</div>}><LoginClient /></Suspense>
    </main>
    <footer className="conway-auth-footer">
      <span>© 2026 Zen Trading</span><span>Research · Verify · Deploy</span>
      <a href="mailto:support@zentradings.com">Need help? ↗</a>
    </footer>
  </div>;
}

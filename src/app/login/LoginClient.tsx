"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { subscriptionStatus } from "@/lib/subscription";
import { links } from "@/lib/site";

type Mode = "signin" | "signup";
type AuthClient = ReturnType<typeof createClient>;
const help = "support@zentradings.com";
const inactiveMessage = "Your account does not yet have active dashboard access. Please review the plans or contact " + help + " if you have already paid.";
const unavailableMessage = "We couldn't verify dashboard access. Please try again or contact support.";
function GoogleMark() {
  return <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>;
}

export default function LoginClient() {
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const arrivedError = params.get("error");
  // Restrict user-supplied redirect destinations to same-site relative paths.
  const rawNext = params.get("next");
  const nextPath = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("\\")
    ? rawNext : links.dashboard;

  useEffect(() => {
    if (arrivedError === "inactive") setError(inactiveMessage);
    else if (arrivedError === "subscription") setError(unavailableMessage);
    else if (arrivedError === "auth") setError("Your sign-in link has expired or is invalid. Please try again.");
  }, [arrivedError]);

  async function verifyAndForward(supabase: AuthClient, userId: string): Promise<boolean> {
    const status = await subscriptionStatus(supabase, userId);
    if (status !== "active") {
      await supabase.auth.signOut();
      setError(status === "inactive" ? inactiveMessage : unavailableMessage);
      return false;
    }
    window.location.assign(nextPath);
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(null); setNotice(null);
    try {
      const supabase = createClient();
      if (mode === "signin") {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) { setError(authError.message); return; }
        if (data.user && await verifyAndForward(supabase, data.user.id)) return;
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: location.origin + "/auth/callback?next=" + encodeURIComponent(nextPath) }
        });
        if (authError) { setError(authError.message); return; }
        if (data.session && await verifyAndForward(supabase, data.session.user.id)) return;
        if (!data.session) setNotice("Check your email to confirm your account. Dashboard access is subject to subscription verification.");
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Sign-in is temporarily unavailable."); }
    finally { setBusy(false); }
  }

  async function handleGoogle() {
    setBusy(true); setError(null); setNotice(null);
    try {
      const { error: authError } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: location.origin + "/auth/callback?next=" + encodeURIComponent(nextPath) }
      });
      if (authError) setError(authError.message);
    } catch (err) { setError(err instanceof Error ? err.message : "Google sign-in is unavailable."); }
    finally { setBusy(false); }
  }

  return <section className="conway-auth-panel" aria-labelledby="login-title">
    <div className="conway-auth-panel-meta"><span>AUTHENTICATION</span><span>ZEN / 001</span></div>
    <div className="conway-auth-panel-body">
      <p className="conway-auth-index">01 / ACCOUNT ACCESS</p>
      <h2 id="login-title">{mode === "signin" ? "Welcome back." : "Create an account."}</h2>
      <p className="conway-auth-description">{mode === "signin" ? "Sign in to access your research dashboards." : "Create an account to request research access."}</p>
      <button type="button" disabled={busy} className="conway-auth-google" onClick={handleGoogle}><GoogleMark/><span>Continue with Google</span><span className="conway-auth-arrow" aria-hidden="true">↗</span></button>
      <div className="conway-auth-divider"><span>OR CONTINUE WITH EMAIL</span></div>
      <form className="conway-auth-form" onSubmit={handleSubmit}>
        <label><span>Email address</span><input className="conway-auth-input" type="email" required autoComplete="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label><span>Password</span><input className="conway-auth-input" type="password" minLength={6} required autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder={mode === "signin" ? "Your password" : "At least 6 characters"} value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <p className="conway-auth-error" role="alert">{error}</p>}
        {notice && <p className="conway-auth-notice" role="status">{notice}</p>}
        <button className="conway-auth-submit" type="submit" disabled={busy}><span>{busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}</span><span aria-hidden="true">→</span></button>
      </form>
      <div className="conway-auth-switch">
        {mode === "signin" ? <>New to Zen Trading? <button type="button" onClick={() => { setMode("signup"); setError(null); setNotice(null); }}>Create an account ↗</button></>
          : <>Already registered? <button type="button" onClick={() => { setMode("signin"); setError(null); setNotice(null); }}>Sign in ↗</button></>}
      </div>
    </div>
    <div className="conway-auth-bottom"><span>Dashboard access requires an active subscription.</span><Link href="/pricing">Explore plans ↗</Link></div>
  </section>;
}

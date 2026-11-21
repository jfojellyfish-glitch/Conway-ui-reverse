import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { subscriptionStatus } from "@/lib/subscription";
import { links } from "@/lib/site";

/** PKCE callback; exchange auth code and check paid access before redirect. */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const rawNext = url.searchParams.get("next");
  const next = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("\\")
    ? rawNext : links.dashboard;
  // Use a configured public origin for Render reverse-proxy deployments.
  const origin = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const fail = (reason: string) => NextResponse.redirect(new URL("/login?error=" + reason, origin));
  const code = url.searchParams.get("code");
  if (!code) return fail("auth");
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return fail("auth");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return fail("auth");
    const status = await subscriptionStatus(supabase, user.id);
    if (status !== "active") {
      await supabase.auth.signOut();
      return fail(status === "inactive" ? "inactive" : "subscription");
    }
    return NextResponse.redirect(new URL(next, origin));
  } catch {
    return fail("auth");
  }
}

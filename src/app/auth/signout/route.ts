import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: NextRequest) {
  try { await (await createClient()).auth.signOut(); } catch { /* No active session. */ }
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || request.url), { status: 303 });
}

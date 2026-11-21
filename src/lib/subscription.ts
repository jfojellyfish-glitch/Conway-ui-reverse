import type { SupabaseClient } from "@supabase/supabase-js";
export type SubscriptionStatus = "active" | "inactive" | "unavailable";
/** Fail closed when subscription data is missing or unavailable. */
export async function subscriptionStatus(supabase: SupabaseClient, userId: string): Promise<SubscriptionStatus> {
  const { data, error } = await supabase.from("profiles")
    .select("is_active, active_until").eq("id", userId).maybeSingle();
  if (error) { console.error("Subscription verification unavailable:", error.message); return "unavailable"; }
  return data?.is_active && (!data.active_until || new Date(data.active_until).getTime() > Date.now())
    ? "active" : "inactive";
}

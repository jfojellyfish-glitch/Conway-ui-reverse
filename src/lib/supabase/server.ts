import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
export async function createClient() {
  const { url, key } = getSupabaseConfig();
  const jar = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() { return jar.getAll(); },
      setAll(toSet) { toSet.forEach(({name,value,options}) => jar.set(name,value,options)); },
    },
  });
}

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = cookies();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  // Try to get the auth token from various cookie names Supabase might use
  const possibleCookies = [
    "sb-access-token",
    "sb-refresh-token", 
    "supabase-auth-token",
  ];
  
  let authToken = null;
  for (const cookieName of possibleCookies) {
    const cookie = cookieStore.get(cookieName);
    if (cookie?.value) {
      authToken = cookie.value;
      break;
    }
  }
  
  // Also check for cookies that start with sb-
  const allCookies = cookieStore.getAll();
  const sbCookie = allCookies.find(c => c.name.startsWith("sb-") && c.name.includes("-token"));
  if (sbCookie?.value) {
    authToken = sbCookie.value;
  }
  
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: authToken 
        ? { Authorization: `Bearer ${authToken}` }
        : {},
    },
  });
  
  return supabase;
}
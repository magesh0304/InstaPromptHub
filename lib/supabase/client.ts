import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-project.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY2stcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2NDk2ODAwLCJleHAiOjIwMzIwNTI4MDB9.mockAnonKey"
  );
}

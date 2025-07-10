import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import type { Database } from "./types.ts";

export const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Add helper functions here

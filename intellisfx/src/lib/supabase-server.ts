import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { env } from '@/config/env'

export function createClient() {
  return supabaseCreateClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export const supabase = createClient()

// Add helper functions here
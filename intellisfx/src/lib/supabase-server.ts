import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/api'

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Add helper functions here
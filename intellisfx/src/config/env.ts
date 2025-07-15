const envSchema = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
};

for (const [key, value] of Object.entries(envSchema)) {
  if (!value) throw new Error(`Missing environment variable: ${key}`);
}

export const env = envSchema as Record<keyof typeof envSchema, string>;
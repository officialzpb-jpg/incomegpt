import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    // Server/build time — create a dummy client to prevent crashes
    // Real client will be created when env vars are available at runtime
    console.warn('Supabase env vars missing — using placeholder for build')
  }
}

export const supabase = createClient(
  supabaseUrl || 'http://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

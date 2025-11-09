import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerClient() {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Cookie setting pode falhar em middleware ou server components
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // Cookie removal pode falhar em middleware ou server components
        }
      },
    },
  })
}

export async function getServerSession() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function requireAuth() {
  const session = await getServerSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}


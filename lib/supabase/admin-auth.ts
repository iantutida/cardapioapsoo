import { createServerClient } from '@/lib/supabase/server'

export async function checkAdminAuth(supabase: ReturnType<typeof createServerClient>) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { authorized: false, status: 401, message: 'Não autenticado', userId: null }
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error('admin-auth:profile-error', profileError)
      return { authorized: false, status: 403, message: 'Erro ao verificar permissões', userId: null }
    }

    if (!profile || profile.role !== 'admin') {
      return { authorized: false, status: 403, message: 'Acesso negado', userId: null }
    }

    return { authorized: true, userId: user.id }
  } catch (error) {
    console.error('admin-auth:error', error)
    return { authorized: false, status: 500, message: 'Erro interno', userId: null }
  }
}


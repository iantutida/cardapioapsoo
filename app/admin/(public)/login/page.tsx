'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { LoginForm } from '@/src/components/admin/LoginForm'

export default function LoginPage() {
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    if (hasCheckedRef.current) return

    const run = async () => {
      try {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
        const unauthorized = params?.get('unauthorized') === '1'

        if (unauthorized) {
          hasCheckedRef.current = true
          await supabase.auth.signOut()
          params?.delete('unauthorized')
          if (typeof window !== 'undefined') {
            const newSearch = params && params.toString() ? `?${params.toString()}` : ''
            window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`)
          }
          return
        }

        // Verificar se já está autenticado usando getUser() para validação real
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (!userError && user) {
          // Verificar se é admin antes de redirecionar
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle()

          if (profile?.role === 'admin') {
            hasCheckedRef.current = true
            const redirectParam = typeof window !== 'undefined'
              ? new URLSearchParams(window.location.search).get('redirect')
              : null
            const redirectUrl = redirectParam || '/admin/dashboard'
            // Usar replaceState para evitar loop e depois fazer redirect
            window.history.replaceState({}, '', redirectUrl)
            window.location.href = redirectUrl
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
        hasCheckedRef.current = false
      }
    }

    run()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <p className="mt-2 text-sm text-gray-600">Faça login para continuar</p>
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}



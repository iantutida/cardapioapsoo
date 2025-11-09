import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/src/components/admin/AdminHeader'
import { AdminSidebar } from '@/src/components/admin/AdminSidebar'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    redirect('/admin/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader userName={user.email || undefined} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}



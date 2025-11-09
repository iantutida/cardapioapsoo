import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acesso à página de login sem verificação
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Para outras rotas admin, deixar o layout verificar a sessão
  // O layout do admin já faz verificação completa de autenticação e role
  // Removemos a verificação de cookie aqui para evitar loops e confiar no layout
  // O layout Server Component é mais confiável para verificar autenticação
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}


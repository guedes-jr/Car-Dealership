import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { getUserFromToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Rotas que requerem autenticação de administrador
  const adminRoutes = ["/admin", "/admin/veiculos", "/admin/clientes", "/admin/mensagens", "/admin/vendas"]

  // Verificar se a rota atual é uma rota de administrador
  const isAdminRoute = adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Se for uma rota de administrador, verificar a autenticação
  if (isAdminRoute) {
    const token = request.cookies.get("token")?.value

    // Se não houver token, redirecionar para a página de login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Verificar se o token é válido e se o usuário é um administrador
    const user = await getUserFromToken(token)

    if (!user || user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


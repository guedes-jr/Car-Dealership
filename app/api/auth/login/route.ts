import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyPassword, createJWT } from "@/lib/auth"

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validação básica
    if (!email || !password) {
      return NextResponse.json({ message: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Buscar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
    }

    // Verificar a senha
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
    }

    // Criar o token JWT
    const token = await createJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Definir o cookie
    const response = NextResponse.json({
      message: "Login realizado com sucesso",
      user: { id: user.id, email: user.email, role: user.role },
    })

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return response
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
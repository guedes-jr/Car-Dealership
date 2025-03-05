import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = cookies().get("token")

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 })
    }

    const decoded = await verifyJWT(token.value)

    if (!decoded) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
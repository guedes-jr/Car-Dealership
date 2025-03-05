import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Remover o cookie de autenticação
    cookies().delete("token")

    return NextResponse.json({
      message: "Logout realizado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}


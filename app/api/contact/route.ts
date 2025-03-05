import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json({ message: "Nome, email e mensagem são obrigatórios" }, { status: 400 })
    }

    // Criar a mensagem
    const contactMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    })

    return NextResponse.json({ message: "Mensagem enviada com sucesso", id: contactMessage.id }, { status: 201 })
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}


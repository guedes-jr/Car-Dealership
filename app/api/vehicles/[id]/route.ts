import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!vehicle) {
      return NextResponse.json({ message: "Veículo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ vehicle })
  } catch (error) {
    console.error("Erro ao buscar veículo:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 })
    }

    const data = await request.json()

    // Verificar se o veículo existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!existingVehicle) {
      return NextResponse.json({ message: "Veículo não encontrado" }, { status: 404 })
    }

    // Atualizar o veículo
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data,
    })

    return NextResponse.json({
      message: "Veículo atualizado com sucesso",
      vehicle,
    })
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 })
    }

    // Verificar se o veículo existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!existingVehicle) {
      return NextResponse.json({ message: "Veículo não encontrado" }, { status: 404 })
    }

    // Excluir o veículo
    await prisma.vehicle.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Veículo excluído com sucesso",
    })
  } catch (error) {
    console.error("Erro ao excluir veículo:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}


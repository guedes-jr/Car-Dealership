import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parâmetros de filtro
    const brand = searchParams.get("brand")
    const minYear = searchParams.get("minYear") ? Number.parseInt(searchParams.get("minYear")!) : undefined
    const maxYear = searchParams.get("maxYear") ? Number.parseInt(searchParams.get("maxYear")!) : undefined
    const minPrice = searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined
    const fuel = searchParams.get("fuel")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured") === "true"

    // Parâmetros de paginação
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
    const skip = (page - 1) * limit

    // Parâmetros de ordenação
    const orderBy = searchParams.get("orderBy") || "createdAt"
    const order = searchParams.get("order") || "desc"

    // Construir o filtro
    const where: any = {}

    if (brand) {
      where.title = { contains: brand, mode: "insensitive" }
    }

    if (minYear || maxYear) {
      where.year = {}
      if (minYear) where.year.gte = minYear
      if (maxYear) where.year.lte = maxYear
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = minPrice
      if (maxPrice) where.price.lte = maxPrice
    }

    if (fuel) {
      where.fuel = fuel
    }

    if (status) {
      where.status = status
    }

    if (searchParams.has("featured")) {
      where.featured = featured
    }

    // Buscar os veículos
    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { [orderBy]: order },
      skip,
      take: limit,
    })

    // Contar o total de veículos
    const total = await prisma.vehicle.count({ where })

    return NextResponse.json({
      vehicles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar veículos:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data  }
  ,
  status: 500
  )
}
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validação básica
    if (!data.title || !data.price || !data.year) {
      return NextResponse.json({ message: "Título, preço e ano são obrigatórios" }, { status: 400 })
    }

    // Criar o veículo
    const vehicle = await prisma.vehicle.create({
      data: {
        title: data.title,
        description: data.description || "",
        year: data.year,
        price: data.price,
        mileage: data.mileage || 0,
        fuel: data.fuel || "Flex",
        transmission: data.transmission || "Manual",
        color: data.color || "",
        doors: data.doors || 4,
        features: data.features || [],
        images: data.images || [],
        featured: data.featured || false,
        status: data.status || "AVAILABLE",
      },
    })

    return NextResponse.json({ message: "Veículo criado com sucesso", vehicle }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar veículo:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}


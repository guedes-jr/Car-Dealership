import Link from "next/link"
import { Calendar, Fuel, Gauge } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample vehicle data
const featuredVehicles = [
  {
    id: 1,
    title: "Toyota Corolla XEi 2.0",
    year: 2022,
    price: 129900,
    mileage: 32000,
    fuel: "Flex",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    title: "Honda Civic EXL",
    year: 2021,
    price: 139900,
    mileage: 45000,
    fuel: "Flex",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    title: "Volkswagen T-Cross Highline",
    year: 2023,
    price: 159900,
    mileage: 15000,
    fuel: "Flex",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 4,
    title: "Chevrolet Tracker Premier",
    year: 2022,
    price: 145900,
    mileage: 28000,
    fuel: "Flex",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
]

export default function FeaturedVehicles() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredVehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden">
          <div className="relative">
            <img src={vehicle.image || "/placeholder.svg"} alt={vehicle.title} className="w-full h-48 object-cover" />
            {vehicle.featured && <Badge className="absolute top-2 right-2 bg-primary">Destaque</Badge>}
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1">{vehicle.title}</h3>
            <p className="text-2xl font-bold text-primary mb-4">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vehicle.price)}
            </p>
            <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="h-4 w-4" />
                <span>{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="h-4 w-4" />
                <span>{vehicle.fuel}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link
              href={`/veiculos/${vehicle.id}`}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Ver Detalhes
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


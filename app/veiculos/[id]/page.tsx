import Link from "next/link"
import { Calendar, ChevronLeft, Fuel, Gauge, Share2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedVehicles from "@/components/featured-vehicles"

// Sample vehicle data (expanded from previous components)
const vehicles = [
  {
    id: 1,
    title: "Toyota Corolla XEi 2.0",
    description:
      "Toyota Corolla XEi 2.0 Flex 16V Aut. em excelente estado. Único dono, todas as revisões feitas na concessionária, IPVA 2023 pago. Veículo com baixa quilometragem e muito bem conservado.",
    year: 2022,
    price: 129900,
    mileage: 32000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Prata",
    doors: 4,
    features: [
      "Ar condicionado",
      "Direção elétrica",
      "Vidros elétricos",
      "Travas elétricas",
      "Airbag",
      "Freios ABS",
      "Bancos em couro",
      "Sensor de estacionamento",
      "Câmera de ré",
      "Central multimídia",
      "Bluetooth",
      "Controle de tração",
      "Piloto automático",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
  },
]

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = vehicles.find((v) => v.id === Number.parseInt(params.id)) || vehicles[0]

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/veiculos" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para veículos
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Vehicle Images and Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="relative h-[400px] mb-4 bg-muted rounded-lg overflow-hidden">
              <img
                src={vehicle.images[0] || "/placeholder.svg"}
                alt={vehicle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {vehicle.images.map((image, index) => (
                <div key={index} className="h-24 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.title} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="description">Descrição</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-lg mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marca:</span>
                    <span className="font-medium">Toyota</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modelo:</span>
                    <span className="font-medium">Corolla</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ano:</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Combustível:</span>
                    <span className="font-medium">{vehicle.fuel}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quilometragem:</span>
                    <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Câmbio:</span>
                    <span className="font-medium">{vehicle.transmission}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cor:</span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Portas:</span>
                    <span className="font-medium">{vehicle.doors}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-lg mt-2">
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="description" className="p-4 border rounded-lg mt-2">
              <p className="text-muted-foreground">{vehicle.description}</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Contact and Price Info */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2">{vehicle.title}</h1>
              <p className="text-3xl font-bold text-primary mb-6">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(vehicle.price)}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs text-muted-foreground">Ano</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Gauge className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs text-muted-foreground">KM</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Fuel className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs text-muted-foreground">Combustível</span>
                  <span className="font-medium">{vehicle.fuel}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full">Tenho Interesse</Button>
                <Button variant="outline" className="w-full">
                  Ligar Agora
                </Button>
                <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" /> Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Financiamento</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrada (50%):</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(vehicle.price * 0.5)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parcelas (48x):</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(((vehicle.price * 0.5) / 48) * 1.2)}
                  </span>
                </div>
                <Button className="w-full">Simular Financiamento</Button>
                <p className="text-xs text-muted-foreground text-center">
                  * Valores aproximados. Consulte condições exatas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Vehicles */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Veículos Similares</h2>
        <FeaturedVehicles />
      </div>
    </div>
  )
}


import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import VehicleList from "@/components/vehicle-list"

export default function VehiclesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Nossos Veículos</h1>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Filter className="h-5 w-5" />
            </div>
            <Separator className="mb-6" />

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Marca</h3>
                <div className="space-y-2">
                  {["Toyota", "Honda", "Volkswagen", "Chevrolet", "Ford"].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand.toLowerCase()}`}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor={`brand-${brand.toLowerCase()}`} className="ml-2 text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Ano</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm">De</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">Até</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>2018</option>
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Preço</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm">De</label>
                    <Input type="number" placeholder="R$ Min" />
                  </div>
                  <div>
                    <label className="text-sm">Até</label>
                    <Input type="number" placeholder="R$ Max" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Combustível</h3>
                <div className="space-y-2">
                  {["Flex", "Gasolina", "Diesel", "Elétrico", "Híbrido"].map((fuel) => (
                    <div key={fuel} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fuel-${fuel.toLowerCase()}`}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor={`fuel-${fuel.toLowerCase()}`} className="ml-2 text-sm">
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Listings */}
        <div className="md:col-span-3">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar veículos..." className="pl-8 w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Mais recentes</option>
                    <option>Menor preço</option>
                    <option>Maior preço</option>
                    <option>Menor quilometragem</option>
                    <option>Ano (mais novo)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <VehicleList />
        </div>
      </div>
    </div>
  )
}


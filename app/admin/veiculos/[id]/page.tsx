"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Save, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import AdminLayout from "@/components/admin/admin-layout"
import { vehiclesData } from "@/data/vehicles"

export default function AdminEditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNewVehicle = params.id === "novo"
  const vehicleId = isNewVehicle ? null : Number.parseInt(params.id)

  const [vehicle, setVehicle] = useState({
    id: 0,
    title: "",
    description: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel: "Flex",
    transmission: "Automático",
    color: "",
    doors: 4,
    features: [] as string[],
    images: ["/placeholder.svg?height=400&width=600"],
    featured: false,
    status: "available",
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    if (!isNewVehicle && vehicleId) {
      const foundVehicle = vehiclesData.find((v) => v.id === vehicleId)
      if (foundVehicle) {
        setVehicle(foundVehicle)
      }
    } else if (isNewVehicle) {
      // Set a new ID for a new vehicle (in a real app, this would be handled by the backend)
      setVehicle({
        ...vehicle,
        id: Math.max(...vehiclesData.map((v) => v.id)) + 1,
      })
    }
  }, [isNewVehicle, vehicleId, vehicle])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setVehicle({
      ...vehicle,
      [name]:
        name === "price" || name === "mileage" || name === "year" || name === "doors" ? Number.parseInt(value) : value,
    })
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      router.push("/admin/veiculos")
    }, 1000)
  }

  const handleDelete = () => {
    // Simulate API call
    setTimeout(() => {
      setDeleteDialogOpen(false)
      router.push("/admin/veiculos")
    }, 500)
  }

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setVehicle({
        ...vehicle,
        features: [...vehicle.features, value],
      })
    } else {
      setVehicle({
        ...vehicle,
        features: vehicle.features.filter((feature) => feature !== value),
      })
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/admin/veiculos"
                className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Voltar
              </Link>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isNewVehicle ? "Adicionar Novo Veículo" : `Editar Veículo: ${vehicle.title}`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!isNewVehicle && (
              <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Excluir
              </Button>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Preencha as informações básicas do veículo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Anúncio</Label>
                    <Input
                      id="title"
                      name="title"
                      value={vehicle.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Toyota Corolla XEi 2.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={vehicle.price}
                      onChange={handleInputChange}
                      placeholder="Ex: 120000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={vehicle.year}
                      onChange={handleInputChange}
                      placeholder="Ex: 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Quilometragem</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={vehicle.mileage}
                      onChange={handleInputChange}
                      placeholder="Ex: 30000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      name="status"
                      value={vehicle.status}
                      onValueChange={(value) => setVehicle({ ...vehicle, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponível</SelectItem>
                        <SelectItem value="reserved">Reservado</SelectItem>
                        <SelectItem value="sold">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={vehicle.description}
                    onChange={handleInputChange}
                    placeholder="Descreva o veículo em detalhes..."
                    rows={5}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={vehicle.featured}
                    onChange={(e) => setVehicle({ ...vehicle, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Destacar este veículo na página inicial</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Veículo</CardTitle>
                <CardDescription>Preencha as especificações técnicas do veículo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel">Combustível</Label>
                    <Select
                      name="fuel"
                      value={vehicle.fuel}
                      onValueChange={(value) => setVehicle({ ...vehicle, fuel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o combustível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Flex">Flex</SelectItem>
                        <SelectItem value="Gasolina">Gasolina</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Elétrico">Elétrico</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Câmbio</Label>
                    <Select
                      name="transmission"
                      value={vehicle.transmission}
                      onValueChange={(value) => setVehicle({ ...vehicle, transmission: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o câmbio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automático">Automático</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                        <SelectItem value="Automatizado">Automatizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Cor</Label>
                    <Input
                      id="color"
                      name="color"
                      value={vehicle.color}
                      onChange={handleInputChange}
                      placeholder="Ex: Prata"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doors">Portas</Label>
                    <Input
                      id="doors"
                      name="doors"
                      type="number"
                      value={vehicle.doors}
                      onChange={handleInputChange}
                      placeholder="Ex: 4"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>Características</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
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
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          value={feature}
                          checked={vehicle.features.includes(feature)}
                          onChange={handleFeatureChange}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Veículo</CardTitle>
                <CardDescription>Adicione imagens do veículo. A primeira imagem será usada como capa.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {vehicle.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Imagem ${index + 1}`}
                        className="h-40 w-full object-cover rounded-md border"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Capa
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-40 border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Adicionar imagem</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Dicas para fotos de qualidade:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Use fotos com boa iluminação e alta resolução</li>
                    <li>Fotografe o veículo de vários ângulos (frente, lateral, traseira)</li>
                    <li>Inclua fotos do interior, painel e porta-malas</li>
                    <li>Destaque detalhes importantes e diferenciais do veículo</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}


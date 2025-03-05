"use client"

import { useState } from "react"
import { Calendar, Check, Download, Eye, FileText, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import AdminLayout from "@/components/admin/admin-layout"

// Dados de exemplo para vendas
const salesData = [
  {
    id: "1",
    vehicle: "Toyota Corolla XEi 2.0",
    vehicleId: 1,
    buyer: "Maria Silva",
    buyerId: "1",
    agent: "Carlos Vendedor",
    agentId: "3",
    price: 129900,
    date: "2023-12-10T14:30:00Z",
    status: "COMPLETED",
    paymentMethod: "Financiamento",
    notes: "Financiamento aprovado pelo Banco Santander em 48x.",
  },
  {
    id: "2",
    vehicle: "Honda Civic EXL",
    vehicleId: 2,
    buyer: "João Oliveira",
    buyerId: "2",
    agent: "Carlos Vendedor",
    agentId: "3",
    price: 139900,
    date: "2023-12-15T10:45:00Z",
    status: "PROCESSING",
    paymentMethod: "À vista",
    notes: "Cliente aguardando transferência bancária ser processada.",
  },
  {
    id: "3",
    vehicle: "Volkswagen T-Cross Highline",
    vehicleId: 3,
    buyer: "Ana Santos",
    buyerId: "3",
    agent: "Mariana Vendedora",
    agentId: "4",
    price: 159900,
    date: "2023-12-18T16:20:00Z",
    status: "COMPLETED",
    paymentMethod: "Financiamento",
    notes: "Financiamento aprovado pelo Banco Itaú em 60x.",
  },
  {
    id: "4",
    vehicle: "Jeep Compass Limited",
    vehicleId: 5,
    buyer: "Fernanda Lima",
    buyerId: "5",
    agent: "Mariana Vendedora",
    agentId: "4",
    price: 169900,
    date: "2023-12-20T11:15:00Z",
    status: "PENDING",
    paymentMethod: "Financiamento",
    notes: "Aguardando aprovação do financiamento pelo banco.",
  },
  {
    id: "5",
    vehicle: "Fiat Pulse Impetus",
    vehicleId: 7,
    buyer: "Juliana Costa",
    buyerId: "7",
    agent: "Carlos Vendedor",
    agentId: "3",
    price: 119900,
    date: "2023-12-22T09:30:00Z",
    status: "COMPLETED",
    paymentMethod: "À vista",
    notes: "Pagamento realizado via PIX.",
  },
  {
    id: "6",
    vehicle: "Chevrolet Tracker Premier",
    vehicleId: 4,
    buyer: "Marcelo Souza",
    buyerId: "8",
    agent: "Carlos Vendedor",
    agentId: "3",
    price: 145900,
    date: "2023-12-23T15:40:00Z",
    status: "CANCELLED",
    paymentMethod: "Financiamento",
    notes: "Cliente desistiu da compra após financiamento ser negado.",
  },
]

export default function AdminSalesPage() {
  const [sales, setSales] = useState(salesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null)
  const [viewSaleDialogOpen, setViewSaleDialogOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<(typeof salesData)[0] | null>(null)
  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState(false)

  const filteredSales = sales.filter(
    (sale) =>
      sale.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.includes(searchTerm),
  )

  const handleDeleteSale = () => {
    if (saleToDelete !== null) {
      setSales(sales.filter((sale) => sale.id !== saleToDelete))
      setDeleteDialogOpen(false)
      setSaleToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setSaleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const viewSale = (sale: (typeof salesData)[0]) => {
    setSelectedSale(sale)
    setViewSaleDialogOpen(true)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "PROCESSING":
        return "bg-blue-500"
      case "PENDING":
        return "bg-yellow-500"
      case "CANCELLED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Concluída"
      case "PROCESSING":
        return "Em processamento"
      case "PENDING":
        return "Pendente"
      case "CANCELLED":
        return "Cancelada"
      default:
        return status
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Vendas</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setAddSaleDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Registrar Venda
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendas</CardTitle>
            <CardDescription>Gerencie as vendas realizadas na sua loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar vendas..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[180px]">
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="COMPLETED">Concluídas</SelectItem>
                    <SelectItem value="PROCESSING">Em processamento</SelectItem>
                    <SelectItem value="PENDING">Pendentes</SelectItem>
                    <SelectItem value="CANCELLED">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[180px]">
                <label className="text-sm font-medium mb-2 block">Período</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mês</SelectItem>
                    <SelectItem value="year">Este ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        Nenhuma venda encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.vehicle}</TableCell>
                        <TableCell>{sale.buyer}</TableCell>
                        <TableCell>{sale.agent}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(sale.price)}
                        </TableCell>
                        <TableCell>{new Date(sale.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusBadgeColor(sale.status)}`}></div>
                            {getStatusText(sale.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => viewSale(sale)}>
                                <Eye className="mr-2 h-4 w-4" /> Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" /> Gerar contrato
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Exportar PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => confirmDelete(sale.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{filteredSales.length}</strong> de <strong>{sales.length}</strong> vendas
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este registro de venda? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteSale}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para visualizar venda */}
      <Dialog open={viewSaleDialogOpen} onOpenChange={setViewSaleDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda #{selectedSale?.id}</DialogTitle>
            <DialogDescription>
              Venda realizada em {selectedSale && new Date(selectedSale.date).toLocaleDateString("pt-BR")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações do Veículo</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Veículo:</span>
                    <span className="text-sm font-medium">{selectedSale?.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Valor:</span>
                    <span className="text-sm font-medium">
                      {selectedSale &&
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(selectedSale.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Forma de Pagamento:</span>
                    <span className="text-sm font-medium">{selectedSale?.paymentMethod}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações da Venda</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cliente:</span>
                    <span className="text-sm font-medium">{selectedSale?.buyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Vendedor:</span>
                    <span className="text-sm font-medium">{selectedSale?.agent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <span className="text-sm font-medium">
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-1.5 ${
                            selectedSale && getStatusBadgeColor(selectedSale.status)
                          }`}
                        ></div>
                        {selectedSale && getStatusText(selectedSale.status)}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Observações</h3>
              <p className="text-sm">{selectedSale?.notes}</p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setViewSaleDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Gerar contrato
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para adicionar venda */}
      <Dialog open={addSaleDialogOpen} onOpenChange={setAddSaleDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Registrar Nova Venda</DialogTitle>
            <DialogDescription>Preencha os dados abaixo para registrar uma nova venda.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Veículo</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Toyota Corolla XEi 2.0</SelectItem>
                    <SelectItem value="2">Honda Civic EXL</SelectItem>
                    <SelectItem value="3">Volkswagen T-Cross Highline</SelectItem>
                    <SelectItem value="4">Chevrolet Tracker Premier</SelectItem>
                    <SelectItem value="5">Jeep Compass Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Maria Silva</SelectItem>
                    <SelectItem value="2">João Oliveira</SelectItem>
                    <SelectItem value="3">Ana Santos</SelectItem>
                    <SelectItem value="4">Carlos Pereira</SelectItem>
                    <SelectItem value="5">Fernanda Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vendedor</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Carlos Vendedor</SelectItem>
                    <SelectItem value="4">Mariana Vendedora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data da Venda</label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-8" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Valor (R$)</label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Forma de Pagamento</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">À vista</SelectItem>
                    <SelectItem value="financing">Financiamento</SelectItem>
                    <SelectItem value="leasing">Leasing</SelectItem>
                    <SelectItem value="consortium">Consórcio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="PENDING">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="PROCESSING">Em processamento</SelectItem>
                  <SelectItem value="COMPLETED">Concluída</SelectItem>
                  <SelectItem value="CANCELLED">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Observações</label>
              <Input placeholder="Observações sobre a venda" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSaleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setAddSaleDialogOpen(false)}>
              <Check className="mr-2 h-4 w-4" /> Registrar Venda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}


"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, Plus, Search, Trash, UserPlus } from "lucide-react"

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

// Dados de exemplo para clientes
const clientsData = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@exemplo.com",
    phone: "(11) 98765-4321",
    createdAt: "2023-05-15T10:30:00Z",
    purchases: 3,
    status: "active",
  },
  {
    id: "2",
    name: "João Oliveira",
    email: "joao@exemplo.com",
    phone: "(11) 97654-3210",
    createdAt: "2023-06-20T14:45:00Z",
    purchases: 1,
    status: "active",
  },
  {
    id: "3",
    name: "Ana Santos",
    email: "ana@exemplo.com",
    phone: "(11) 96543-2109",
    createdAt: "2023-07-10T09:15:00Z",
    purchases: 2,
    status: "active",
  },
  {
    id: "4",
    name: "Carlos Pereira",
    email: "carlos@exemplo.com",
    phone: "(11) 95432-1098",
    createdAt: "2023-08-05T16:20:00Z",
    purchases: 0,
    status: "inactive",
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda@exemplo.com",
    phone: "(11) 94321-0987",
    createdAt: "2023-09-12T11:10:00Z",
    purchases: 1,
    status: "active",
  },
  {
    id: "6",
    name: "Roberto Almeida",
    email: "roberto@exemplo.com",
    phone: "(11) 93210-9876",
    createdAt: "2023-10-18T13:25:00Z",
    purchases: 0,
    status: "inactive",
  },
  {
    id: "7",
    name: "Juliana Costa",
    email: "juliana@exemplo.com",
    phone: "(11) 92109-8765",
    createdAt: "2023-11-22T15:40:00Z",
    purchases: 4,
    status: "active",
  },
  {
    id: "8",
    name: "Marcelo Souza",
    email: "marcelo@exemplo.com",
    phone: "(11) 91098-7654",
    createdAt: "2023-12-30T10:05:00Z",
    purchases: 2,
    status: "active",
  },
]

export default function AdminClientsPage() {
  const [clients, setClients] = useState(clientsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  )

  const handleDeleteClient = () => {
    if (clientToDelete !== null) {
      setClients(clients.filter((client) => client.id !== clientToDelete))
      setDeleteDialogOpen(false)
      setClientToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setClientToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleAddClient = () => {
    const newId = (Math.max(...clients.map((client) => Number.parseInt(client.id))) + 1).toString()

    setClients([
      ...clients,
      {
        id: newId,
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        createdAt: new Date().toISOString(),
        purchases: 0,
        status: "active",
      },
    ])

    setAddClientDialogOpen(false)
    setNewClient({
      name: "",
      email: "",
      phone: "",
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Clientes</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setAddClientDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Adicionar Cliente
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gerencie os clientes da sua loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar clientes..."
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
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[180px]">
                <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Mais recentes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigos</SelectItem>
                    <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                    <SelectItem value="purchases">Compras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead>Compras</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        Nenhum cliente encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{new Date(client.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{client.purchases}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                client.status === "active" ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                            {client.status === "active" ? "Ativo" : "Inativo"}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Plus className="mr-2 h-4 w-4" /> Registrar compra
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => confirmDelete(client.id)}
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
                Mostrando <strong>{filteredClients.length}</strong> de <strong>{clients.length}</strong> clientes
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
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
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para adicionar cliente */}
      <Dialog open={addClientDialogOpen} onOpenChange={setAddClientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Cliente</DialogTitle>
            <DialogDescription>Preencha os dados abaixo para adicionar um novo cliente.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome completo</label>
              <Input
                placeholder="Nome do cliente"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input
                placeholder="(00) 00000-0000"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddClientDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddClient}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}


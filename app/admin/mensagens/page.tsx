"use client"

import { useState } from "react"
import { Archive, Check, Eye, MoreHorizontal, Reply, Search, Trash } from "lucide-react"

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

// Dados de exemplo para mensagens
const messagesData = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@exemplo.com",
    phone: "(11) 98765-4321",
    subject: "Dúvida sobre financiamento",
    message:
      "Olá, gostaria de saber quais são as opções de financiamento disponíveis para o Toyota Corolla XEi 2.0. Vocês trabalham com quais bancos? Qual a taxa de juros média? Obrigado.",
    read: false,
    createdAt: "2023-12-15T10:30:00Z",
  },
  {
    id: "2",
    name: "João Oliveira",
    email: "joao@exemplo.com",
    phone: "(11) 97654-3210",
    subject: "Agendamento de test drive",
    message:
      "Bom dia, gostaria de agendar um test drive para o Honda Civic EXL para o próximo sábado pela manhã. É possível? Aguardo retorno.",
    read: true,
    createdAt: "2023-12-16T14:45:00Z",
  },
  {
    id: "3",
    name: "Ana Santos",
    email: "ana@exemplo.com",
    phone: "(11) 96543-2109",
    subject: "Disponibilidade de veículo",
    message:
      "Olá, vi no site de vocês o Jeep Compass Limited 2021. Ele ainda está disponível? Qual o menor valor à vista? Obrigada.",
    read: false,
    createdAt: "2023-12-17T09:15:00Z",
  },
  {
    id: "4",
    name: "Carlos Pereira",
    email: "carlos@exemplo.com",
    phone: "(11) 95432-1098",
    subject: "Avaliação do meu veículo",
    message:
      "Boa tarde, gostaria de saber como funciona o processo de avaliação para venda do meu veículo. Tenho um Ford Ka 2019 com 45.000 km, único dono, todas as revisões em dia. Como proceder?",
    read: true,
    createdAt: "2023-12-18T16:20:00Z",
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda@exemplo.com",
    phone: "(11) 94321-0987",
    subject: "Documentação para financiamento",
    message:
      "Prezados, quais documentos preciso levar para dar entrada no financiamento? Já tenho uma aprovação prévia do Banco Santander. Obrigada.",
    read: false,
    createdAt: "2023-12-19T11:10:00Z",
  },
  {
    id: "6",
    name: "Roberto Almeida",
    email: "roberto@exemplo.com",
    phone: "(11) 93210-9876",
    subject: "Reclamação sobre atendimento",
    message:
      "Venho por meio deste expressar minha insatisfação com o atendimento recebido no dia 15/12. Aguardei por mais de 1 hora e não fui atendido adequadamente. Solicito um retorno urgente.",
    read: true,
    createdAt: "2023-12-20T13:25:00Z",
  },
  {
    id: "7",
    name: "Juliana Costa",
    email: "juliana@exemplo.com",
    phone: "(11) 92109-8765",
    subject: "Peças e acessórios",
    message:
      "Bom dia, vocês vendem peças e acessórios originais? Preciso de um jogo de tapetes e capa para o banco do motorista para um Toyota Corolla 2022. Aguardo informações sobre valores.",
    read: false,
    createdAt: "2023-12-21T15:40:00Z",
  },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(messagesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const [viewMessageDialogOpen, setViewMessageDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<(typeof messagesData)[0] | null>(null)

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteMessage = () => {
    if (messageToDelete !== null) {
      setMessages(messages.filter((message) => message.id !== messageToDelete))
      setDeleteDialogOpen(false)
      setMessageToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setMessageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const viewMessage = (message: (typeof messagesData)[0]) => {
    // Marcar como lida
    if (!message.read) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
    }
    setSelectedMessage(message)
    setViewMessageDialogOpen(true)
  }

  const markAsRead = (id: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, read: true } : message)))
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Mensagens</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" /> Arquivar selecionadas
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Caixa de Entrada</CardTitle>
            <CardDescription>Gerencie as mensagens recebidas dos clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar mensagens..."
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
                    <SelectItem value="unread">Não lidas</SelectItem>
                    <SelectItem value="read">Lidas</SelectItem>
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
                    <SelectItem value="oldest">Mais antigas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Remetente</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhuma mensagem encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id} className={message.read ? "" : "bg-primary/5 font-medium"}>
                        <TableCell>
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        </TableCell>
                        <TableCell>
                          {!message.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{message.name}</div>
                          <div className="text-sm text-muted-foreground">{message.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="cursor-pointer" onClick={() => viewMessage(message)}>
                            {message.subject}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(message.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
                              <DropdownMenuItem onClick={() => viewMessage(message)}>
                                <Eye className="mr-2 h-4 w-4" /> Ver mensagem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="mr-2 h-4 w-4" /> Responder
                              </DropdownMenuItem>
                              {!message.read && (
                                <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                  <Check className="mr-2 h-4 w-4" /> Marcar como lida
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => confirmDelete(message.id)}
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
                Mostrando <strong>{filteredMessages.length}</strong> de <strong>{messages.length}</strong> mensagens
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
              Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para visualizar mensagem */}
      <Dialog open={viewMessageDialogOpen} onOpenChange={setViewMessageDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              De: {selectedMessage?.name} ({selectedMessage?.email})
              <br />
              Telefone: {selectedMessage?.phone}
              <br />
              Data:{" "}
              {selectedMessage &&
                new Date(selectedMessage.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 border-t border-b">
            <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setViewMessageDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              <Reply className="mr-2 h-4 w-4" /> Responder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}


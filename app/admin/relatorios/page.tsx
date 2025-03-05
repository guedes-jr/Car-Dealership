"use client"

import { useState } from "react"
import { Calendar, Download, FileText, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "@/components/admin/admin-layout"
import { SalesOverviewChart } from "@/components/admin/sales-overview"
import { InventoryOverviewChart } from "@/components/admin/inventory-overview"

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("sales")

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sales" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Defina os filtros para gerar o relatório.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mês</SelectItem>
                      <SelectItem value="quarter">Este trimestre</SelectItem>
                      <SelectItem value="year">Este ano</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data inicial</label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data final</label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agrupar por</label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Dia</SelectItem>
                      <SelectItem value="week">Semana</SelectItem>
                      <SelectItem value="month">Mês</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {activeTab === "sales" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendedor</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="3">Carlos Vendedor</SelectItem>
                        <SelectItem value="4">Mariana Vendedora</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Forma de Pagamento</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="cash">À vista</SelectItem>
                        <SelectItem value="financing">Financiamento</SelectItem>
                        <SelectItem value="leasing">Leasing</SelectItem>
                        <SelectItem value="consortium">Consórcio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {activeTab === "inventory" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Marca</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="volkswagen">Volkswagen</SelectItem>
                        <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        <SelectItem value="jeep">Jeep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="AVAILABLE">Disponível</SelectItem>
                        <SelectItem value="RESERVED">Reservado</SelectItem>
                        <SelectItem value="SOLD">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ano</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Vendas</CardTitle>
                <CardDescription>Visão geral das vendas realizadas no período selecionado.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total de Vendas</div>
                      <div className="text-2xl font-bold mt-1">12</div>
                      <div className="text-xs text-muted-foreground mt-1">+8% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Receita Total</div>
                      <div className="text-2xl font-bold mt-1">R$ 1.2M</div>
                      <div className="text-xs text-muted-foreground mt-1">+12% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Ticket Médio</div>
                      <div className="text-2xl font-bold mt-1">R$ 100K</div>
                      <div className="text-xs text-muted-foreground mt-1">+3% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Taxa de Conversão</div>
                      <div className="text-2xl font-bold mt-1">24%</div>
                      <div className="text-xs text-muted-foreground mt-1">+2% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[400px]">
                  <SalesOverviewChart />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Detalhamento de Vendas</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Veículo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Vendedor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Valor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(2023, 11, 20 - index).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {
                                [
                                  "Toyota Corolla XEi 2.0",
                                  "Honda Civic EXL",
                                  "Volkswagen T-Cross Highline",
                                  "Jeep Compass Limited",
                                  "Fiat Pulse Impetus",
                                ][index]
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {["Maria Silva", "João Oliveira", "Ana Santos", "Fernanda Lima", "Juliana Costa"][index]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {index % 2 === 0 ? "Carlos Vendedor" : "Mariana Vendedora"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([129900, 139900, 159900, 169900, 119900][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <div
                                  className={`h-2 w-2 rounded-full mr-1.5 ${
                                    ["bg-green-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-green-500"][
                                      index
                                    ]
                                  }`}
                                ></div>
                                {["Concluída", "Em processamento", "Concluída", "Pendente", "Concluída"][index]}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Estoque</CardTitle>
                <CardDescription>Visão geral do estoque de veículos.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total em Estoque</div>
                      <div className="text-2xl font-bold mt-1">42</div>
                      <div className="text-xs text-muted-foreground mt-1">+2 veículos em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Valor do Estoque</div>
                      <div className="text-2xl font-bold mt-1">R$ 4.8M</div>
                      <div className="text-xs text-muted-foreground mt-1">+5% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Idade Média</div>
                      <div className="text-2xl font-bold mt-1">1.8 anos</div>
                      <div className="text-xs text-muted-foreground mt-1">-0.2 anos em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Giro de Estoque</div>
                      <div className="text-2xl font-bold mt-1">28 dias</div>
                      <div className="text-xs text-muted-foreground mt-1">-3 dias em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[400px]">
                  <InventoryOverviewChart />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Detalhamento do Estoque</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Veículo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Ano
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Preço
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Dias em Estoque
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {
                                [
                                  "Toyota Corolla XEi 2.0",
                                  "Honda Civic EXL",
                                  "Volkswagen T-Cross Highline",
                                  "Chevrolet Tracker Premier",
                                  "Jeep Compass Limited",
                                ][index]
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {[2022, 2021, 2023, 2022, 2021][index]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([129900, 139900, 159900, 145900, 169900][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{[15, 30, 7, 45, 60][index]}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <div
                                  className={`h-2 w-2 rounded-full mr-1.5 ${
                                    ["bg-green-500", "bg-green-500", "bg-green-500", "bg-yellow-500", "bg-green-500"][
                                      index
                                    ]
                                  }`}
                                ></div>
                                {["Disponível", "Disponível", "Disponível", "Reservado", "Disponível"][index]}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Clientes</CardTitle>
                <CardDescription>Análise do perfil e comportamento dos clientes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total de Clientes</div>
                      <div className="text-2xl font-bold mt-1">325</div>
                      <div className="text-xs text-muted-foreground mt-1">+18 novos clientes este mês</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Clientes Ativos</div>
                      <div className="text-2xl font-bold mt-1">210</div>
                      <div className="text-xs text-muted-foreground mt-1">65% do total de clientes</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Novos Clientes</div>
                      <div className="text-2xl font-bold mt-1">18</div>
                      <div className="text-xs text-muted-foreground mt-1">+20% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Taxa de Retenção</div>
                      <div className="text-2xl font-bold mt-1">78%</div>
                      <div className="text-xs text-muted-foreground mt-1">+3% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Clientes Mais Ativos</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Telefone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Data de Cadastro
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Compras
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Valor Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {["Juliana Costa", "Maria Silva", "Ana Santos", "Marcelo Souza", "Fernanda Lima"][index]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {
                                [
                                  "juliana@exemplo.com",
                                  "maria@exemplo.com",
                                  "ana@exemplo.com",
                                  "marcelo@exemplo.com",
                                  "fernanda@exemplo.com",
                                ][index]
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {
                                [
                                  "(11) 92109-8765",
                                  "(11) 98765-4321",
                                  "(11) 96543-2109",
                                  "(11) 91098-7654",
                                  "(11) 94321-0987",
                                ][index]
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {["15/05/2021", "10/03/2020", "22/07/2021", "05/01/2022", "18/09/2020"][index]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{[4, 3, 2, 2, 1][index]}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([450000, 380000, 320000, 290000, 170000][index])}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Financeiro</CardTitle>
                <CardDescription>Análise financeira do negócio.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Receita Total</div>
                      <div className="text-2xl font-bold mt-1">R$ 1.2M</div>
                      <div className="text-xs text-muted-foreground mt-1">+12% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Lucro Bruto</div>
                      <div className="text-2xl font-bold mt-1">R$ 240K</div>
                      <div className="text-xs text-muted-foreground mt-1">20% da receita total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Despesas</div>
                      <div className="text-2xl font-bold mt-1">R$ 85K</div>
                      <div className="text-xs text-muted-foreground mt-1">-3% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Lucro Líquido</div>
                      <div className="text-2xl font-bold mt-1">R$ 155K</div>
                      <div className="text-xs text-muted-foreground mt-1">+15% em relação ao mês anterior</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Detalhamento Financeiro</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Mês
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Receita
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Custo de Vendas
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Lucro Bruto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Despesas
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Lucro Líquido
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {["Dezembro", "Novembro", "Outubro", "Setembro", "Agosto"].map((month, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{month}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([1200000, 1100000, 980000, 1050000, 920000][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([960000, 880000, 784000, 840000, 736000][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([240000, 220000, 196000, 210000, 184000][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([85000, 88000, 82000, 90000, 80000][index])}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format([155000, 132000, 114000, 120000, 104000][index])}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}


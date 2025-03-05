"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, DollarSign, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "@/components/admin/admin-layout"
import { RecentSalesCard } from "@/components/admin/recent-sales"
import { SalesOverviewChart } from "@/components/admin/sales-overview"
import { InventoryOverviewChart } from "@/components/admin/inventory-overview"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()
        if (response.ok && data.user.role === "ADMIN") {
          setUser(data.user)
        } else {
          router.push("/login")
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return null
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/veiculos/novo"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Adicionar Veículo
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Veículos em Estoque</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+2 adicionados este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 1.2M</div>
                  <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">325</div>
                  <p className="text-xs text-muted-foreground">+18 novos clientes este mês</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Visão Geral de Vendas</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesOverviewChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>Você vendeu 12 veículos este mês.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSalesCard />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Inventário por Categoria</CardTitle>
                  <CardDescription>Distribuição de veículos por tipo.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <InventoryOverviewChart />
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Veículos Mais Visualizados</CardTitle>
                  <CardDescription>Os veículos mais populares no site.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Toyota Corolla XEi 2.0", views: 1245, percent: 85 },
                      { name: "Volkswagen T-Cross Highline", views: 986, percent: 65 },
                      { name: "Jeep Compass Limited", views: 879, percent: 59 },
                      { name: "Honda Civic EXL", views: 756, percent: 48 },
                      { name: "Fiat Pulse Impetus", views: 654, percent: 42 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-muted-foreground">{item.views} visualizações</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Análise Detalhada</CardTitle>
                <CardDescription>Esta seção está em desenvolvimento.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Conteúdo de análise detalhada será adicionado em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Esta seção está em desenvolvimento.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Conteúdo de relatórios será adicionado em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
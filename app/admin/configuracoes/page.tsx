"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/components/admin/admin-layout"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simular uma chamada de API
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
      })
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>Salvando...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="company">Empresa</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Configure as opções gerais do sistema.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input id="site-name" defaultValue="Auto Loja" />
                  <p className="text-sm text-muted-foreground">
                    Este nome será exibido no título da página e em outros lugares.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>Detalhes sobre sua empresa.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="Auto Loja LTDA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email da Empresa</Label>
                  <Input id="company-email" type="email" defaultValue="contato@autoloja.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Telefone da Empresa</Label>
                  <Input id="company-phone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Endereço da Empresa</Label>
                  <Textarea id="company-address" defaultValue="Rua Exemplo, 123 - Centro, São Paulo - SP" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>Adicione, edite e gerencie os usuários do sistema.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>Funcionalidade em desenvolvimento.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Email</CardTitle>
                <CardDescription>Configure as opções de envio de email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">Servidor SMTP</Label>
                  <Input id="smtp-server" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Porta SMTP</Label>
                  <Input id="smtp-port" type="number" defaultValue={587} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Usuário SMTP</Label>
                  <Input id="smtp-username" defaultValue="seuemail@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Senha SMTP</Label>
                  <Input id="smtp-password" type="password" defaultValue="suasenha" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="smtp-tls" />
                  <Label htmlFor="smtp-tls">Usar TLS</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>Opções avançadas para personalizar o sistema.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-url">URL da API</Label>
                  <Input id="api-url" defaultValue="https://api.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-level">Nível de Log</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Info" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warn">Warn</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}


import { Car, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SellPage() {
  return (
    <div className="container py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Venda seu Veículo</h1>
          <p className="text-muted-foreground mb-6">
            Preencha o formulário abaixo com os dados do seu veículo para uma avaliação.
          </p>

          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Dados do Veículo</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marca</Label>
                      <select id="brand" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Selecione a marca</option>
                        <option value="toyota">Toyota</option>
                        <option value="honda">Honda</option>
                        <option value="volkswagen">Volkswagen</option>
                        <option value="chevrolet">Chevrolet</option>
                        <option value="ford">Ford</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Modelo</Label>
                      <Input id="model" placeholder="Ex: Corolla" />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="year">Ano</Label>
                      <Input id="year" placeholder="Ex: 2022" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Quilometragem</Label>
                      <Input id="mileage" placeholder="Ex: 30000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel">Combustível</Label>
                      <select id="fuel" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Selecione</option>
                        <option value="flex">Flex</option>
                        <option value="gasoline">Gasolina</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Elétrico</option>
                        <option value="hybrid">Híbrido</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="color">Cor</Label>
                      <Input id="color" placeholder="Ex: Prata" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço Desejado (R$)</Label>
                      <Input id="price" placeholder="Ex: 100000" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="description">Descrição e Observações</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o estado do veículo, opcionais, histórico de manutenção, etc."
                      rows={4}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4">Seus Dados</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade/Estado</Label>
                      <Input id="city" placeholder="Ex: São Paulo/SP" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    Concordo com os termos de uso e política de privacidade
                  </label>
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Enviar para Avaliação
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Por que vender conosco?</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p>Avaliação justa e transparente do seu veículo</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p>Pagamento imediato após a negociação</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p>Cuidamos de toda a documentação</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p>Mais de 15 anos de experiência no mercado</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p>Atendimento personalizado e sem compromisso</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Como funciona?</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Preencha o formulário</span>
                  <p className="pl-5 mt-1">Informe os dados do seu veículo e seus dados de contato.</p>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Avaliação</span>
                  <p className="pl-5 mt-1">Nossa equipe entrará em contato para agendar uma avaliação presencial.</p>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Proposta</span>
                  <p className="pl-5 mt-1">Após a avaliação, apresentaremos uma proposta justa pelo seu veículo.</p>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Negociação</span>
                  <p className="pl-5 mt-1">Aceitando a proposta, cuidamos de toda a documentação e pagamento.</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"
import { ArrowRight, Car, MapPin, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeaturedVehicles from "@/components/featured-vehicles"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className="h-[600px] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
        />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Encontre o carro dos seus sonhos
          </h1>
          <p className="mt-6 max-w-lg text-xl">
            Compra, venda e troca de veículos novos e seminovos com as melhores condições do mercado.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/veiculos">Ver Veículos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/vender">Vender Meu Carro</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Busca Rápida</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Marca</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Todas as marcas</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="volkswagen">Volkswagen</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="ford">Ford</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Modelo</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Todos os modelos</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ano</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Todos os anos</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preço até</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Qualquer preço</option>
                      <option value="50000">R$ 50.000</option>
                      <option value="100000">R$ 100.000</option>
                      <option value="150000">R$ 150.000</option>
                      <option value="200000">R$ 200.000</option>
                    </select>
                  </div>
                </div>
                <Button className="mt-6 w-full sm:w-auto">Buscar Veículos</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Veículos em Destaque</h2>
            <Button variant="outline" asChild>
              <Link href="/veiculos" className="flex items-center gap-2">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeaturedVehicles />
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compra e Venda</h3>
                <p className="text-muted-foreground">
                  Compre ou venda seu veículo com segurança e as melhores condições do mercado.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financiamento</h3>
                <p className="text-muted-foreground">
                  Oferecemos as melhores taxas de financiamento com aprovação rápida.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Consultoria</h3>
                <p className="text-muted-foreground">
                  Consultoria especializada para ajudar você a fazer a melhor escolha.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sobre Nossa Loja</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com mais de 15 anos de experiência no mercado automotivo, nossa loja se destaca pelo atendimento
                personalizado e compromisso com a satisfação do cliente.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Trabalhamos com veículos de todas as marcas, novos e seminovos, sempre com procedência garantida e
                revisados.
              </p>
              <Button asChild>
                <Link href="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Nossa loja"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Estamos prontos para atender você e responder todas as suas dúvidas. Venha nos visitar ou entre em contato!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contato" className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> Fale Conosco
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/localizacao" className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Nossa Localização
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


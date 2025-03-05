import { Award, Car, Clock, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Sobre Nós</h1>
      <p className="text-muted-foreground mb-10">Conheça nossa história, valores e compromisso com nossos clientes.</p>

      <div className="grid gap-10 lg:grid-cols-2 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
          <p className="text-muted-foreground mb-4">
            Fundada em 2008, nossa loja de veículos nasceu da paixão por automóveis e do desejo de oferecer um serviço
            diferenciado no mercado. Começamos como uma pequena loja com apenas 5 veículos e hoje somos referência na
            região, com um estoque de mais de 100 veículos de diversas marcas e modelos.
          </p>
          <p className="text-muted-foreground mb-4">
            Ao longo desses anos, construímos uma reputação sólida baseada na transparência, honestidade e compromisso
            com a satisfação dos nossos clientes. Nosso objetivo sempre foi proporcionar uma experiência de compra
            tranquila e segura, com veículos de qualidade e procedência garantida.
          </p>
          <p className="text-muted-foreground">
            Hoje, contamos com uma equipe de profissionais experientes e apaixonados pelo que fazem, prontos para
            atender e auxiliar nossos clientes na escolha do veículo ideal para suas necessidades.
          </p>
        </div>
        <div className="relative h-[400px]">
          <div className="absolute inset-0 bg-muted rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=400&width=600" alt="Nossa loja" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Nossos Valores</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualidade</h3>
              <p className="text-muted-foreground">
                Trabalhamos apenas com veículos de qualidade e procedência garantida.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparência</h3>
              <p className="text-muted-foreground">Prezamos pela transparência em todas as etapas da negociação.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compromisso</h3>
              <p className="text-muted-foreground">Comprometidos com a satisfação e confiança dos nossos clientes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Agilidade</h3>
              <p className="text-muted-foreground">Processos ágeis e eficientes para economizar seu tempo.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Nossa Equipe</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="text-center">
              <div className="mb-4 h-48 bg-muted rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Membro ${member}`}
                  alt={`Membro da equipe ${member}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Nome do Membro {member}</h3>
              <p className="text-primary">Cargo na Empresa</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Depoimentos de Clientes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((testimonial) => (
            <Card key={testimonial}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=50&width=50&text=C${testimonial}`}
                      alt={`Cliente ${testimonial}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Cliente {testimonial}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Excelente atendimento e profissionalismo. Encontrei o carro que procurava por um preço justo e com
                  toda a documentação em ordem. Recomendo a todos!"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"
import { Car, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <Car className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Página não encontrada</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/veiculos">Ver veículos disponíveis</Link>
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ChevronLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcional: Registrar o erro em um serviço de análise
    console.error(error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold">Erro crítico</h1>
          <p className="mt-2 text-muted-foreground max-w-md">Desculpe, ocorreu um erro crítico na aplicação.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}


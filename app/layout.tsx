import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Car, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Auto Loja - Compra e Venda de Veículos",
  description:
    "Encontre o carro dos seus sonhos na nossa loja. Compra, venda e troca de veículos novos e seminovos com as melhores condições do mercado.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">Auto Loja</span>
            </Link>
            <nav className="hidden md:flex ml-10 gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/veiculos" className="text-sm font-medium hover:text-primary">
                Veículos
              </Link>
              <Link href="/vender" className="text-sm font-medium hover:text-primary">
                Vender
              </Link>
              <Link href="/sobre" className="text-sm font-medium hover:text-primary">
                Sobre
              </Link>
              <Link href="/contato" className="text-sm font-medium hover:text-primary">
                Contato
              </Link>
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">(00) 0000-0000</span>
              </div>
              <Link
                href="/login"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-primary hover:bg-primary/10"
              >
                Entrar
              </Link>
              <Link
                href="/contato"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Fale Conosco
              </Link>
              <button className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-muted py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Car className="h-6 w-6" />
                  <span className="text-xl font-bold">Auto Loja</span>
                </Link>
                <p className="text-muted-foreground mb-4">
                  Compra, venda e troca de veículos novos e seminovos com as melhores condições do mercado.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Youtube className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/veiculos" className="text-muted-foreground hover:text-primary">
                      Veículos
                    </Link>
                  </li>
                  <li>
                    <Link href="/vender" className="text-muted-foreground hover:text-primary">
                      Vender
                    </Link>
                  </li>
                  <li>
                    <Link href="/sobre" className="text-muted-foreground hover:text-primary">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="/contato" className="text-muted-foreground hover:text-primary">
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Serviços</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Compra de Veículos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Venda de Veículos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Financiamento
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Consultoria
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Avaliação Gratuita
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contato</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">(00) 0000-0000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">seu_email@exemplo.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
              <p>© {new Date().getFullYear()} Auto Loja. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'
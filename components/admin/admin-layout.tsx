"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Car,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Veículos",
      icon: Car,
      href: "/admin/veiculos",
      active: pathname.includes("/admin/veiculos"),
    },
    {
      label: "Clientes",
      icon: Users,
      href: "/admin/clientes",
      active: pathname.includes("/admin/clientes"),
    },
    {
      label: "Vendas",
      icon: CreditCard,
      href: "/admin/vendas",
      active: pathname.includes("/admin/vendas"),
    },
    {
      label: "Mensagens",
      icon: MessageSquare,
      href: "/admin/mensagens",
      active: pathname.includes("/admin/mensagens"),
    },
    {
      label: "Relatórios",
      icon: BarChart3,
      href: "/admin/relatorios",
      active: pathname.includes("/admin/relatorios"),
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/admin/configuracoes",
      active: pathname.includes("/admin/configuracoes"),
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-[70px]",
        )}
      >
        <div className="flex h-14 items-center border-b px-3">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Car className="h-6 w-6" />
            <span className={cn("transition-opacity", isSidebarOpen ? "opacity-100" : "opacity-0 hidden")}>Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  route.active ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-4 w-4" />
                <span className={cn("transition-opacity", isSidebarOpen ? "opacity-100" : "opacity-0 hidden")}>
                  {route.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-3">
          <div className={cn("flex items-center justify-between", !isSidebarOpen && "flex-col gap-2")}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className={cn("transition-opacity", isSidebarOpen ? "opacity-100" : "opacity-0 hidden")}>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@exemplo.com</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Menu do usuário</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className="lg:hidden flex h-14 items-center border-b bg-background px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <Car className="h-6 w-6" />
                <span>Admin</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                      route.active ? "bg-muted text-primary" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin</p>
                    <p className="text-xs text-muted-foreground">admin@exemplo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/admin" className="ml-2 flex items-center gap-2 font-semibold">
          <Car className="h-6 w-6" />
          <span>Admin</span>
        </Link>
      </div>

      {/* Main content */}
      <main
        className={cn("flex-1 transition-all duration-300 ease-in-out", isSidebarOpen ? "lg:ml-64" : "lg:ml-[70px]")}
      >
        {children}
      </main>
    </div>
  )
}


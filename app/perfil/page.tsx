"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()
        if (response.ok && data.user.role === "CLIENT") {
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
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Nome:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Papel:</strong> {user.role}
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <Button onClick={() => router.push("/logout")}>Sair</Button>
        </div>
      </div>
    </div>
  )
}
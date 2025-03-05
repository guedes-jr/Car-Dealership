"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", vendas: 4 },
  { month: "Fev", vendas: 6 },
  { month: "Mar", vendas: 8 },
  { month: "Abr", vendas: 7 },
  { month: "Mai", vendas: 9 },
  { month: "Jun", vendas: 10 },
  { month: "Jul", vendas: 8 },
  { month: "Ago", vendas: 12 },
  { month: "Set", vendas: 14 },
  { month: "Out", vendas: 12 },
  { month: "Nov", vendas: 10 },
  { month: "Dez", vendas: 12 },
]

export function SalesOverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="vendas" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}


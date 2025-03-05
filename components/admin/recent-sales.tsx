export function RecentSalesCard() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "Maria Silva",
          email: "maria@exemplo.com",
          amount: "R$ 129.900",
          vehicle: "Toyota Corolla XEi 2.0",
        },
        {
          name: "João Oliveira",
          email: "joao@exemplo.com",
          amount: "R$ 159.900",
          vehicle: "Volkswagen T-Cross Highline",
        },
        {
          name: "Ana Santos",
          email: "ana@exemplo.com",
          amount: "R$ 169.900",
          vehicle: "Jeep Compass Limited",
        },
        {
          name: "Carlos Pereira",
          email: "carlos@exemplo.com",
          amount: "R$ 139.900",
          vehicle: "Honda Civic EXL",
        },
        {
          name: "Fernanda Lima",
          email: "fernanda@exemplo.com",
          amount: "R$ 119.900",
          vehicle: "Fiat Pulse Impetus",
        },
      ].map((sale, index) => (
        <div key={index} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{sale.amount}</p>
            <p className="text-sm text-muted-foreground">{sale.vehicle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


const customers = [
  { id: "cus_1001", name: "Alex Johnson", email: "alex@example.com", orders: 7, spent: 1520.4 },
  { id: "cus_1002", name: "Priya Singh", email: "priya@example.com", orders: 3, spent: 280.99 },
  { id: "cus_1003", name: "Chen Li", email: "chen@example.com", orders: 14, spent: 3199.0 },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Customers</h1>
      <div className="overflow-hidden rounded-lg border">
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Orders</th>
                <th className="px-3 py-2">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2">{c.orders}</td>
                  <td className="px-3 py-2">${c.spent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 p-3 md:hidden">
          {customers.map((c) => (
            <div key={c.id} className="rounded-md border p-3">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.email}</div>
              <div className="mt-1 text-sm">Orders: {c.orders}</div>
              <div className="text-sm">Spent: ${c.spent.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

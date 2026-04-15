"use client"

const orders = [
  { id: "INV-1001", customer: "Mathew Anderson", date: "2025-06-01", total: "$1,230.00", status: "Paid" },
  { id: "INV-1002", customer: "Jane Cooper", date: "2025-06-02", total: "$820.00", status: "Refunded" },
  { id: "INV-1003", customer: "Wade Warren", date: "2025-06-02", total: "$2,150.00", status: "Paid" },
  { id: "INV-1004", customer: "Guy Hawkins", date: "2025-06-03", total: "$515.00", status: "Pending" },
  { id: "INV-1005", customer: "Eleanor Pena", date: "2025-06-03", total: "$1,035.00", status: "Paid" },
]

export default function RecentOrders() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-base font-semibold">Recent Orders</h3>
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted-foreground border-t border-b bg-secondary/50">
            <tr>
              <th className="px-4 py-2 font-medium">Invoicsdadae</th>
              <th className="px-4 py-2 font-medium">Customer</th>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Total</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b last:border-0">
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3">{o.date}</td>
                <td className="px-4 py-3">{o.total}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

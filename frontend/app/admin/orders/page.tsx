import Link from "next/link"

const orders = [
  { id: "ord_1001", date: "2025-10-01", customer: "Alex Johnson", total: 289.5, status: "Paid" },
  { id: "ord_1002", date: "2025-10-02", customer: "Priya Singh", total: 49.99, status: "Pending" },
  { id: "ord_1003", date: "2025-10-03", customer: "Chen Li", total: 129.0, status: "Shipped" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="overflow-hidden rounded-lg border">
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{o.id}</td>
                  <td className="px-3 py-2">{o.date}</td>
                  <td className="px-3 py-2">{o.customer}</td>
                  <td className="px-3 py-2">${o.total.toFixed(2)}</td>
                  <td className="px-3 py-2">{o.status}</td>
                  <td className="px-3 py-2">
                    <Link className="underline underline-offset-2" href={`/admin/orders/${o.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile cards */}
        <div className="grid gap-3 p-3 md:hidden">
          {orders.map((o) => (
            <div key={o.id} className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{o.id}</div>
                <div className="text-xs text-muted-foreground">{o.date}</div>
              </div>
              <div className="mt-1 text-sm">{o.customer}</div>
              <div className="mt-1 text-sm">${o.total.toFixed(2)}</div>
              <div className="mt-1 text-xs">{o.status}</div>
              <div className="mt-2">
                <Link className="text-sm underline underline-offset-2" href={`/admin/orders/${o.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

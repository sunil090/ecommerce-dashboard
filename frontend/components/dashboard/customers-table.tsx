"use client"

import Link from "next/link"

const customers = [
  { id: "cus_1", name: "Mathew Anderson", email: "mathew@example.com", orders: 12, spend: "$1,540", status: "Active" },
  { id: "cus_2", name: "Jane Cooper", email: "jane@example.com", orders: 5, spend: "$780", status: "Active" },
  { id: "cus_3", name: "Wade Warren", email: "wade@example.com", orders: 2, spend: "$210", status: "Inactive" },
]

export default function CustomersTable() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted-foreground border-t border-b bg-secondary/50">
            <tr>
              <th className="px-4 py-2 font-medium">Customer</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">Email</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Orders</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Lifetime Spend</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{c.email}</td>
                <td className="px-4 py-3 hidden md:table-cell">{c.orders}</td>
                <td className="px-4 py-3 hidden md:table-cell">{c.spend}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs">{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent" href={`/customers/${c.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

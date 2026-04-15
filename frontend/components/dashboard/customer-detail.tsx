"use client"

export default function CustomerDetail({ id }: { id: string }) {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Customer {id}</h1>
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Send message</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-2">Profile</h3>
          <p className="text-sm">Name: Jane Cooper</p>
          <p className="text-sm">Email: jane@example.com</p>
          <p className="text-sm">Phone: (555) 123-4567</p>
        </div>
        <div className="rounded-lg border bg-card p-4 md:col-span-2">
          <h3 className="font-semibold mb-2">Recent Orders</h3>
          <ul className="text-sm space-y-2">
            <li>INV-1004 — $515.00 — Pending</li>
            <li>INV-1002 — $820.00 — Refunded</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

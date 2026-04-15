"use client"

export default function OrderDetail({ id }: { id: string }) {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Order {id}</h1>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Refund</button>
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Mark as Paid</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4 md:col-span-2">
          <h3 className="font-semibold mb-3">Items</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div className="text-sm">Running Shoes — Size 9</div>
              <div className="text-sm">$120 × 2</div>
            </li>
            <li className="flex items-center justify-between">
              <div className="text-sm">Casual Sneakers — Size 8</div>
              <div className="text-sm">$89 × 1</div>
            </li>
            <li className="flex items-center justify-between border-t pt-3">
              <div className="text-sm font-medium">Total</div>
              <div className="text-sm font-semibold">$329</div>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold mb-2">Customer</h3>
            <p className="text-sm">Mathew Anderson</p>
            <p className="text-sm text-muted-foreground">mathew@example.com</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold mb-2">Shipping</h3>
            <p className="text-sm">123 Market St, San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  )
}

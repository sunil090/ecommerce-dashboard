"use client"

const rows = [
  { product: "Running Shoes", sku: "RUN-001-RED-9", stock: 34, reserved: 3, reorder: 10 },
  { product: "Casual Sneakers", sku: "SNE-002-WHT-8", stock: 12, reserved: 2, reorder: 8 },
  { product: "Formal Shoes", sku: "FRM-003-BLK-10", stock: 0, reserved: 0, reorder: 6 },
]

export default function InventoryTable() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted-foreground border-t border-b bg-secondary/50">
            <tr>
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-4 py-2 font-medium">SKU</th>
              <th className="px-4 py-2 font-medium">Stock</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">Reserved</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Reorder Point</th>
              <th className="px-4 py-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.sku} className="border-b last:border-0">
                <td className="px-4 py-3">{r.product}</td>
                <td className="px-4 py-3">{r.sku}</td>
                <td className="px-4 py-3">{r.stock}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{r.reserved}</td>
                <td className="px-4 py-3 hidden md:table-cell">{r.reorder}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent">Adjust</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

import Link from "next/link"

const data = [
  { id: "p-1001", name: "Wireless Headphones", sku: "WH-01", stock: 42, price: 129.99, status: "Active" },
  { id: "p-1002", name: "Smart Watch", sku: "SW-09", stock: 12, price: 199.99, status: "Low Stock" },
  { id: "p-1003", name: "Backpack", sku: "BP-21", stock: 0, price: 59.0, status: "Out of Stock" },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">SKU</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2">{p.sku}</td>
                  <td className="px-3 py-2">{p.stock}</td>
                  <td className="px-3 py-2">${p.price.toFixed(2)}</td>
                  <td className="px-3 py-2">{p.status}</td>
                  <td className="px-3 py-2">
                    <Link className="underline underline-offset-2" href={`/admin/products/${p.id}`}>
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
          {data.map((p) => (
            <div key={p.id} className="rounded-md border p-3">
              <div className="font-medium">{p.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">SKU: {p.sku}</div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div>Stock: {p.stock}</div>
                <div>${p.price.toFixed(2)}</div>
              </div>
              <div className="mt-1 text-xs">{p.status}</div>
              <div className="mt-2">
                <Link className="text-sm underline underline-offset-2" href={`/admin/products/${p.id}`}>
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

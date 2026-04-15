"use client"

import Link from "next/link"

const products = [
  { id: "prod_1", name: "Running Shoes", sku: "RUN-001-RED-9", price: "$120.00", stock: 34, status: "Active" },
  { id: "prod_2", name: "Casual Sneakers", sku: "SNE-002-WHT-8", price: "$89.00", stock: 12, status: "Active" },
  { id: "prod_3", name: "Formal Shoes", sku: "FRM-003-BLK-10", price: "$149.00", stock: 0, status: "Draft" },
]

export default function ProductsTable() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted-foreground border-t border-b bg-secondary/50">
            <tr>
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">SKU</th>
              <th className="px-4 py-2 font-medium">Price</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Stock</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Status</th>
              <th className="px-4 py-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src="/shoe-product.jpg" alt="" className="size-10 rounded-md border" />
                    <span>{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">{p.sku}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3 hidden md:table-cell">{p.stock}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs">{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent" href={`/products/${p.id}`}>
                    Edit
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

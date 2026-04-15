"use client"

const products = [
  { id: 1, name: "Running Shoes", sales: 1321, revenue: "$24,320" },
  { id: 2, name: "Casual Sneakers", sales: 980, revenue: "$18,540" },
  { id: 3, name: "Formal Shoes", sales: 765, revenue: "$15,210" },
  { id: 4, name: "Flip Flops", sales: 540, revenue: "$6,230" },
]

export default function TopProducts() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-base font-semibold">Top Products</h3>
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Manage</button>
      </div>
      <ul className="divide-y">
        {products.map((p) => (
          <li key={p.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img src="/shoe-product.jpg" alt="" className="size-10 rounded-md border" />
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.sales} sales</div>
              </div>
            </div>
            <div className="text-sm font-semibold">{p.revenue}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

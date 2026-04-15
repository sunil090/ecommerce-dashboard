"use client"

const categories = [
  { id: "cat_1", name: "Running", products: 42 },
  { id: "cat_2", name: "Casual", products: 36 },
  { id: "cat_3", name: "Formal", products: 18 },
]

export default function CategoriesList() {
  return (
    <section className="rounded-lg border bg-card">
      <ul className="divide-y">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.products} products</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent">Rename</button>
              <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

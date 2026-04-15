const categories = [
  { id: "cat_elec", name: "Electronics", products: 312 },
  { id: "cat_fash", name: "Fashion", products: 528 },
  { id: "cat_home", name: "Home", products: 219 },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Categories</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">{c.id}</div>
            <div className="mt-1 text-lg font-semibold">{c.name}</div>
            <div className="mt-1 text-sm">{c.products} products</div>
          </div>
        ))}
      </div>
    </div>
  )
}

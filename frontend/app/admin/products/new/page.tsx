export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Add Product</h1>
      <form className="grid gap-4 md:max-w-2xl">
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Name</label>
          <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">SKU</label>
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Stock</label>
          <input type="number" className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Description</label>
          <textarea className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Save</button>
          <button type="button" className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

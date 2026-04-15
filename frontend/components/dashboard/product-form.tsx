"use client"

export default function ProductForm({ productId }: { productId?: string }) {
  const isEdit = Boolean(productId)
  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{isEdit ? "Edit product" : "Create new product"}</h1>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Save draft</button>
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Publish</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-lg border bg-card p-4 space-y-4">
          <div>
            <label className="text-sm">Title</label>
            <input
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              defaultValue={isEdit ? "Running Shoes" : ""}
            />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea
              className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-28"
              defaultValue={isEdit ? "Comfortable and lightweight running shoes." : ""}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm">Price</label>
              <input
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                defaultValue={isEdit ? "120" : ""}
              />
            </div>
            <div>
              <label className="text-sm">Compare at</label>
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm">Status</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="font-semibold">Media</h3>
            <div className="rounded-md border bg-muted h-32 grid place-content-center text-sm text-muted-foreground">
              Drop or click to upload
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="font-semibold">Organization</h3>
            <div>
              <label className="text-sm">Category</label>
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" defaultValue="Shoes" />
            </div>
            <div>
              <label className="text-sm">Tags</label>
              <input
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="e.g. running, lightweight"
              />
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="font-semibold">Inventory</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">SKU</label>
                <input
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  defaultValue="RUN-001-RED-9"
                />
              </div>
              <div>
                <label className="text-sm">Stock</label>
                <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" defaultValue="34" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

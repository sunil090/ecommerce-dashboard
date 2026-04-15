type Props = { params: { id: string } }

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Product: {params.id}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 md:col-span-2">
          <div className="text-sm text-muted-foreground">Overview</div>
          <div className="mt-2 grid gap-3 text-sm">
            <div>Name: Awesome Product</div>
            <div>SKU: SKU-123</div>
            <div>Price: $129.99</div>
            <div>Stock: 42</div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Media</div>
          <img src="/diverse-products-still-life.png" alt="Product" className="mt-2 w-full rounded-md border object-cover" />
        </div>
      </div>
    </div>
  )
}

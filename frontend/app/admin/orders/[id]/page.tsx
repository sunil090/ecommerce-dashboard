type Props = { params: { id: string } }

export default function OrderDetailPage({ params }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Order {params.id}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 md:col-span-2">
          <div className="text-sm text-muted-foreground">Items</div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div>Wireless Headphones x1</div>
              <div>$129.99</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Backpack x2</div>
              <div>$118.00</div>
            </div>
            <div className="flex items-center justify-between border-t pt-2 font-medium">
              <div>Total</div>
              <div>$247.99</div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Customer</div>
            <div className="mt-2 text-sm">Alex Johnson</div>
            <div className="text-xs text-muted-foreground">alex@example.com</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Shipping</div>
            <div className="mt-2 text-sm">Standard (3-5 days)</div>
            <div className="text-xs text-muted-foreground">Tracking: 1Z12345</div>
          </div>
        </div>
      </div>
    </div>
  )
}

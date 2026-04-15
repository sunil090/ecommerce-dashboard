const rows = [
  { sku: "WH-01", product: "Wireless Headphones", available: 42, reserved: 5, incoming: 100 },
  { sku: "SW-09", product: "Smart Watch", available: 12, reserved: 1, incoming: 0 },
  { sku: "BP-21", product: "Backpack", available: 0, reserved: 0, incoming: 200 },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Inventory / SKUs</h1>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Available</th>
              <th className="px-3 py-2">Reserved</th>
              <th className="px-3 py-2">Incoming</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.sku} className="border-t">
                <td className="px-3 py-2 font-medium">{r.sku}</td>
                <td className="px-3 py-2">{r.product}</td>
                <td className="px-3 py-2">{r.available}</td>
                <td className="px-3 py-2">{r.reserved}</td>
                <td className="px-3 py-2">{r.incoming}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

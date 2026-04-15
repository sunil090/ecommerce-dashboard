const discounts = [
  { code: "WELCOME10", type: "Percent", value: "10%", status: "Active" },
  { code: "FREESHIP", type: "Shipping", value: "Free", status: "Active" },
  { code: "SUMMER25", type: "Percent", value: "25%", status: "Scheduled" },
]

export default function DiscountsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Discounts</h1>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.code} className="border-t">
                <td className="px-3 py-2 font-medium">{d.code}</td>
                <td className="px-3 py-2">{d.type}</td>
                <td className="px-3 py-2">{d.value}</td>
                <td className="px-3 py-2">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

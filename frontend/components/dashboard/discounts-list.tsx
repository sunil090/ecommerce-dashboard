"use client"

const discounts = [
  { code: "WELCOME10", type: "Percent", value: "10%", usage: 124, start: "2025-01-01", end: "2025-12-31" },
  { code: "FREESHIP", type: "Free Ship", value: "-", usage: 310, start: "2025-03-01", end: "2025-10-31" },
  { code: "SUMMER20", type: "Percent", value: "20%", usage: 42, start: "2025-06-01", end: "2025-08-31" },
]

export default function DiscountsList() {
  return (
    <section className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted-foreground border-t border-b bg-secondary/50">
            <tr>
              <th className="px-4 py-2 font-medium">Code</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Value</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">Usage</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Starts</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">Ends</th>
              <th className="px-4 py-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.code} className="border-b last:border-0">
                <td className="px-4 py-3">{d.code}</td>
                <td className="px-4 py-3">{d.type}</td>
                <td className="px-4 py-3">{d.value}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{d.usage}</td>
                <td className="px-4 py-3 hidden md:table-cell">{d.start}</td>
                <td className="px-4 py-3 hidden md:table-cell">{d.end}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

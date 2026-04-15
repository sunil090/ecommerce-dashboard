"use client"

const reports = [
  { name: "Sales by product", period: "Last 30 days", rows: 123 },
  { name: "Sales by channel", period: "Last 30 days", rows: 12 },
  { name: "Refunds", period: "Last 90 days", rows: 6 },
]

export default function ReportsTable() {
  return (
    <section className="rounded-lg border bg-card">
      <ul className="divide-y">
        {reports.map((r) => (
          <li key={r.name} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground">
                {r.period} • {r.rows} rows
              </div>
            </div>
            <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent">Download CSV</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

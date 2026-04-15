export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Reports</h1>
      <div className="rounded-lg border bg-card p-4">
        <div className="text-sm text-muted-foreground">Export center</div>
        <div className="mt-2 flex flex-wrap gap-3">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Sales Report (CSV)</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Inventory Report (CSV)</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Customers Report (CSV)</button>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import ReportsTable from "@/components/dashboard/reports-table"

export default function ReportsPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading reports…</div>}>
        <DashboardShell>
          <h1 className="text-xl font-semibold mb-4">Reports</h1>
          <ReportsTable />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

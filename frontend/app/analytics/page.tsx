import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import ChartsArea from "@/components/dashboard/charts-area"
import KPIs from "@/components/dashboard/kpis"

export default function AnalyticsPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading analytics…</div>}>
        <DashboardShell>
          <div className="space-y-6">
            <h1 className="text-xl font-semibold">Analytics</h1>
            <KPIs />
            <ChartsArea />
          </div>
        </DashboardShell>
      </Suspense>
    </main>
  )
}

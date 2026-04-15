import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"

export default async function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading dashboard…</div>}>
        <DashboardShell />
      </Suspense>
    </main>
  )
}

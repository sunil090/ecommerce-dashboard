import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import CustomerDetail from "@/components/dashboard/customer-detail"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading customer…</div>}>
        <DashboardShell>
          <CustomerDetail id={params.id} />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import OrderDetail from "@/components/dashboard/order-detail"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading order…</div>}>
        <DashboardShell>
          <OrderDetail id={params.id} />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

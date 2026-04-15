import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import OrdersTable from "@/components/dashboard/orders-table"

export default function OrdersPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading orders…</div>}>
        <DashboardShell>
          <div className="space-y-4">
            <header className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Orders</h1>
              <div className="flex items-center gap-2">
                <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Export</button>
              </div>
            </header>
            <OrdersTable />
          </div>
        </DashboardShell>
      </Suspense>
    </main>
  )
}

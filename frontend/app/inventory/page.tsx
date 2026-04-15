import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import InventoryTable from "@/components/dashboard/inventory-table"

export default function InventoryPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading inventory…</div>}>
        <DashboardShell>
          <h1 className="text-xl font-semibold mb-4">Inventory & SKUs</h1>
          <InventoryTable />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

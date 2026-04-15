import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import CustomersTable from "@/components/dashboard/customers-table"

export default function CustomersPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading customers…</div>}>
        <DashboardShell>
          <h1 className="text-xl font-semibold mb-4">Customers</h1>
          <CustomersTable />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

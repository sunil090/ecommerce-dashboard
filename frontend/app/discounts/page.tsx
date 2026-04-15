import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DiscountsList from "@/components/dashboard/discounts-list"

export default function DiscountsPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading discounts…</div>}>
        <DashboardShell>
          <h1 className="text-xl font-semibold mb-4">Discounts & Coupons</h1>
          <DiscountsList />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

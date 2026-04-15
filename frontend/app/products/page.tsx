import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import ProductsTable from "@/components/dashboard/products-table"

export default function ProductsPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading products…</div>}>
        <DashboardShell>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Products</h1>
            <a href="/products/new" className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">
              Add product
            </a>
          </div>
          <ProductsTable />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

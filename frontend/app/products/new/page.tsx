import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import ProductForm from "@/components/dashboard/product-form"

export default function NewProductPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading form…</div>}>
        <DashboardShell>
          <ProductForm />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

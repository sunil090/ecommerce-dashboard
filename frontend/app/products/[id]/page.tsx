import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import ProductForm from "@/components/dashboard/product-form"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading product…</div>}>
        <DashboardShell>
          <ProductForm productId={params.id} />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

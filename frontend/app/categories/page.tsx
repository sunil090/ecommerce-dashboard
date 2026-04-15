import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import CategoriesList from "@/components/dashboard/categories-list"

export default function CategoriesPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading categories…</div>}>
        <DashboardShell>
          <h1 className="text-xl font-semibold mb-4">Categories</h1>
          <CategoriesList />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

import { Suspense } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import SettingsForm from "@/components/dashboard/settings-form"

export default function SettingsPage() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading settings…</div>}>
        <DashboardShell>
          <SettingsForm />
        </DashboardShell>
      </Suspense>
    </main>
  )
}

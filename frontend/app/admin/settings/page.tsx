export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <form className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Store Info</div>
          <div className="mt-3 grid gap-3">
            <input placeholder="Store Name" className="rounded-md border bg-background px-3 py-2 text-sm" />
            <input placeholder="Support Email" className="rounded-md border bg-background px-3 py-2 text-sm" />
            <input placeholder="Support Phone" className="rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="mt-3">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Save</button>
          </div>
        </form>
        <form className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Payments</div>
          <div className="mt-3 grid gap-3">
            <input placeholder="Stripe Publishable Key" className="rounded-md border bg-background px-3 py-2 text-sm" />
            <input placeholder="Stripe Secret Key" className="rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="mt-3">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

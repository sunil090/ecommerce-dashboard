"use client"

export default function SettingsForm() {
  return (
    <section className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="rounded-lg border bg-card p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Store name</label>
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" defaultValue="eMart" />
          </div>
          <div>
            <label className="text-sm">Support email</label>
            <input
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              defaultValue="support@emart.com"
            />
          </div>
          <div>
            <label className="text-sm">Currency</label>
            <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Timezone</label>
            <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option>UTC</option>
              <option>America/Los_Angeles</option>
              <option>Asia/Kolkata</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Tax rate (%)</label>
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" defaultValue="10" />
          </div>
          <div>
            <label className="text-sm">Low stock threshold</label>
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" defaultValue="5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input id="emails" type="checkbox" className="size-4 rounded border" defaultChecked />
          <label htmlFor="emails" className="text-sm">
            Send order confirmation emails
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input id="cod" type="checkbox" className="size-4 rounded border" />
          <label htmlFor="cod" className="text-sm">
            Enable Cash on Delivery
          </label>
        </div>

        <div className="pt-2">
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Save changes</button>
        </div>
      </div>
    </section>
  )
}

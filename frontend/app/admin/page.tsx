import { StatCard } from "@/components/admin/stat-card"
import { SalesAreaChart, OrdersBarChart, CategoryPieChart } from "@/components/admin/charts"

const revenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 56000 },
  { month: "Mar", revenue: 61000 },
  { month: "Apr", revenue: 72000 },
  { month: "May", revenue: 69000 },
  { month: "Jun", revenue: 81000 },
]

const channels = [
  { channel: "Web", orders: 420 },
  { channel: "App", orders: 370 },
  { channel: "Marketplace", orders: 290 },
]

const categories = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 30 },
  { name: "Home", value: 25 },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today’s Sales" value="$7,320" delta="+12%" />
        <StatCard label="Orders" value="1,248" delta="+5%" />
        <StatCard label="Customers" value="28,364" delta="+2%" />
        <StatCard label="Refund Rate" value="0.7%" delta="-0.1%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesAreaChart data={revenue} />
        </div>
        <CategoryPieChart data={categories} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OrdersBarChart data={channels} />
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-2 text-sm text-muted-foreground">Monthly Earnings</div>
          <img src="/sparkline.jpg" alt="" className="h-60 w-full rounded-md border object-cover" />
        </div>
      </div>
    </div>
  )
}

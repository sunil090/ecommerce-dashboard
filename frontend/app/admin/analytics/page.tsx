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

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesAreaChart data={revenue} />
        </div>
        <CategoryPieChart data={categories} />
      </div>
      <OrdersBarChart data={channels} />
    </div>
  )
}

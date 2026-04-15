"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const barData = [
  { month: "Jan", fashion: 1.2, footwear: 2.4 },
  { month: "Feb", fashion: 1.8, footwear: 1.7 },
  { month: "Mar", fashion: 2.2, footwear: 2.1 },
  { month: "Apr", fashion: 1.5, footwear: 2.2 },
  { month: "May", fashion: 2.8, footwear: 2.6 },
  { month: "Jun", fashion: 2.0, footwear: 1.9 },
]

const pieData = [
  { name: "Profit", value: 21256, fill: "var(--color-chart-2)" },
  { name: "Expense", value: 22325, fill: "var(--color-chart-3)" },
]

const areaData = [
  { month: "Jan", earnings: 3.2 },
  { month: "Feb", earnings: 4.0 },
  { month: "Mar", earnings: 3.6 },
  { month: "Apr", earnings: 4.5 },
  { month: "May", earnings: 5.1 },
  { month: "Jun", earnings: 4.8 },
]

export default function ChartsArea() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Updates */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-base font-semibold">Revenue Updates</h3>
        <p className="text-xs text-muted-foreground">Overview of Profit</p>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              />
              <Legend />
              <Bar dataKey="footwear" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fashion" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-base font-semibold">Sales Overview</h3>
        <p className="text-xs text-muted-foreground">Every Month</p>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              />
              <Legend />
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Profit</div>
            <div className="font-semibold">$21,256</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Expense</div>
            <div className="font-semibold">$22,325</div>
          </div>
        </div>
      </div>

      {/* Monthly Earnings */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Monthly Earnings</h3>
            <p className="text-xs text-muted-foreground">+$12% vs last month</p>
          </div>
          <button className="rounded-md border px-2 py-1 text-xs hover:bg-accent" aria-label="Toggle">
            •
          </button>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="var(--color-chart-2)"
                fill="url(#earnings)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

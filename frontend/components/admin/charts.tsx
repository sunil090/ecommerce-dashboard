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
  Cell,
} from "recharts"

export function SalesAreaChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 text-sm text-muted-foreground">Monthly Revenue</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#areaPrimary)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function OrdersBarChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 text-sm text-muted-foreground">Orders by Channel</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))", "hsl(var(--accent))"]

export function CategoryPieChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 text-sm text-muted-foreground">Sales by Category</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} innerRadius={50}>
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

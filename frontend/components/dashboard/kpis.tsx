"use client"

import StatCard from "./stat-card"

export default function KPIs() {
  const items = [
    {
      label: "Today's Sales",
      value: "$2,763",
      delta: "+2.4%",
      trend: "up",
    },
    {
      label: "Overall Performance",
      value: "39%",
      delta: "+1.1%",
      trend: "up",
    },
    {
      label: "Expense",
      value: "$14,320",
      delta: "+2.5%",
      trend: "up",
    },
    {
      label: "Income",
      value: "$22,329",
      delta: "+1.2%",
      trend: "up",
    },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((k) => (
        <StatCard key={k.label} {...k} />
      ))}
    </section>
  )
}

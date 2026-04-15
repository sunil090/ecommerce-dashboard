"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: string
  delta: string
  trend?: "up" | "down"
}

export default function StatCard({ label, value, delta, trend = "up" }: Props) {
  const Up = trend === "up"
  return (
    <article className="rounded-lg border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs",
            Up ? "bg-(--color-chart-2)/15 text-(--color-chart-2)" : "bg-destructive/15 text-destructive",
          )}
          aria-label={Up ? "Performance up" : "Performance down"}
        >
          {Up ? <ArrowUpRight className="size-3" aria-hidden /> : <ArrowDownRight className="size-3" aria-hidden />}
          <span>{delta}</span>
        </div>
      </div>
    </article>
  )
}

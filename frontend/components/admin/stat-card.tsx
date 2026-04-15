import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  delta,
  className,
}: {
  label: string
  value: string
  delta?: string
  className?: string
}) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 text-card-foreground", className)}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && <div className="text-xs text-primary">{delta}</div>}
      </div>
    </div>
  )
}

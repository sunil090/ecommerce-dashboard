"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BarChart3,
  Boxes,
  FileText,
  Home,
  LogOut,
  Megaphone,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Tags,
  Users2,
  Layers3,
  PlusCircle,
} from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

type Group = {
  label: string
  items: { href: string; label: string; icon?: React.ElementType }[]
  collapsible?: boolean
}

const groups: Group[] = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", label: "Dashboard", icon: Home }],
  },
  {
    label: "Sales",
    items: [
      { href: "/orders", label: "Orders", icon: ShoppingCart },
      { href: "/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/products", label: "All Products", icon: Package },
      { href: "/products/new", label: "New Product", icon: PlusCircle },
      { href: "/inventory", label: "Inventory / SKUs", icon: Boxes },
      { href: "/categories", label: "Categories", icon: Layers3 },
    ],
  },
  {
    label: "Customers",
    items: [{ href: "/customers", label: "Customer List", icon: Users2 }],
  },
  {
    label: "Marketing",
    items: [
      { href: "/discounts", label: "Discounts & Coupons", icon: Tags },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/promotions", label: "Promotions", icon: Megaphone },
    ],
  },
  {
    label: "Configuration",
    items: [
      { href: "/privacy", label: "Privacy", icon: Shield },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
]

export default function Sidebar({ open, onClose }: Props) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-foreground/40 transition-opacity z-40 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed z-50 md:static md:translate-x-0 inset-y-0 left-0 w-72 shrink-0",
          "flex flex-col border-r bg-sidebar text-sidebar-foreground",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        aria-label="Admin Navigation"
      >
        <div className="h-16 flex items-center gap-2 px-4 border-b">
          <div className="size-8 rounded-md bg-sidebar-primary" aria-hidden />
          <span className="font-semibold">E-Comm</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {groups.map((g) => (
            <div key={g.label} className="mb-3">
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => setOpenGroups((s) => ({ ...s, [g.label]: !s[g.label] }))}
                aria-expanded={openGroups[g.label] ?? true}
              >
                <span>{g.label}</span>
                <span className="text-muted-foreground" aria-hidden>
                  {(openGroups[g.label] ?? true) ? "−" : "+"}
                </span>
              </button>
              <ul className={cn("space-y-1", openGroups[g.label] === false && "hidden")}>
                {g.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        {Icon ? <Icon className="size-4" aria-hidden /> : null}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t p-3">
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm bg-secondary hover:bg-secondary/80"
            aria-label="Log out"
          >
            <LogOut className="size-4" aria-hidden />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ChevronRight, Menu, X } from "./icons"
import { NAV } from "./nav-data"
import type { NavGroup } from "./nav-data"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "admin-sidebar-open-groups"

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setOpen(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(open))
    } catch {}
  }, [open])

  useEffect(() => {
    setOpen((prev) => {
      let changed = false
      const next = { ...prev }
      NAV.forEach((item) => {
        if ("items" in item) {
          const group = item as NavGroup
          const activeInGroup = group.items.some((c) => pathname?.startsWith(c.href))
          if (activeInGroup && !next[group.title]) {
            next[group.title] = true
            changed = true
          }
        }
      })
      return changed ? next : prev
    })
  }, [pathname])

  const onToggleGroup = (title: string) => setOpen((s) => ({ ...s, [title]: !s[title] }))

  const hasActiveChild = useMemo(() => {
    return NAV.some((item) => {
      if ("href" in item) return false
      const group = item as NavGroup
      return group.items.some((c) => pathname?.startsWith(c.href))
    })
  }, [pathname])

  const NavList = (
    <nav className="px-3 py-4 overflow-y-auto">
      <div className="px-3 pb-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="inline-block h-6 w-6 rounded-md bg-primary/15" />
          <span className="text-pretty">E-KART</span>
        </Link>
      </div>

      <ul className="space-y-1">
        {NAV.map((item, idx) => {
          // leaf link
          if ("href" in item) {
            const ActiveIcon = item.icon
            const active = pathname === item.href
            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  <ActiveIcon className="shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          }

          // group with submenu
          const group = item as NavGroup
          const Icon = group.icon
          const expanded = !!open[group.title]

          return (
            <li key={idx}>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
                aria-expanded={expanded}
                onClick={() => onToggleGroup(group.title)}
              >
                <span className="flex items-center gap-3">
                  <Icon className="shrink-0" />
                  {group.title}
                </span>
                <ChevronRight className={cn("transition-transform", expanded && "rotate-90")} />
              </button>
              <ul className={cn("ml-8 mt-1 space-y-1 border-l border-border pl-3", expanded ? "block" : "hidden")}>
                {group.items.map((link) => {
                  const active = pathname?.startsWith(link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        )}
                      >
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* mobile top-left trigger */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 inline-flex items-center rounded-md bg-background/80 px-2 py-2 shadow border"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </button>

      {/* desktop sidebar */}
      <aside className="hidden md:block sticky top-0 h-svh w-64 shrink-0 border-r bg-background">{NavList}</aside>

      {/* mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 transition-opacity",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn("absolute inset-0 bg-black/40", mobileOpen ? "block" : "hidden")}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 max-w-[85%] border-r bg-background shadow-xl transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b px-3 py-3">
            <span className="font-semibold">Menu</span>
            <button
              className="rounded-md border px-2 py-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X />
            </button>
          </div>
          {NavList}
        </div>
      </div>
    </>
  )
}

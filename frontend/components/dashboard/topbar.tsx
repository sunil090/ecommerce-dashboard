"use client"

import { Menu, Search, Bell, Globe } from "lucide-react"

type Props = { onMenu: () => void }

export default function Topbar({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b bg-card/60 backdrop-blur">
      <div className="h-16 flex items-center gap-3 px-4 md:px-6">
        <button
          onClick={onMenu}
          className="md:hidden inline-flex items-center justify-center size-9 rounded-md border hover:bg-accent"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" aria-hidden />
        </button>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden />
          <input
            className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 ring-ring"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center size-9 rounded-md border hover:bg-accent"
            aria-label="Change language"
            title="Language"
          >
            <Globe className="size-5" aria-hidden />
          </button>
          <button
            className="inline-flex items-center justify-center size-9 rounded-md border hover:bg-accent"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="size-5" aria-hidden />
          </button>
          <img src="/circle-avatar.jpg" alt="Your profile" className="size-9 rounded-full border" />
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex">
        <Sidebar />
        <div className="min-h-svh flex-1">
          <Topbar />
          <main className="px-4 py-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

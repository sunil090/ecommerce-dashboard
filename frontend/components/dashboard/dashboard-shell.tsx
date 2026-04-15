"use client"

import { type ReactNode, useState } from "react"
import Sidebar from "./sidebar"
import Topbar from "./topbar"
import KPIs from "./kpis"
import ChartsArea from "./charts-area"
import RecentOrders from "./recent-orders"
import TopProducts from "./top-products"

export default function DashboardShell({ children }: { children?: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <div className="p-4 md:p-6 space-y-6">
          {children ? (
            children
          ) : (
            <>
              <KPIs />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <ChartsArea />
                  <RecentOrders />
                </div>
                <div className="space-y-6">
                  <TopProducts />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

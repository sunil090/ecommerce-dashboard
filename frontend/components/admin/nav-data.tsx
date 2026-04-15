import type React from "react"
import { Home, Box, Warehouse, Cart, Users, Percent, BarChart, FileText, Settings } from "./icons"

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement

export type NavLink = { title: string; href: string }
export type NavGroup = {
  title: string
  icon: IconComponent
  items: NavLink[]
}

type Leaf = { title: string; href: string; icon: IconComponent }

export const NAV: Array<NavGroup | Leaf> = [
  { title: "Dashboard", href: "/admin", icon: Home },
  {
    title: "Catalog",
    icon: Box,
    items: [
      { title: "Products", href: "/admin/products" },
      { title: "Categories", href: "/admin/categories" },
      { title: "Inventory / SKUs", href: "/admin/inventory" },
      { title: "Collections", href: "/admin/collections" },
    ],
  },
  {
    title: "Sales",
    icon: Cart,
    items: [
      { title: "Orders", href: "/admin/orders" },
      { title: "Returns & Refunds", href: "/admin/returns" },
      { title: "Abandoned Carts", href: "/admin/abandoned" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    items: [
      { title: "All Customers", href: "/admin/customers" },
      { title: "Segments", href: "/admin/segments" },
      { title: "Reviews", href: "/admin/reviews" },
    ],
  },
  {
    title: "Marketing",
    icon: Percent,
    items: [
      { title: "Discounts", href: "/admin/discounts" },
      { title: "Coupons", href: "/admin/coupons" },
      { title: "Promotions", href: "/admin/promotions" },
    ],
  },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart },
  { title: "Reports", href: "/admin/reports", icon: FileText },
  {
    title: "Operations",
    icon: Warehouse,
    items: [
      { title: "Suppliers", href: "/admin/suppliers" },
      { title: "Fulfillment", href: "/admin/fulfillment" },
      { title: "Shipping Rates", href: "/admin/shipping" },
    ],
  },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

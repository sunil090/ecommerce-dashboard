"use client"
import type React from "react"

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }

function Svg(props: IconProps & { d: string }) {
  const { size = 20, d, className, ...rest } = props
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}

export const ChevronRight = (p: IconProps) => <Svg d="M9 18l6-6-6-6" {...p} />
export const Menu = (p: IconProps) => <Svg d="M3 6h18M3 12h18M3 18h18" {...p} />
export const X = (p: IconProps) => <Svg d="M18 6L6 18M6 6l12 12" {...p} />
export const Home = (p: IconProps) => <Svg d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8z" {...p} />
export const Box = (p: IconProps) => (
  <Svg
    d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    {...p}
  />
)
export const Layers = (p: IconProps) => <Svg d="M12 2l9 5-9 5-9-5 9-5zm0 10l9 5-9 5-9-5 9-5z" {...p} />
export const Warehouse = (p: IconProps) => <Svg d="M3 20V9l9-5 9 5v11M7 20v-6h10v6" {...p} />
export const Tag = (p: IconProps) => (
  <Svg d="M20.59 13.41L11 3H3v8l9.59 9.59a2 2 0 0 0 2.82 0l5.18-5.18a2 2 0 0 0 0-2.82zM7 7h.01" {...p} />
)
export const Users = (p: IconProps) => (
  <Svg d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M7 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10-3a3 3 0 1 1 0 6" {...p} />
)
export const Cart = (p: IconProps) => (
  <Svg
    d="M6 6h15l-1.5 9h-12zM6 6l-2-3M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 .001-2.001A1 1 0 0 0 18 21z"
    {...p}
  />
)
export const Percent = (p: IconProps) => (
  <Svg d="M19 5L5 19M7 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" {...p} />
)
export const BarChart = (p: IconProps) => <Svg d="M3 3v18h18M8 17V9M12 17V5M16 17v-6" {...p} />
export const FileText = (p: IconProps) => (
  <Svg d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" {...p} />
)
export const Settings = (p: IconProps) => (
  <Svg
    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0 .06-1l2-.77-1-3.46-2.03.4a7.3 7.3 0 0 0-.73-.73l.4-2.03-3.46-1-.77 2a7.4 7.4 0 0 0-1 0l-.77-2-3.46 1 .4 2.03a7.3 7.3 0 0 0-.73.73L4.6 6.3l-1 3.46 2 .77a7.4 7.4 0 0 0 0 1l-2 .77 1 3.46 2.03-.4c.23.27.47.51.73.73l-.4 2.03 3.46 1 .77-2a7.4 7.4 0 0 0 1 0l.77 2 3.46-1-.4-2.03c.26-.22.5-.46.73-.73l2.03.4 1-3.46-2-.77z"
    {...p}
  />
)

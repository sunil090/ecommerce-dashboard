"use client"

import Image from "next/image"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3">
        <div className="relative hidden md:block w-full max-w-xl">
          <input
            type="search"
            placeholder="Search orders, products, customers..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Global search"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Add Product</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted">Create Order</button>
          <Image
            src="/diverse-avatars.png"
            width={32}
            height={32}
            alt="User Avatar"
            className="rounded-full border"
          />
        </div>
      </div>
    </header>
  )
}

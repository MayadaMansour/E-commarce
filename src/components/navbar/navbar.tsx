"use client"

import Link from "next/link"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Search,
  Heart,
  ShoppingCart,
  Headphones,
  Menu,
  ChevronDown
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="border-b bg-white w-full">

      <div className="container mx-auto flex items-center justify-between py-3 gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-600">
          🛒 FreshCart
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-[420px]">
          <Input
            placeholder="Search for products, brands and more..."
            className="rounded-full pr-12"
          />

          <Button
            size="icon"
            className="absolute right-1 top-1 rounded-full bg-green-600 hover:bg-green-700"
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 font-medium">

          <Link href="/">Home</Link>

          <Link href="/">Shop</Link>

          {/* Categories Dropdown */}
          <DropdownMenu>

            <DropdownMenuTrigger className="flex items-center gap-1">
              Categories
              <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>

              <DropdownMenuItem>Vegetables</DropdownMenuItem>
              <DropdownMenuItem>Fruits</DropdownMenuItem>
              <DropdownMenuItem>Snacks</DropdownMenuItem>
              <DropdownMenuItem>Beverages</DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

          <Link href="/">Brands</Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Support */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Headphones className="text-green-600" size={20}/>
            <div className="leading-tight">
              <p>Support</p>
              <p className="text-gray-500 text-xs">24/7 Help</p>
            </div>
          </div>

          {/* Wishlist */}
          <Heart className="cursor-pointer" size={20} />

          {/* Cart */}
          <div className="relative cursor-pointer">

            <ShoppingCart size={20} />

            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
              2
            </span>

          </div>

          {/* Sign In */}
          <Button className="hidden md:flex rounded-full bg-green-600 hover:bg-green-700">
            Sign In
          </Button>

          {/* Mobile Menu */}
          <Menu
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          />

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (

        <div className="lg:hidden border-t p-4 space-y-4">

          <Link href="/" className="block">Home</Link>

          <Link href="/" className="block">Shop</Link>

          <Link href="/" className="block">Categories</Link>

          <Link href="/" className="block">Brands</Link>

          <Button className="w-full bg-green-600">
            Sign In
          </Button>

        </div>

      )}

    </nav>
  )
}
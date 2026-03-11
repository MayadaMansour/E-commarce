"use client"

import { Truck, Gift, Phone, Mail, User, UserPlus } from "lucide-react"
import Link from "next/link"

export default function TopBar() {
  return (
    <div className="w-full bg-gray-100 border-b text-sm">

      <div className="container mx-auto flex items-center justify-between px-7 py-2">

        {/* Left Side */}
        <div className="flex items-center gap-8 text-gray-600">

          <div className="flex items-center gap-2">
            <Truck className="text-green-600" size={16} />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2">
            <Gift className="text-green-600" size={16} />
            <span>New Arrivals Daily</span>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8 text-gray-600">

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>support@freshcart.com</span>
          </div>

          <Link href="/signin" className="flex items-center gap-1 hover:text-green-600">
            <User size={16} />
            Sign In
          </Link>

          <Link href="/signup" className="flex items-center gap-1 hover:text-green-600">
            <UserPlus size={16} />
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  )
}
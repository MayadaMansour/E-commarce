"use client"

import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingCart
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#071c39] text-gray-300">

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

        {/* Brand Section */}
        <div className="space-y-6 lg:col-span-2">

          {/* Logo */}
          <div className="flex items-center gap-2 bg-white w-fit px-4 py-2 rounded-lg">

            <ShoppingCart className="text-green-600" size={24} />

            <span className="text-xl font-bold text-gray-800">
              FreshCart
            </span>

          </div>

          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            FreshCart is your one-stop destination for quality products.
            From fashion to electronics, we bring you the best brands at
            competitive prices with a seamless shopping experience.
          </p>

          {/* Contact */}
          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-green-500"/>
              +1 (800) 123-4567
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-green-500"/>
              support@freshcart.com
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500"/>
              123 Commerce Street, New York
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-3 pt-3">

            <div className="bg-[#0d2a52] p-2.5 rounded-full hover:bg-green-600 transition cursor-pointer">
              <Facebook size={16}/>
            </div>

            <div className="bg-[#0d2a52] p-2.5 rounded-full hover:bg-green-600 transition cursor-pointer">
              <Twitter size={16}/>
            </div>

            <div className="bg-[#0d2a52] p-2.5 rounded-full hover:bg-green-600 transition cursor-pointer">
              <Instagram size={16}/>
            </div>

            <div className="bg-[#0d2a52] p-2.5 rounded-full hover:bg-green-600 transition cursor-pointer">
              <Youtube size={16}/>
            </div>

          </div>

        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">Shop</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#">All Products</Link></li>
            <li><Link href="#">Categories</Link></li>
            <li><Link href="#">Brands</Link></li>
            <li><Link href="#">Electronics</Link></li>
            <li><Link href="#">Men's Fashion</Link></li>
            <li><Link href="#">Women's Fashion</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">Account</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#">My Account</Link></li>
            <li><Link href="#">Order History</Link></li>
            <li><Link href="#">Wishlist</Link></li>
            <li><Link href="#">Shopping Cart</Link></li>
            <li><Link href="#">Sign In</Link></li>
            <li><Link href="#">Create Account</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">Support</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Shipping Info</Link></li>
            <li><Link href="#">Returns & Refunds</Link></li>
            <li><Link href="#">Track Order</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">Legal</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">

        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">

          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex gap-6 pt-4 md:pt-0">
            <span className="opacity-80">Visa</span>
            <span className="opacity-80">Mastercard</span>
            <span className="opacity-80">PayPal</span>
          </div>

        </div>

      </div>

    </footer>
  )
}
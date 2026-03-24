"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingCart, Headphones, Menu } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50 mb-5">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-green-600"
        >
          🛒 FreshCart
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-[420px]">
          <Input
            placeholder="Search for products..."
            className="rounded-full pr-12 h-11"
          />

          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-green-600 hover:bg-green-700 h-9 w-9"
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition ${
                pathname === link.path
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Support */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Headphones className="text-green-600" size={20} />
            <div className="leading-tight">
              <p className="font-medium">Support</p>
              <p className="text-gray-500 text-xs">24/7 Help</p>
            </div>
          </div>

          {/* Wishlist */}
          <Heart
            className="cursor-pointer hover:text-red-500 transition"
            size={20}
          />

          {/* Cart */}
          <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-[1px]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Sign In */}
          <Button className="hidden md:flex rounded-full bg-green-600 hover:bg-green-700">
            Sign In
          </Button>

          {/* Mobile Menu Button */}
          <Menu
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block ${
                pathname === link.path
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Button className="w-full bg-green-600 hover:bg-green-700">
            Sign In
          </Button>
        </div>
      )}
    </nav>
  );
}

"use client"

import Link from "next/link"
import { Home, SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">

      <div className="text-center max-w-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <SearchX size={50} className="text-green-600" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">

          <Link
            href="/"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Browse Products
          </Link>

        </div>

      </div>

    </div>
  )
}
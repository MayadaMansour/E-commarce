"use client";

import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  return (
    <div className="mt-16 bg-gradient-to-r from-green-50 to-gray-50 rounded-2xl p-6 md:p-5">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT SIDE */}
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xl text-black font-bold">NEWSLETTER</p>
              <p className="text-xs text-gray-400">50,000+ subscribers</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Get the Freshest Updates{" "}
            <span className="text-green-600">Delivered Free</span>
          </h2>

          <p className="text-gray-500 mb-5">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <CheckCircle size={14} /> Fresh Picks Weekly
            </span>
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <CheckCircle size={14} /> Free Delivery Codes
            </span>
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <CheckCircle size={14} /> Members-Only Deals
            </span>
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
              Subscribe →
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            ✨ Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gradient-to-br from-gray-900 to-green-900 text-white rounded-2xl p-6">
          <p className="text-xs mb-2 bg-green-600 inline-block px-3 py-1 rounded-full">
            MOBILE APP
          </p>

          <h3 className="text-xl font-semibold mb-2">
            Shop Faster on Our App
          </h3>

          <p className="text-sm text-gray-300 mb-5">
            Get app-exclusive deals & 15% off your first order.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl px-4 py-3">
              🍎 Download on App Store
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3">
              ▶ Get it on Google Play
            </div>
          </div>

          {/* Rating */}
          <p className="text-xs mt-4 text-yellow-400">
            ⭐⭐⭐⭐⭐ 4.9 • 100k+ downloads
          </p>
        </div>
      </div>
    </div>
  );
}
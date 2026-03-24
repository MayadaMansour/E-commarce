"use client"

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react"

export default function Features() {
  return (
    <div className="bg-green-50 py-6 border-b mt-5">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">

        {/* Feature 1 */}
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <Truck className="text-green-600" />
          </div>

          <div>
            <h4 className="font-semibold">Free Shipping</h4>
            <p className="text-sm text-gray-500">
              On orders over 500 EGP
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <RotateCcw className="text-green-600" />
          </div>

          <div>
            <h4 className="font-semibold">Easy Returns</h4>
            <p className="text-sm text-gray-500">
              14-day return policy
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <ShieldCheck className="text-green-600" />
          </div>

          <div>
            <h4 className="font-semibold">Secure Payment</h4>
            <p className="text-sm text-gray-500">
              100% secure checkout
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <Headphones className="text-green-600" />
          </div>

          <div>
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-gray-500">
              Contact us anytime
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
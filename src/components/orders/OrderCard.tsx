"use client";

import { useState } from "react";
import Image from "next/image";
import { Order } from "../../app/interface/allorders_interfaces/Order";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShoppingBag,
} from "lucide-react";

export default function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  const firstItem = order.cartItems?.[0];

  return (
    <div className="border rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-5 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* IMAGE */}
          <div className="relative w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border">
            {firstItem?.product?.imageCover && (
              <Image
                src={firstItem.product.imageCover}
                alt={firstItem.product.title}
                fill
                className="object-contain p-2"
              />
            )}
          </div>

          <div>
            {/* STATUS */}
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              Processing
            </span>

            {/* ORDER ID */}
            <p className="font-semibold mt-1"># {order.id}</p>

            {/* INFO */}
            <p className="text-xs text-gray-400 mt-1 flex gap-4 flex-wrap items-center">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(order.createdAt).toDateString()}
              </span>

              <span className="flex items-center gap-1">
                <ShoppingBag size={14} />
                {order.cartItems?.length || 0} items
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {order.shippingAddress?.city}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <p className="font-bold text-lg">
            {order.totalOrderPrice}{" "}
            <span className="text-sm text-gray-400">EGP</span>
          </p>

          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition ${
              open ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {open ? "Hide" : "Details"}
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* DETAILS */}
      {open && (
        <div className="bg-gray-50 border-t px-5 py-6 space-y-6">
          {/* ORDER ITEMS */}
          <div>
            <p className="font-medium mb-3 text-sm">Order Items</p>

            <div className="bg-white rounded-xl border p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  {firstItem?.product?.imageCover && (
                    <Image
                      src={firstItem.product.imageCover}
                      alt={firstItem.product.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {firstItem?.product?.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    x{firstItem?.count} • {firstItem?.price} EGP
                  </p>
                </div>
              </div>

              <p className="font-semibold">{firstItem?.price} EGP</p>
            </div>
          </div>

          {/* ADDRESS + SUMMARY */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* ADDRESS */}
            <div className="bg-white p-4 rounded-xl border">
              <p className="font-medium mb-2 text-sm">Delivery Address</p>

              <p className="text-sm font-medium">
                {order.shippingAddress?.city}
              </p>

              <p className="text-xs text-gray-400">
                {order.shippingAddress?.details}
              </p>

              <p className="text-xs mt-1">{order.shippingAddress?.phone}</p>
            </div>

            {/* SUMMARY */}
            <div className="bg-yellow-100 p-4 rounded-xl border">
              <p className="font-medium mb-2 text-sm">Order Summary</p>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{order.totalOrderPrice} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">
                  {order.shippingPrice === 0
                    ? "Free"
                    : `${order.shippingPrice} EGP`}
                </span>
              </div>

              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>{order.totalOrderPrice} EGP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

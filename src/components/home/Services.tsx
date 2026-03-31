"use client";

import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const services = [
  {
    icon: <Truck className="text-green-600" />,
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
  },
  {
    icon: <ShieldCheck className="text-green-600" />,
    title: "Secure Payment",
    desc: "100% secure transactions",
  },
  {
    icon: <RotateCcw className="text-orange-500" />,
    title: "Easy Returns",
    desc: "14-day return policy",
  },
  {
    icon: <Headphones className="text-purple-500" />,
    title: "24/7 Support",
    desc: "Dedicated support team",
  },
];

export default function Services() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
      {services.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
          <div>
            <h4 className="font-semibold text-sm">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
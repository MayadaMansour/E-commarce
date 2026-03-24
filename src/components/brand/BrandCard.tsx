"use client";

import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/src/app/interface/Brand";

export default function BrandCard({
  brand,
}: {
  brand: Brand;
}) {
  return (
    <Link href={`/brands/${brand._id}`} className="group">
      <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">

        {/* LOGO BOX */}
        <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-xl">
          <Image
            src={brand.image || "/placeholder.png"}
            alt={brand.name}
            width={80}
            height={40}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* NAME */}
        <h3 className="text-m font-bold text-gray-700 group-hover:text-black transition">
          {brand.name}
        </h3>
      </div>
    </Link>
  );
}
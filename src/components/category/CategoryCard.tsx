"use client";

import Image from "next/image";
import Link from "next/link";
import { Category } from "@/src/app/interface/Category";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link href={`/categories/${category._id}`} className="group block">
      <div className="relative h-56 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">

        {/* IMAGE */}
        <Image
          src={category.image || "/placeholder.png"}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* SOFT OVERLAY */}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition duration-500" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide capitalize transition-transform duration-500 group-hover:translate-y-[-2px]">
            {category.name}
          </h3>

          {/* underline animation */}
          <div className="w-0 h-[2px] bg-white mt-1 transition-all duration-500 group-hover:w-14" />
        </div>

        {/* BADGE */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow">
          Explore
        </div>

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5" />

      </div>
    </Link>
  );
}
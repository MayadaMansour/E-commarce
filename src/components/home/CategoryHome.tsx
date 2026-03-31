"use client";

import Link from "next/link";
import { Category } from "../../app/interface/Category";
import Image from "next/image";

export default function CategoriesHome({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div>
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span className="w-1 h-5 bg-green-600 rounded"></span>
          Shop By <span className="text-green-600">Category</span>
        </h1>

    <Link href="/categories" className="text-green-600 text-sm hover:underline">
          View All →
        </Link>
      </div>

      {/* Scroll Row */}
      <div className="flex gap-15 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="min-w-[90px] flex-shrink-0 text-center group cursor-pointer"
          >
            {/* Circle */}
            <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border bg-gray-50 transition group-hover:shadow-lg group-hover:scale-105">
              <Image
                src={cat.image || "/placeholder.png"}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Name */}
            <p className="text-xs font-medium transition group-hover:text-green-600">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
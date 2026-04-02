"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, ShoppingCart } from "lucide-react";
import { apiServices } from "@/src/app/service/api";
import { useCart } from "@/src/context/CartContext";
import { toast } from "sonner";
import { ProductWishList } from "@/src/app/interface/wishlist_interface/ProductInterface";

interface WishlistItemProps {
  item: ProductWishList;
  onDelete: (productId: string) => void;
}

export default function WishlistItem({ item, onDelete }: WishlistItemProps) {
  const [isAddingCart, setAddingCart] = useState(false);
  const { refreshCart } = useCart();

  const handleAddCart = async () => {
    if (isAddingCart) return;

    try {
      setAddingCart(true);

      const response = await apiServices.addProductsToCart(item._id);

      console.log("ADD TO CART:", response); // 👀 مهم

      if (response?.status === "success") {
        toast.success("Added to cart 🛒");
        await refreshCart();
      } else {
        toast.error(response?.message || "Error adding product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-4 border hover:shadow-lg transition-all duration-300 group">
      {/* LEFT */}
      <div className="flex items-center gap-4 flex-1">
        {/* IMAGE */}
        <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border">
          <Image
            src={item.imageCover || "/placeholder.png"}
            alt={item.title}
            fill
            className="object-contain p-2 group-hover:scale-105 transition"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-green-600 transition">
            {item.title}
          </h3>

          <p className="text-xs text-gray-400">{item.category?.name}</p>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-base font-bold text-green-600">
              {item.price} EGP
            </span>

            <span className="text-[11px] bg-green-100 text-green-600 px-2 py-1 rounded-full">
              In Stock
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* ADD TO CART */}
        <button
          onClick={handleAddCart}
          disabled={isAddingCart}
          className="flex items-center gap-3 bg-green-600 text-white  p-3 rounded-xl text-xs font-medium hover:bg-green-700 transition"
        >
          {isAddingCart ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              Add To Cart
            </>
          )}
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(item._id)}
          className="p-3 rounded-lg bg-gray-100 hover:bg-red-100 transition group"
        >
          <Trash2
            size={16}
            className="text-gray-500 group-hover:text-red-500 transition"
          />
        </button>
      </div>
    </div>
  );
}

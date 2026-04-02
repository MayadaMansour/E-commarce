"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import WishlistItem from "../../components/wishlist/WishlistItem";
import { apiServices } from "../../app/service/api";
import { useCart } from "@/src/context/CartContext";
import { ProductWishList } from "@/src/app/interface/wishlist_interface/ProductInterface";
import { Button } from "../ui/button";
import Link from "next/link";

interface WishlistHeaderProps {
  initialItems: ProductWishList[];
}

export default function WishlistHeader({ initialItems }: WishlistHeaderProps) {
  const [items, setItems] = useState<ProductWishList[]>(
    Array.isArray(initialItems) ? initialItems : []
  );

  const { refreshCart, refreshWishlist, setWishlistCount } = useCart();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function handleDelete(productId: string) {
    try {
      setIsDeleting(productId);
      const response = await apiServices.deleteWishListItem(productId);
      if (response?.status === "success") {
        setItems((prev) => prev.filter((item) => item._id !== productId));
        setWishlistCount((prev) => Math.max(prev - 1, 0));
        await refreshCart();
        await refreshWishlist();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  }

  if (!items.length) {
    return (
      <section>
        <div className="container max-w-lg text-center m-40">
          <h1 className="mb-4 text-2xl font-semibold">
            Your wishlist is empty 💔
          </h1>

          <p className="mb-8 text-muted-foreground">
            Save items you love to see them here later.
          </p>

          <Button asChild className="p-5">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <Heart className="text-red-500" size={18} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">My Wishlist</h2>
            <p className="text-xs text-gray-400">
              {items.length} items saved
            </p>
          </div>
        </div>

        <Link href="/shop" className="text-sm text-green-600 hover:underline">
          Continue Shopping →
        </Link>
      </div>

      {/* ITEMS */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <WishlistItem
            key={item._id} 
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
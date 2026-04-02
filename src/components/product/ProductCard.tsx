"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@heroui/react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "../../app/interface/Product";
import { apiServices } from "@/src/app/service/api";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";

export default function ProductCard(product: Product) {
  const {
    _id,
    title,
    price,
    images,
    imageCover,
    category,
    ratingsAverage,
    ratingsQuantity,
    sold,
  } = product;

  const productImages = images?.length ? images : [imageCover];

  const [currentImage, setCurrentImage] = useState(0);
  const [isAddingCart, setAddingCart] = useState(false);
  const [isAddedCart, setAddedCart] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isAddingWish, setAddingWish] = useState(false);
const { refreshCart, setWishlistCount } = useCart();

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  const isPopular = sold && sold > 1000;
  const discount = 20;
  const oldPrice = price;
  const newPrice = price - price * (discount / 100);

  const handleAddCart = async () => {
    if (isAddedCart || isAddingCart) return;
    try {
      setAddingCart(true);
      const response = await apiServices.addProductsToCart(_id);
      toast.success(response.message, {
        style: { color: "green" },
      });
      await refreshCart();
      setAddedCart(true);
      setTimeout(() => setAddedCart(false), 2000);
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setAddingCart(false);
    }
  };

 const handleAddWishList = async () => {
  if (isAddingWish) return;
  try {
    setAddingWish(true);
    const res = await apiServices.addWishListItem(_id);
    if (res.status === "success") {
      setIsFav(true);
      setWishlistCount((prev) => prev + 1);
      toast.success("Added To WishList❤️", {
        style: { color: "green" },
      });
    } else {
      toast.error(res.status);
    }
  } catch (error) {
    toast.error("Failed to add product");
  } finally {
    setAddingWish(false);
  }
};

  return (
    <Card className="group h-[440px] border rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] flex flex-col">
      {/* IMAGE */}
      <div className="relative h-56 bg-gray-50 overflow-hidden flex-shrink-0">
        <Image
          src={productImages[currentImage]}
          alt={title}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />

        {/* BADGE */}
        {isPopular && (
          <span className="absolute top-3 left-3 text-[11px] px-3 py-1 rounded-full text-white font-semibold bg-orange-500 shadow">
            🔥 Popular
          </span>
        )}

        {/* FAVORITE */}
        <button
          onClick={handleAddWishList}
          className={`absolute top-3 right-3 backdrop-blur p-2 rounded-full shadow transition 
  ${
    isFav
      ? "bg-red-500 text-white"
      : "bg-white/90 hover:bg-red-500 hover:text-white"
  }`}
        >
          {isAddingWish ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Heart size={16} fill={isFav ? "white" : "none"} />
          )}
        </button>

        {/* ARROWS */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* ADD TO CART */}
        <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 p-3">
          <button
            onClick={handleAddCart}
            disabled={isAddingCart}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition"
          >
            {isAddingCart ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add To Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* BODY */}
      <Link href={`/shop/${_id}`}>
        <CardBody className="space-y-1.5 flex-grow px-4 pt-3 pb-1">
          {category && (
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              {category.name}
            </p>
          )}

          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-green-600 transition">
            {title}
          </h3>

          {ratingsAverage && (
            <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
              <Star size={14} fill="currentColor" />
              <span className="text-gray-600">
                {ratingsAverage} ({ratingsQuantity})
              </span>
            </div>
          )}
        </CardBody>
      </Link>

      {/* FOOTER */}
      <CardFooter className="flex justify-between items-center px-4 pt-2 pb-4">
        <div className="flex flex-col gap-[2px]">
          <span className="text-base font-semibold text-green-600">
            {formatPrice(newPrice)}
          </span>

          <span className="text-[11px] text-gray-400 line-through">
            {formatPrice(oldPrice)}
          </span>
        </div>

        <button className="bg-green-100 p-2.5 rounded-full hover:bg-green-600 hover:text-white transition">
          <ShoppingCart size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CircleCheck,
  Star,
  StarHalf,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { Product } from "../../app/interface/Product ";
import { apiServices } from "@/src/app/service/api";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useCart } from "../../context/CartContext";

const MAX_STARS = 5;

export default function ProductDetail({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : [product.imageCover];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openGallery, setOpenGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshCart } = useCart();

  const next = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prev = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const isPopular = product.sold > 500;

  const renderStars = () => {
    const full = Math.floor(product.ratingsAverage);
    const half = product.ratingsAverage % 1 >= 0.5;

    const stars = [];

    for (let i = 0; i < full; i++) {
      stars.push(
        <Star key={i} className="size-4 fill-yellow-500 stroke-yellow-500" />,
      );
    }

    if (half) {
      stars.push(
        <StarHalf
          key="half"
          className="size-4 fill-yellow-500 stroke-yellow-500"
        />,
      );
    }

    while (stars.length < MAX_STARS) {
      stars.push(<Star key={stars.length} className="size-4 text-gray-300" />);
    }

    return stars;
  };

  async function addCart() {
    setIsLoading(true);
    const response = await apiServices.addProductsToCart(product._id);
    setIsLoading(false);

    console.log(response);
    toast.success(response.message, {
      style: {
        color: "green",
      },
    });
    await refreshCart();
  }

  return (
    <section className="py-16">
      {/* breadcrumb */}

      <div className="container mx-auto mb-10 text-sm text-gray-500">
        Home / {product.category?.name} /{" "}
        <span className="text-black font-medium">{product.title}</span>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* ================= LEFT SIDE ================= */}

        <div className="flex flex-col items-center">
          {/* MAIN IMAGE */}

          <div
            className="relative w-[450px] h-[450px] border rounded-xl bg-white shadow-sm overflow-hidden group cursor-zoom-in"
            onClick={() => setOpenGallery(true)}
          >
            <Image
              src={images[currentImage]}
              alt={product.title}
              fill
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-125"
            />

            {isPopular && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* thumbnails */}

          <div className="flex gap-4 mt-6">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-[90px] h-[90px] border rounded-lg overflow-hidden transition
            ${
              currentImage === index
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
              >
                <Image src={img} alt="product" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">{renderStars()}</div>

            <span className="text-sm text-gray-500">
              {product.ratingsAverage}
            </span>

            <span className="text-sm text-gray-500">
              ({product.ratingsQuantity} reviews)
            </span>

            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CircleCheck size={16} />
              In Stock
            </span>
          </div>

          <div className="text-3xl font-bold text-black">
            {/* {product.price} EGP */}
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* quantity */}

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity</span>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={decrease}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-4 flex items-center">{quantity}</span>

              <button
                onClick={increase}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* add to cart */}

          <button
            onClick={addCart}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add To Cart
              </>
            )}
          </button>

          {/* product info */}

          <div className="border-t pt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Brand</span>
              <span>{product.brand?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span>{product.category?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Sold</span>
              <span>{product.sold > 1000 ? "1000+" : product.price}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Available</span>
              <span>{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN GALLERY */}

      {openGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <button
            onClick={() => setOpenGallery(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={32} />
          </button>

          <div className="relative w-[700px] h-[700px]">
            <Image
              src={images[currentImage]}
              alt="gallery"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

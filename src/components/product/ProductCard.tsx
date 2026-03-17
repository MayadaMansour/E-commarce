"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "../../app/interface/Product ";
import { apiServices } from "@/src/app/service/api";
import { toast } from "sonner";

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
      console.log(response);
      toast.success(response.message, {
        style: {
          color: "green",
        },
      });
      setAddedCart(true);
      setTimeout(() => setAddedCart(false), 2000);
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <Link href={`/shop/${_id}`}>
      <Card className="group h-[460px] border rounded-2xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
        {/* IMAGE */}
        <div className="relative h-64 bg-white overflow-hidden flex-shrink-0">
          <Image
            src={productImages[currentImage]}
            alt={title}
            fill
            className="object-contain p-4"
          />

          {/* POPULAR BADGE */}
          {isPopular && (
            <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white font-semibold bg-orange-500">
              POPULAR
            </span>
          )}

          {/* FAVORITE */}
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
            <Heart size={18} />
          </button>

          {/* ARROWS */}
          {productImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* ADD TO CART HOVER */}
          <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 p-3">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAddCart();
              }}
              color="primary"
              className="w-full flex items-center gap-2"
              isLoading={isAddingCart}
            >
              <ShoppingCart size={16} />
              {isAddedCart ? "Added" : "Add To Cart"}
            </Button>
          </div>
        </div>

        {/* BODY */}
        <CardBody className="space-y-3 flex-grow">
          {category && (
            <p className="text-xs text-gray-400 uppercase">{category.name}</p>
          )}

          <h3 className="font-semibold text-base line-clamp-3">{title}</h3>

          {ratingsAverage && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm text-gray-700">
                {ratingsAverage} ({ratingsQuantity})
              </span>
            </div>
          )}
        </CardBody>

        {/* FOOTER */}
        <CardFooter className="flex justify-between items-end">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-primary">
              {formatPrice(newPrice)}
            </span>

            <span className="text-sm text-gray-400 line-through mt-1">
              {formatPrice(oldPrice)}
            </span>
          </div>

          <Button isIconOnly color="primary" radius="full" variant="flat">
            <ShoppingCart size={18} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

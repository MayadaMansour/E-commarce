"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "../../app/interface/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = product.images?.length ? product.images : [product.imageCover];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const isPopular = product.sold > 1000;

  return (
    <Card className="group border rounded-2xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative h-64 bg-white overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={product.title}
          fill
          className="object-contain p-4"
        />

        {/* BADGE */}
        {isPopular && (
          <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white font-semibold bg-orange-500">
            POPULAR
          </span>
        )}

        {/* Favorite */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
          <Heart size={18} />
        </button>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Add To Cart Hover */}
        <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 p-3">
          <Button color="primary" className="w-full flex items-center gap-2">
            <ShoppingCart size={16} />
            Add To Cart
          </Button>
        </div>
      </div>

      {/* BODY */}
      <CardBody className="space-y-1">
        <p className="text-xs text-gray-400 uppercase">
          {product.category?.name}
        </p>

        <h3 className="font-semibold text-base line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-gray-700">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
      </CardBody>

      {/* FOOTER */}
      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {product.price} EGP
          </span>
        </div>

        <Button isIconOnly color="primary" radius="full" variant="flat">
          <ShoppingCart size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}

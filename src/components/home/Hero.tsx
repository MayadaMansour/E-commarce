"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero1.webp",
    title: "Fresh Products Delivered \n to your Door",
    desc: "Get 20% off your first order",
  },
  {
    id: 2,
    image: "/images/hero2.webp",
    title: "Daily Fresh Vegetables",
    desc: "Best quality at best price",
  },
  {
    id: 3,
    image: "/images/hero3.avif",
    title: "Fast Delivery Service",
    desc: "Delivered within 24 hours",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-2xl">
      {/* Image */}
      <Image
        src={slides[current].image}
        alt="hero"
        fill
        className="object-cover transition-all duration-700"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-600/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 text-white z-10 mx-20">
        <h1 className="whitespace-pre-line text-3xl font-bold mb-2">
          {slides[current].title}
        </h1>
        <p className="mb-5 opacity-90">{slides[current].desc}</p>

        <div className="flex gap-3">
          <button className="bg-white text-green-700 px-5 py-2 rounded-lg">
            Shop Now
          </button>

          <button className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-green-700 transition">
            View Deals
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full z-20"
      >
        <ChevronLeft className="text-green-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full z-20"
      >
        <ChevronRight className="text-green-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

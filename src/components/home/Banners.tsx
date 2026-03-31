"use client";

export default function Banners() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      
      {/* Left Banner */}
      <div className="bg-green-600 text-white p-6 rounded-2xl relative overflow-hidden">
        <p className="text-xs mb-2">🔥 Deal of the Day</p>
        <h3 className="text-xl font-bold mb-2">
          Fresh Organic Fruits
        </h3>
        <p className="text-sm mb-4">
          Get up to 40% off on selected organic fruits
        </p>

        <h2 className="text-2xl font-bold mb-4">40% OFF</h2>

        <button className="bg-white text-green-700 px-4 py-2 rounded-full">
          Shop Now →
        </button>
      </div>

      {/* Right Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl">
        <p className="text-xs mb-2">✨ New Arrivals</p>
        <h3 className="text-xl font-bold mb-2">
          Exotic Vegetables
        </h3>
        <p className="text-sm mb-4">
          Discover our latest collection of premium vegetables
        </p>

        <h2 className="text-2xl font-bold mb-4">25% OFF</h2>

        <button className="bg-white text-orange-600 px-4 py-2 rounded-full">
          Explore Now →
        </button>
      </div>
    </div>
  );
}
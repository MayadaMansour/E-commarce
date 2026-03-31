import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { apiServices } from "../../app/service/api";
import { Product } from "../../app/interface/Product";

export default async function ProductHome() {
  const products: Product[] = await apiServices.getProducts();

  return (
    <div >
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span className="w-1 h-5 bg-green-600 rounded"></span>
          Featured <span className="text-green-600">Products</span>
        </h1>

        <Link href="/shop" className="text-green-600 text-sm hover:underline">
          View All →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.slice(0, 20).map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}

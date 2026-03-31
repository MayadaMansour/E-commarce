import ProductCard from "@/src/components/product/ProductCard";
import { apiServices } from "../service/api";
import { Product } from "../interface/Product ";

export default async function Shop() {
  const products: Product[] = await apiServices.getProducts();

  return (
    <div className="px-4 md:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
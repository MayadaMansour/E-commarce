import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "../interface/Product ";
import { apiServices } from "../service/api";

export default async function Shop() {

  const products: Product[] = await apiServices.getProducts();

  return (
    <div className="container mx-auto py-10">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}
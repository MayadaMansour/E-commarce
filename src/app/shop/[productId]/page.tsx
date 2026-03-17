import { apiServices } from "../../service/api";
import ProductDetails from "@/src/components/product/ProductDetails";

export default async function ShopDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = await params.then((res) => res.productId);

  const product = await apiServices.getProductDetails(productId);

  return <ProductDetails product={product} />;
}



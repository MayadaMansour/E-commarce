import { Brand } from "../interface/Brand ";
import { apiServices } from "../service/api";
import BrandCard from "@/src/components/brand/BrandCard";



export default async function Brands() {
  const res = await apiServices.getBrands();
  const brands: Brand[] = res.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
      {brands.map((brands) => (
        <BrandCard key={brands._id} brand={brands} />
      ))}
    </div>
  );
}
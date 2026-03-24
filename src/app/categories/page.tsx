import CategoryCard from "@/src/components/category/CategoryCard";
import { apiServices } from "../service/api";
import { Category } from "../interface/Category ";

export default async function Categories() {
  const res = await apiServices.getCategories();
  const categories: Category[] = res.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {categories.map((cat) => (
        <CategoryCard key={cat._id} category={cat} />
      ))}
    </div>
  );
}
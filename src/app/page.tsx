import Services from "../components/home/Services";
import Hero from "../components/home/Hero";
import CategoriesHome from "../components/home/CategoryHome";
import { apiServices } from "../app/service/api";
import { Category } from "../app/interface/Category ";
import Banners from "../components/home/Banners";
import ProductHome from "../components/home/ProductHome";
import NewsletterSection from "../components/home/NewsletterSection";

export default async function Home() {
  const res = await apiServices.getCategories();
  const categories: Category[] = res.data;

  return (
    <div className="px-6 space-y-10">
      <Hero />
      <Services />
      <CategoriesHome categories={categories} />
      <Banners />
      <ProductHome/>
      <NewsletterSection/>
    </div>
  );
}

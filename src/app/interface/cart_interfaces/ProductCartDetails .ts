import { Brand } from "../Brand ";
import { Category } from "../Category ";
import { SubCategory } from "../SubCategory ";


export interface ProductCartDetails {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
  brand: Brand;
  subcategory: SubCategory[];
}
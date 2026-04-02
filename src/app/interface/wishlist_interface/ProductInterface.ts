import { Brand } from "../Brand ";
import { Category } from "../Category ";
import { SubCategory } from "../SubCategory ";

export interface ProductWishList {
  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  price: number;
  quantity: number;
  sold: number;

  imageCover: string;
  images: string[];

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;

  category: Category;
  brand: Brand;
  subcategory: SubCategory[];
}

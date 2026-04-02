import { ProductWishList } from "./ProductInterface";

export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductWishList[];
}
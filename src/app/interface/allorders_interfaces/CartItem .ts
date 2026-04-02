import { Product } from "../Product ";

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}
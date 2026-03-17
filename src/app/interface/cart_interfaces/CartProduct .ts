import { ProductCartDetails } from "./ProductCartDetails ";

export interface CartProduct {
  count: number;
  _id: string;
  product: ProductCartDetails;
  price: number;
}
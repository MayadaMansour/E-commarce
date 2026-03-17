import {CartProduct} from "../cart_interfaces/CartProduct "
export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
}
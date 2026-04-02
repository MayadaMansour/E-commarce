import { ShippingAddress } from "./ShippingAddress";
import { OrderUser } from "./User";
import { CartItem } from "./CartItem ";

export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: OrderUser;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
}
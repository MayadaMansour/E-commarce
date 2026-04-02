import { Order } from "./Order";

export interface OrdersResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  data: Order[] ;
}
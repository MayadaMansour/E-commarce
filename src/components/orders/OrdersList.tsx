"use client";

import { Order } from "../../app/interface/allorders_interfaces/Order";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="flex flex-col gap-6">
        {(orders || []).map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
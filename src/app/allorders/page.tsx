import { apiServices } from "@/src/app/service/api";
import OrdersList from "@/src/components/orders/OrdersList";

export default async function OrdersPage() {
  const userId = "69cd1542460be8e0dbc84ef6";

  const orders = await apiServices.getAllOrders(userId);

  return <OrdersList orders={orders || []} />;
}
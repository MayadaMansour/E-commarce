import { apiServices } from "../service/api"
import { ShoppingCart2 } from "./innerCart";

export default  async function Cart() {
  const response = await apiServices.getProductsCart();
  return (
    <ShoppingCart2 cart={response}/>
  )
}

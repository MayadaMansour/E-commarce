import { Product } from "../interface/Product ";

const BASE_URL = "https://ecommerce.routemisr.com";

class ApiServices {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    const data = await response.json();
    return data.data;
  }
}

export const apiServices = new ApiServices();

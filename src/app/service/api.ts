import { CartResponse } from "../interface/cart_interfaces/CartResponse ";
import { Product } from "../interface/Product ";

const BASE_URL = "https://ecommerce.routemisr.com";
const header = {
  "Content-Type": "application/json",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjhlOTE2MTcxMzlhZWEyYjA3YzkxNyIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzczNzI1OTc1LCJleHAiOjE3ODE1MDE5NzV9.QfkBuoBCV7c006pN0l3nIenUt_YQdF4HQjfXNcFuZd4",
};

class ApiServices {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    const data = await response.json();
    return data.data;
  }

  async getProductDetails(productId: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/api/v1/products/${productId}`);
    const data = await response.json();
    return data.data;
  }

  async addProductsToCart(productId: string): Promise<CartResponse> {
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
      }),
      headers: header,
    });
    const data = await response.json();
    return data;
  }

  async getProductsCart(): Promise<CartResponse> {
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
      headers: header,
    });
    const data = await response.json();
    return data;
  }

  async deleteProductsCart(productId: string): Promise<CartResponse> {
    const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
      method: "Delete",
      headers: header,
    });
    const data = await response.json();
    return data;
  }

  async clearProductsCart(): Promise<CartResponse> {
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
      method: "Delete",
      headers: header,
    });
    const data = await response.json();
    return data;
  }

  async updateProductsCart(
    productId: string,
    count: number,
  ): Promise<CartResponse> {
    const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
      method: "Put",
      headers: header,
      body: JSON.stringify({
        count,
      }),
    });
    const data = await response.json();
    return data;
  }
}

export const apiServices = new ApiServices();

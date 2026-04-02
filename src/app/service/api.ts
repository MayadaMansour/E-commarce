import { Brand } from "../interface/Brand ";
import { CartResponse } from "../interface/cart_interfaces/CartResponse ";
import { Category } from "../interface/Category ";
import { Product } from "../interface/Product ";
import { ProductWishList } from "../interface/wishlist_interface/ProductInterface";
import { WishlistResponse } from "../interface/wishlist_interface/WishListResponse";

const BASE_URL = "https://ecommerce.routemisr.com";
const header = {
  "Content-Type": "application/json",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Y2RlZmFhNDYwYmU4ZTBkYmM5YzI3MSIsIm5hbWUiOiJNYXlhZGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NTEwMzk0NSwiZXhwIjoxNzgyODc5OTQ1fQ.Y4j5umea2ASW3oiCOoTWXlslruf-xu-4Z68ek7yjk6I",
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
  async getCategories(): Promise<{ data: Category[] }> {
    const response = await fetch(`${BASE_URL}/api/v1/categories`);
    const data = await response.json();
    return data;
  }

  async getBrands(): Promise<{ data: Brand[] }> {
    const response = await fetch(`${BASE_URL}/api/v1/brands`);
    const data = await response.json();
    return data;
  }




  async addWishListItem(productId: string): Promise<WishlistResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ productId }),
  });

  return await response.json();
}

async getWishListItem(): Promise<WishlistResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    headers: header,
  });

  return await response.json();
}

async deleteWishListItem(productId: string): Promise<WishlistResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: header,
  });

  return await response.json();
}
}

export const apiServices = new ApiServices();

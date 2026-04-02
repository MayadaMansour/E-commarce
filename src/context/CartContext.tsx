"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiServices } from "@/src/app/service/api";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  async function refreshCart() {
    try {
      const res = await apiServices.getProductsCart();
      setCartCount(res.numOfCartItems || 0);
    } catch (error) {
      console.log("Cart Error:", error);
      setCartCount(0);
    }
  }

  async function refreshWishlist() {
    try {
      const res = await apiServices.getWishListItem();
      setWishlistCount(res.count || 0);
    } catch (error) {
      console.log("Cart Error:", error);
      setWishlistCount(0);
    }
  }

  useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart,
        wishlistCount,
        refreshWishlist,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

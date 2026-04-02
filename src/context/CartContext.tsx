"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiServices } from "@/src/app/service/api";

type CartContextType = {
  cartCount: number;
  wishlistCount: number;
  refreshCart: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>; 
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  async function refreshCart() {
    try {
      const res = await apiServices.getProductsCart();
      setCartCount(res?.numOfCartItems ?? 0);
    } catch (error) {
      console.log("Cart Error:", error);
      setCartCount(0);
    }
  }

  async function refreshWishlist() {
    try {
      const res = await apiServices.getWishListItem();

      setWishlistCount(
        res?.count ??
        res?.data?.length ??
        0
      );
    } catch (error) {
      console.log("Wishlist Error:", error);
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
        wishlistCount,
        refreshCart,
        refreshWishlist,
        setWishlistCount, 
      }}
    >
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
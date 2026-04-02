"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartResponse } from "../interface/cart_interfaces/CartResponse ";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { apiServices } from "../service/api";
import CartProduct from "@/src/components/product/CartProduct";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

const ShoppingCart2 = ({ cart }: { cart: CartResponse }) => {
  const [innerCart, setInnerCart] = useState<CartResponse>(cart);
  const [isLoading, setIsLoading] = useState(false);
  // const [checkoutLoading, setcheckoutLoading] = useState(false);
  const { refreshCart } = useCart();
  const router = useRouter();

  async function removeItem(productId: string) {
    const response = await apiServices.deleteProductsCart(productId);
    setInnerCart(response);
    await refreshCart();
  }
  async function clearCart() {
    setIsLoading(true);
    const response = await apiServices.clearProductsCart();
    setInnerCart(response);
    setIsLoading(false);
    await refreshCart();
  }
  async function updateCount(productId: string, count: number) {
    const response = await apiServices.updateProductsCart(productId, count);
    setInnerCart(response);
  }
  // async function handleCheckout() {
  //   try {
  //     setcheckoutLoading(true);
  //     const response = await apiServices.checkout(cart.cartId);
  //     if (response.status === "success") {
  //       location.href = response.session.url;
  //     } else {
  //       alert(response.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setcheckoutLoading(false);
  //   }
  // }

  if (!innerCart?.data || innerCart.numOfCartItems === 0) {
    return (
      <section>
        <div className="container max-w-lg text-center m-40">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }
  return (
    <section className="py-5">
      <div className="container grid gap-8">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCart.data.products.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  removeItem={removeItem}
                  updateCount={updateCount}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShoppingCart className="size-4" />
                    {innerCart.numOfCartItems}{" "}
                    {innerCart.numOfCartItems === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                </div>
              </div>

              {/* <Button
                size="lg"
                className="mt-6 w-full"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading&&<Loader2 className="animate-spin"/>}
                Proceed to Checkout
              </Button> */}
              <Button
                size="lg"
                className="mt-6 w-full bg-green-600 hover:bg-green-500"
                onClick={() => router.push(`/checkout/${cart.cartId}`)}
              >
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={clearCart}
          className="w-fit px-8 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
          Clear All
        </Button>
      </div>
    </section>
  );
};

export { ShoppingCart2 };

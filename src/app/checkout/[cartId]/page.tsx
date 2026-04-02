"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { apiServices } from "@/src/app/service/api";

type ShippingAddress = {
  city: string;
  phone: string;
  details: string;
};

export default function CheckoutPage() {
  const { cartId } = useParams();

  const [form, setForm] = useState<ShippingAddress>({
    city: "",
    phone: "",
    details: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("online");
  const [loading, setLoading] = useState(false);

  // ✅ نفس فكرة handleCheckout بتاعتك
  async function handleCheckout() {
    // validation
    if (!form.city || !form.phone || !form.details) {
      alert("Please fill all fields ❌");
      return;
    }

    if (form.phone.length < 10) {
      alert("Invalid phone ❌");
      return;
    }

    try {
      setLoading(true);

      // 🔥 ONLINE (Stripe)
      if (paymentMethod === "online") {
        const response = await apiServices.checkout(
          cartId as string,
          form
        );

        if (response?.status === "success") {
          location.href = response.session.url;
        } else {
          alert(response?.message);
        }
      }

      // 🔥 CASH
      else {
        const response = await apiServices.cashOrder(
          cartId as string,
          form
        );

        if (response?.status === "success") {
          alert("Order placed successfully ✅");
        } else {
          alert(response?.message);
        }
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 p-6">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        {/* SHIPPING */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-green-500 text-white p-4 font-semibold">
            Shipping Address
          </div>

          <div className="p-5 space-y-4">
            
            <input
              placeholder="City"
              className="w-full border rounded-lg p-3"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input
              placeholder="Street Address"
              className="w-full border rounded-lg p-3"
              value={form.details}
              onChange={(e) =>
                setForm({ ...form, details: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>
        </div>

        {/* PAYMENT */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-green-500 text-white p-4 font-semibold">
            Payment Method
          </div>

          <div className="p-5 space-y-3">

            {/* CASH */}
            <div
              onClick={() => setPaymentMethod("cash")}
              className={`p-4 border rounded-lg cursor-pointer ${
                paymentMethod === "cash"
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}
            >
              Cash on Delivery
            </div>

            {/* ONLINE */}
            <div
              onClick={() => setPaymentMethod("online")}
              className={`p-4 border rounded-lg cursor-pointer ${
                paymentMethod === "online"
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}
            >
              Pay Online (Credit Card)
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="border rounded-xl p-5 h-fit">
        <h2 className="font-semibold mb-4">Order Summary</h2>

        <p className="text-sm text-gray-500">Shipping: Free</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-4"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
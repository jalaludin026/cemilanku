"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CartView = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold">Keranjang</h1>
      {cart.length === 0 ? (
        <p className="text-xl text-gray-500">Belum ada item di keranjang</p>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border p-3 flex-col sm:flex-row gap-2"
            >
              <div className="flex gap-2">
                <img
                  src={item.imageUrl}
                  className="w-24 h-24 object-cover"
                  alt=""
                />
                <div>
                  <h2 className="text-lg  font-bold">
                    {item.name.length > 20
                      ? `${item.name.slice(0, 20)}...`
                      : item.name}
                  </h2>
                  <p>
                    {item.price.toLocaleString("id", {
                      currency: "IDR",
                      style: "currency",
                      maximumFractionDigits: 0,
                    })}{" "}
                    x {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
                >
                  Remove
                </button>

                <Link
                  href={"/checkout/" + item.slug + "?quantity=" + item.quantity}
                  className="py-2 px-3 bg-green-500 text-white rounded hover:bg-green-600 font-bold"
                >
                  Checkout
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartView;

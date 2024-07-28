"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import DetailProductSkeleton from "./DetailProductSkeleton";

const DetailProductView = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      title: "Success!",
      text: `${product.name} has been added to your cart.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  if (loading) {
    return <DetailProductSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-5 flex flex-col sm:flex-row space-x-5">
      <div className="w-full sm:w-1/2">
        <img
          src={product?.imageUrl}
          alt=""
          className="w-full h-96 object-contain"
        />
      </div>
      <div className="w-full sm:w-1/2 space-y-3">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="font-semibold">
          {product?.price.toLocaleString("id", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
          })}
        </p>
        <div className="flex space-x-2">
          <Link
            href={"/checkout/" + product?.slug}
            className="py-2 px-3 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 font-bold"
          >
            Checkout
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 font-bold"
          >
            <FaCartPlus />
            Add to Cart
          </button>
        </div>
        <p className="text-xs text-gray-500">{product?.category.name}</p>
        <hr />

        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
      </div>
    </div>
  );
};

export default DetailProductView;

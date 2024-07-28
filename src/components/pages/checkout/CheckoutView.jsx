"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
const CheckoutView = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // swal confirm
    Swal.fire({
      title: "Confirm checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const textWhatsapp = `Halo Cemilanku,%0A%0ASaya ingin memesan produk ${
          product.name
        }.%0A%0ADetail Pesanan:%0A- Produk: ${product.name}%0A- Harga: ${
          product.price
        }%0A- Kuantitas: ${qty}%0A- Total: ${
          product.price * qty
        }%0A%0AAlamat Pengiriman:%0A- Alamat: ${
          data.address
        }%0A- No. Handphone: ${data.phone}%0A%0ANama Pemesan: ${
          data.name
        }%0A%0ALink Produk: ${process.env.NEXT_PUBLIC_BASE_URL}/products/${
          product.slug
        }`;

        window.open(
          `https://wa.me/628777335248?text=${textWhatsapp}`,
          "_blank"
        );
      }
    });
  };

  useEffect(() => {
    const quantity = searchParams.get("quantity");

    if (quantity) {
      setQty(Number(quantity));
    }

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .finally(() => {
        Swal.close();
      });
  }, []);

  if (!product) {
    return null;
  }
  return (
    <div className="space-y-3 w-full">
      <div className="max-w-7xl mx-auto p-5 flex flex-col gap-5 sm:flex-row items-start">
        <div className="flex-1 w-full  space-y-5">
          <div className="p-3 border rounded flex gap-3">
            <img
              src={product?.imageUrl}
              alt=""
              className="w-24 h-24 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">{product?.name}</h1>
              <p className="text-sm font-semibold">
                {product?.price.toLocaleString("id", {
                  currency: "IDR",
                  style: "currency",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 w-full p-3 border rounded space-y-3"
        >
          <h1 className="text-xl font-bold">Checkout</h1>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="price" className="flex-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={`${(product?.price).toLocaleString("id", {
                currency: "IDR",
                style: "currency",
                maximumFractionDigits: 0,
              })}`}
              className="w-full p-2 border rounded flex-1"
              disabled
            />
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="qty" className="flex-1">
              Quantity
            </label>
            <input
              type="number"
              name="qty"
              id="qty"
              value={qty}
              min={1}
              {...register("qty", {
                required: {
                  value: true,
                  message: "Quantity is required",
                },
                min: {
                  value: 1,
                  message: "Minimum quantity is 1",
                },
              })}
              onChange={(e) => setQty(e.target.value)}
              className={`w-full p-2 border rounded flex-1 ${
                errors.qty && "border-red-500"
              }`}
            />
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="total" className="flex-1">
              Total
            </label>
            <input
              type="text"
              name="total"
              id="total"
              value={`${(product?.price * qty).toLocaleString("id", {
                currency: "IDR",
                style: "currency",
                maximumFractionDigits: 0,
              })}`}
              className="w-full p-2 border rounded flex-1"
              disabled
            />
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="name" className="flex-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full p-2 border rounded flex-1 ${
                errors.name && "border-red-500"
              }`}
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="phone" className="flex-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              className={`w-full p-2 border rounded flex-1 ${
                errors.phone && "border-red-500"
              }`}
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone Number is required",
                },
                minLength: {
                  value: 10,
                  message: "Phone Number must be 10 digits",
                },
              })}
            />
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label htmlFor="address" className="flex-1">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              className={`w-full p-2 border rounded flex-1 ${
                errors.address && "border-red-500"
              }`}
            />
          </div>
          <button className="font-bold w-full sm:w-max p-3 bg-green-500 flex items-center gap-2 text-white rounded">
            <FaWhatsapp size={24} />
            <span>Checkout</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutView;

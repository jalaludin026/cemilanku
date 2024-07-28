"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        fetch(`/api/products/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              Swal.fire({
                title: "Error",
                text: data.error,
                icon: "error",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Success",
                text: data.message,
                icon: "success",
                confirmButtonText: "OK",
              });

              setProducts(products.filter((product) => product.id !== id));
              setTotal(total - 1);
            }
          });
      }
    });
  };

  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    fetch(`/api/products?skip=${skip}&take=${take}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.products);
        setTotal(data?.total);
      })
      .finally(() => {
        Swal.close();
      });
  }, []);

  const loadMore = (newSkip) => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    fetch(`/api/products?skip=${newSkip}&take=${take}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.products);
        setTotal(data?.total);
      })
      .finally(() => {
        Swal.close();
        setSkip(newSkip);
      });
  };
  return (
    <div className="w-full p-5 bg-white space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          href="/dashboard/products/create"
          className="bg-gray-500 text-white px-3 py-2 rounded"
        >
          <FaPlus />
        </Link>
      </div>
      <table className="min-w-full border border-collapse table-auto">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">#</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Name</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Image</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border-t">{index + 1}</td>
              <td className="px-4 py-2 border-t">{product.name}</td>
              <td className="px-4 py-2 border-t">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2 border-t space-x-2">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 max-w-max"
                  >
                    <FaTrash />
                  </button>
                  <Link
                    href={`/dashboard/products/${product.slug}`}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 max-w-max"
                  >
                    <FaEdit />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {total > take && (
        <div className="w-full flex justify-end mt-5 gap-3">
          <button
            disabled={skip === 0}
            onClick={() => loadMore(skip - take)}
            className="bg-slate-800 text-white cursor-pointer disabled:opacity-75 px-3 py-2 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => loadMore(skip + take)}
            disabled={skip + take >= total}
            className="bg-slate-800 text-white cursor-pointer disabled:opacity-75 px-3 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsView;

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const CategoriesView = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .finally(() => {
        Swal.close();
      });
  }, []);

  const handleDelete = (id) => {
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
        fetch(`/api/categories/delete`, {
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
              setCategories(
                categories.filter((category) => category.id !== id)
              );
            }
          });
      }
    });
  };

  return (
    <div className="w-full p-5 bg-white space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href="/dashboard/categories/create"
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <FaPlus />
        </Link>
      </div>
      <table className="min-w-full border border-collapse table-auto">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">#</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Name</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Slug</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Products</th>
            <th className="w-1/4 px-4 py-2 bg-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border-t">{index + 1}</td>
              <td className="px-4 py-2 border-t">{category.name}</td>
              <td className="px-4 py-2 border-t">{category.slug}</td>
              <td className="px-4 py-2 border-t">
                {category?.products.length}
              </td>
              <td className="px-4 py-2 border-t space-x-2">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 max-w-max"
                  >
                    <FaTrash />
                  </button>
                  <Link
                    href={`/dashboard/categories/${category.id}`}
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
    </div>
  );
};

export default CategoriesView;

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
const EditCategoryView = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    // loading
    Swal.fire({
      title: "Updating category...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`/api/categories/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
            text: "Category updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
  };

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("name", data.name);
        setValue("description", data.description);
      });
  }, [id]);

  return (
    <div className="w-full p-5 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Category</h1>
        <Link
          href="/dashboard/categories"
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <FaArrowLeft />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="mt-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
              errors.name ? "border-red-500" : ""
            }`}
          />

          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mt-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <textarea
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
              errors.description ? "border-red-500" : ""
            }`}
            id="description"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
            })}
          ></textarea>

          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryView;

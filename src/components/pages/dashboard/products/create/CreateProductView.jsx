"use client";
import CustomEditor from "@/components/CustomEditor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";
const CreateProductView = () => {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [text, setText] = useState("");

  const onSubmit = (data) => {
    Swal.fire({
      title: "Creating product...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", text);
    formData.append("categoryId", data.category);
    formData.append("file", file);
    fetch("/api/products/create", {
      method: "POST",
      body: formData,
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
          reset();
          setText("");
        }
      });
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((category) => ({
          value: category.id,
          label: category.name,
        }));

        setCategories(options);
      });
  }, []);
  return (
    <div className="w-full p-5 bg-white space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Product</h1>
        <Link
          href="/dashboard/products"
          className="p-2 bg-gray-500 rounded text-white hover:bg-gray-600"
        >
          <FaArrowLeft />
        </Link>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="">Name</label>
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Product name"
              className={`w-full p-2 border border-gray-300 rounded outline-none ${
                errors.name && "border-red-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="">Price</label>
            <input
              type="number"
              placeholder="Product price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
              })}
              className={`w-full p-2 border border-gray-300 rounded outline-none ${
                errors.price && "border-red-500"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row items-center">
          <div className="w-full">
            <label htmlFor="">Category</label>
            <Select
              options={categories}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: errors.category && "red",
                }),
              }}
              {...register("category", {
                required: { value: true, message: "Category is required" },
              })}
              onChange={(value) => {
                setValue("category", value.value);
              }}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="">Image</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              placeholder="Product image"
              className={`w-full p-2 border border-gray-300 rounded outline-none `}
              accept="image/*"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="">Description</label>

          <CustomEditor text={text} setText={setText} />
        </div>
        <button
          type="submit"
          className="w-max p-2 bg-gray-500 rounded text-white hover:bg-gray-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProductView;

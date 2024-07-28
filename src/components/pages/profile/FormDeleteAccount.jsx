"use client";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const FormDeleteAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        Swal.fire({
          title: "Loading...",
          text: "Please wait while we delete your account.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await fetch("/api/user/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 200) {
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
          router.push("/");
          setUser(null);
          setLoading(false);
        } else {
          Swal.fire("Failed", result?.error, "error");
          setLoading(false);
        }
      }
    });
  };
  return (
    <div className="w-full p-5 bg-white rounded border space-y-5">
      <h1 className="text-2xl font-bold">Delete Account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <label htmlFor="password">Password</label>
        <div className="flex gap-2 flex-col sm:flex-row items-start">
          <div className="max-w-96 w-full  space-y-2">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              className={`w-full p-2 border rounded ${
                errors.password && "border-red-500"
              }`}
            />

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="disabled:opacity-50 py-2 px-3 font-bold uppercase bg-red-500 w-max text-white rounded cursor-pointer"
          >
            Delete
          </button>

          {/* {loading && <p className="text-red-500">Loading, please wait...</p>} */}
        </div>
      </form>
    </div>
  );
};

export default FormDeleteAccount;

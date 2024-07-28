"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we update your password.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const response = await fetch("/api/user/update/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 200) {
      reset();
      Swal.fire("Success", "Password updated successfully", "success");
      setLoading(false);
    } else {
      Swal.fire("Failed", result?.error, "error");
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5 bg-white rounded border space-y-5">
      <h1 className="text-2xl font-bold">Change Password</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className={`w-full p-2 border rounded ${
                errors.newPassword ? "border-red-500" : ""
              }`}
              placeholder="New Password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "New Password is required",
                },
                minLength: {
                  value: 6,
                  message: "New Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "New Password must be at most 20 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                  message:
                    "New Password must contain at least one letter and one number",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className={`w-full p-2 border rounded ${
                errors.confirmNewPassword ? "border-red-500" : ""
              }`}
              placeholder="Confirm New Password"
              {...register("confirmNewPassword", {
                required: {
                  value: true,
                  message: "Confirm New Password is required",
                },
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="password">Current Password</label>
          <div className="space-y-2 w-full">
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full p-2 border rounded sm:w-1/2 ${
                errors.oldPassword ? "border-red-500" : ""
              }`}
              placeholder="Current Password"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Current Password is required",
                },
              })}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-3 disabled:opacity-50 font-bold uppercase bg-gray-800 w-max text-white rounded"
        >
          {loading ? "Loading..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default FormChangePassword;

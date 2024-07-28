"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterView = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const formData = { ...data, recaptchaToken };

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful, redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Handle registration error
        console.error("Registration error:", result.error);
        setError("email", { type: "custom", message: result.error });
        recaptchaRef.current.reset(); // Reset ReCAPTCHA
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(false);
      setRecaptchaToken(null); // Reset CAPTCHA token
    }
  };

  const onChangeRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full p-6 bg-white sm:rounded-lg sm:border"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please register to your account
        </p>

        {message && (
          <p className="text-sm text-green-500 mb-6 text-center">{message}</p>
        )}

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="mb-6 flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
                errors.name ? "border-red-500" : ""
              }`}
              autoComplete="off"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6 flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
                errors.email ? "border-red-500" : ""
              }`}
              autoComplete="off"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="mb-6 flex-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
                errors.password ? "border-red-500" : ""
              }`}
              autoComplete="off"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6 flex-1">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              autoComplete="off"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-center sm:justify-start">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChangeRecaptcha}
          />
        </div>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-gray-700 hover:underline dark:text-gray-500"
          >
            Login here
          </Link>
        </div>

        <button
          type="submit"
          className="w-full sm:w-max text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterView;

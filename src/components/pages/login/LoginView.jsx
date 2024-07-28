"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginView = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      alert("Please verify that you are not a robot");
      return;
    }

    const formData = { ...data, recaptchaToken };

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/dashboard");
        setMessage("Login successful, redirecting to home page...");
      } else {
        setError("email", { type: "custom", message: "Invalid credentials" });
        setError("password", {
          type: "custom",
          message: "Invalid credentials",
        });
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsLoading(false);
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
        className="w-96 p-6 bg-white sm:rounded-lg sm:border"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please login to your account
        </p>
        {message && (
          <p className="text-green-500 mb-6 text-center">{message}</p>
        )}
        <div className="mb-6">
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
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters",
              },
            })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
              errors.email ? "border-red-500" : ""
            }`}
            autoComplete="off"
            name="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:underline"
          >
            Kembali
          </Link>
        </div>

        <div className="mb-6 flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChangeRecaptcha}
            ref={recaptchaRef}
            size="normal"
            theme="light"
            hl="en"
            badge="bottomleft"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginView;

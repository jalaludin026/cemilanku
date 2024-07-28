"use client";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { FaUser, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
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
        logout();
        Swal.fire("Success!", "Logged out", "success");
      }
    });
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Cemilanku</h1>
      <div className="md:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <ul className="hidden md:flex flex-1 justify-center space-x-4 items-center uppercase">
        <li>
          <Link className="uppercase font-bold" href="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="uppercase font-bold" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="uppercase font-bold" href="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className="uppercase font-bold" href="/cart">
            Cart
          </Link>
        </li>
      </ul>
      <ul className="hidden md:flex space-x-4 items-center">
        {user ? (
          <li className="flex flex-col md:flex-row gap-2">
            <Link
              href="/dashboard"
              className="flex gap-2 items-center font-bold uppercase py-2 px-3 rounded bg-gray-500 hover:bg-gray-700"
            >
              <span>dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center font-bold uppercase py-2 px-3 rounded bg-red-500 hover:bg-red-700"
            >
              <span>Logout</span>
              <FaArrowRight />
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link className="uppercase font-bold" href="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed inset-0 bg-gray-800 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-white">Cemilanku</h1>
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-white" />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <Link
              className="font-bold uppercase"
              href="/"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="font-bold uppercase"
              href="/about"
              onClick={() => setIsSidebarOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="font-bold uppercase"
              href="/contact"
              onClick={() => setIsSidebarOpen(false)}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              className="font-bold uppercase"
              href="/cart"
              onClick={() => setIsSidebarOpen(false)}
            >
              Cart
            </Link>
          </li>

          {user ? (
            <li className="flex flex-row md:flex-col gap-2">
              <Link
                href="/dashboard"
                className="w-max flex gap-2 items-center uppercase font-bold py-2 px-3 rounded bg-gray-500 hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span>dashboard</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
                className="flex gap-2 items-center font-bold uppercase py-2 px-3 rounded bg-red-500 hover:bg-red-700"
              >
                <span>Logout</span>
                <FaArrowRight />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="font-bold uppercase"
                  href="/login"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

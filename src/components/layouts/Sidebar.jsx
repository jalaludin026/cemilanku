"use client";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
  FaArchive,
} from "react-icons/fa";
import Swal from "sweetalert2";

const links = [
  {
    path: "/dashboard",
    icon: <FaHome />,
    name: "Dashboard",
  },
  {
    path: "/profile",
    icon: <FaUser />,
    name: "Profile",
  },
];

const linksAdminOnly = [
  {
    path: "/dashboard/categories",
    icon: <FaArchive />,
    name: "Categories",
  },
  {
    path: "/dashboard/products",
    icon: <FaArchive />,
    name: "Products",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
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
    <>
      <div className="md:hidden flex justify-between items-center bg-gray-800 p-4 text-white sticky top-0 z-30">
        <Link href={"/"} className="text-2xl font-bold">
          Cemilanku
        </Link>
        <button onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800  transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 md:w-64 md:h-screen md:sticky md:top-0 border-r p-3 flex flex-col gap-3 bg-gray-800 text-white`}
      >
        <div className="flex justify-between">
          <Link href={"/"} className="text-2xl font-bold">
            Cemilanku
          </Link>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        {links.map((link) => (
          <Link
            href={link.path}
            key={link.name}
            className={`flex gap-3 items-center hover:bg-gray-700 p-2 rounded-md ${
              pathname === link.path ? "bg-gray-700" : ""
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}

        {user?.role === "admin" && (
          <>
            {linksAdminOnly.map((link) => (
              <Link
                href={link.path}
                key={link.name}
                className={`flex gap-3 items-center hover:bg-gray-700 p-2 rounded-md ${
                  pathname === link.path ? "bg-gray-700" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </>
        )}
        <button
          onClick={() => {
            handleLogout();
            setIsSidebarOpen(false);
          }}
          className="flex gap-3 items-center hover:bg-red-700 p-2 rounded-md"
        >
          <FaArrowRight />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;

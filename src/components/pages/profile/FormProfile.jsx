"use client";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const FormProfile = () => {
  const { user } = useAuth();

  return (
    <div className="w-full p-5 bg-white rounded border space-y-5">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="flex flex-col space-y-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user?.name}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user?.email}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          id="role"
          value={user?.role}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      <Link
        href="/profile/update"
        className="py-2 px-3 font-bold uppercase bg-gray-800 w-max text-white rounded flex items-center gap-3"
      >
        <span>Update</span>
        <FaEdit />
      </Link>
    </div>
  );
};

export default FormProfile;

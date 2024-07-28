"use client";
import React from "react";
import FormDeleteAccount from "./FormDeleteAccount";
import FormProfile from "./FormProfile";
import FormChangePassword from "./FormChangePassword";

const ProfileView = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-5">
      {/* profile */}
      <FormProfile />

      {/* change password */}

      <FormChangePassword />

      {/* delete account */}

      <FormDeleteAccount />
    </div>
  );
};

export default ProfileView;

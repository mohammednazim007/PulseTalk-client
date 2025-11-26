"use client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  //   // ** sign out handler
  const signOutHandler = () => {
    try {
      // ✅ Remove the accessToken cookie
      Cookies.remove("accessToken");

      toast.success("Signed out successfully!");
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out");
    }
  };

  return (
    <motion.button
      type="button"
      className={`px-4 py-2 rounded-lg text-sm font-semibold text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/20 transition flex items-center gap-2 ${className}`}
      onClick={signOutHandler}
    >
      <FaSignOutAlt />
      Sign Out
    </motion.button>
  );
};

export default SignOutButton;

"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";
import { FaBell, FaShieldAlt, FaUserCircle, FaTimes } from "react-icons/fa";
import SignOutButton from "../signOut/Sign-out";
import NavButton from "./NavButton";
import { useRouter } from "next/navigation";

interface SidebarProps {
  onClose?: () => void;
}

// Allowed tabs
export type TabType = "my-profile" | "security" | "notifications";

// Type for sidebar nav items
interface NavItem {
  key: TabType;
  label: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { key: "my-profile", label: "My Profile", icon: <FaUserCircle /> },
  { key: "security", label: "Login & Security", icon: <FaShieldAlt /> },
  { key: "notifications", label: "Notifications", icon: <FaBell /> },
];

const ProfileSidebar = () => {
  const [activeTab, setActiveTab] = useState<TabType>("my-profile");
  const { data: currentUser } = useCurrentUserQuery();
  const router = useRouter();

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/profile/${tab}`);
  };

  return (
    <div className="relative w-72 md:w-80 bg-slate-800 text-slate-100 border-r border-slate-700 flex flex-col h-full">
      {/* Profile Summary */}
      <div className="flex flex-col items-center p-6 pb-0 md:mt-0">
        <div className="relative group w-24 h-24 mb-4">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-75 blur-sm" />

          <Image
            src={currentUser?.user?.avatar || avatar.src}
            alt="Profile"
            className="relative w-full h-full rounded-full object-cover border-2 border-slate-900 shadow-xl"
            width={100}
            height={100}
          />
        </div>

        <h2 className="text-lg font-bold text-white text-center">
          {currentUser?.user?.name || "User"}
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-2 p-6 overflow-y-auto">
        {navItems.map((item) => (
          <NavButton
            key={item.key}
            active={activeTab === item.key}
            onClick={() => handleNavClick(item.key)}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/20">
        <SignOutButton />
      </div>
    </div>
  );
};

export default ProfileSidebar;

// import React from "react";
// import {
//   FaBell,
//   FaShieldAlt,
//   FaUserCircle,
//   FaTimes,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import NavButton from "./NavButton";
// import { motion } from "motion/react";
// import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";

// export type TabType = "my-profile" | "security" | "notifications";

// interface SidebarProps {
//   activeTab: TabType;
//   onTabChange: (tab: TabType) => void;
//   onClose?: () => void;
// }

// interface NavItem {
//   key: TabType;
//   label: string;
//   icon: React.ReactNode;
// }

// const navItems: NavItem[] = [
//   { key: "my-profile", label: "My Profile", icon: <FaUserCircle /> },
//   { key: "security", label: "Login & Security", icon: <FaShieldAlt /> },
//   { key: "notifications", label: "Notifications", icon: <FaBell /> },
// ];

// const ProfileSidebar: React.FC<SidebarProps> = ({
//   activeTab,
//   onTabChange,
//   onClose,
// }) => {
//   const { data } = useCurrentUserQuery();
//   const currentUser = data?.user;

//   const handleNavClick = (tab: TabType) => {
//     onTabChange(tab);
//     if (window.innerWidth < 768 && onClose) {
//       onClose();
//     }
//   };

//   return (
//     <div className="relative w-full h-full bg-slate-900 md:bg-slate-900/50 md:backdrop-blur-xl border-r border-slate-800 flex flex-col">
//       {/* Mobile Close Button */}
//       <div className="md:hidden flex justify-end p-4 pb-0">
//         <button
//           onClick={onClose}
//           className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
//         >
//           <FaTimes size={20} />
//         </button>
//       </div>

//       {/* --- Fixed Header Section --- */}
//       <div className="flex flex-col items-center p-8 pb-6 shrink-0 z-10">
//         <div className="relative group w-24 h-24 mb-4">
//           <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500" />
//           <img
//             src={currentUser?.avatar || "https://picsum.photos/200"}
//             alt="Profile"
//             className="relative w-full h-full rounded-full object-cover border-4 border-slate-900 shadow-xl"
//           />
//           <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
//         </div>

//         <h2 className="text-xl font-bold text-white text-center tracking-tight">
//           {currentUser?.name || "User"}
//         </h2>
//         <p className="text-sm text-slate-400 mt-1">
//           {currentUser?.role || "Developer"}
//         </p>
//       </div>

//       {/* --- Scrollable Navigation Section --- */}
//       {/* flex-1 makes it fill available space, overflow-y-auto enables scrolling */}
//       <div className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar space-y-1">
//         <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//           Account Settings
//         </div>
//         {navItems.map((item) => (
//           <NavButton
//             key={item.key}
//             active={activeTab === item.key}
//             onClick={() => handleNavClick(item.key)}
//             icon={item.icon}
//             label={item.label}
//           />
//         ))}

//         {/* Mocking extra items to demonstrate scrolling if list is long */}
//         {/*
//         <div className="mt-6 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//           More Options
//         </div>
//         {[1,2,3,4,5].map(i => (
//            <NavButton
//              key={i} active={false} onClick={() => {}}
//              icon={<div className="w-4 h-4 rounded-full bg-slate-700"/>}
//              label={`Legacy Option ${i}`}
//            />
//         ))}
//         */}
//       </div>

//       {/* --- Fixed Footer Section --- */}
//       <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0 z-10">
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group">
//           <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
//           <span className="font-medium text-sm">Sign Out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;

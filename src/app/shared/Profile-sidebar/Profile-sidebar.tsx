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

const ProfileSidebar = ({ onClose }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("my-profile");
  const { data: currentUser } = useCurrentUserQuery();
  const router = useRouter();

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/profile/${tab}`);

    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <div className="relative w-72 md:w-80 bg-slate-800 text-slate-100 border-r border-slate-700 flex flex-col h-full">
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-3 right-3 z-50 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
      >
        <FaTimes size={16} />
      </button>

      {/* Profile Summary */}
      <div className="flex flex-col items-center p-6 pb-0 mt-8 md:mt-0">
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

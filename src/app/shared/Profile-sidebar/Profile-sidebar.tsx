"use client";

import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";
import SignOutButton from "../signOut/Sign-out";
import NavButton from "./NavButton";
import { navItems, TabType } from "./navItems";
import OnlineIndicator from "../OnlineIndicatior/OnelineIndicator";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setCloseSidebar } from "@/app/redux/features/user-slice/message-user-slice";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { data: currentUser } = useCurrentUserQuery();
  const router = useRouter();

  const isSidebarOpen = useAppSelector((state) => state.user.closeSidebar);
  const dispatch = useAppDispatch();

  // **2. Derive activeTab from the pathname**
  const activeTab = useMemo(() => {
    const pathSegments = pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    const defaultTab: TabType = "my-profile";

    const isValidTab = navItems.some((item) => item.key === lastSegment);

    return isValidTab ? (lastSegment as TabType) : defaultTab;
  }, [pathname]);

  // **4. Handle navigation and close sidebar**
  const handleNavigate = (tab: TabType) => {
    dispatch(setCloseSidebar(!isSidebarOpen));
    router.push(`/profile/${tab}`);
  };

  return (
    <div className="relative w-72 md:w-80 bg-slate-800 text-slate-100 border-r border-slate-700 flex flex-col h-full">
      {/* Profile Summary */}
      <div className="flex-none px-4 pt-4 z-10">
        <div className="flex flex-col items-center">
          <div className="relative group w-20 h-20 mb-3 cursor-pointer">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-60 blur-md group-hover:opacity-100 transition-all duration-500 animate-pulse" />

            {/* Avatar Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-900 ring-2 ring-slate-800 group-hover:ring-indigo-500 transition-all duration-300">
              <Image
                src={currentUser?.user?.avatar || avatar.src}
                alt="Profile"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                width={200}
                height={200}
              />
            </div>

            {/* Status Dot */}
            <OnlineIndicator className="absolute bottom-1 right-1 w-4 h-4" />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              {currentUser?.user?.name}
            </h2>
            <p className="text-xs font-medium text-slate-400 mt-1 px-3 py-1 bg-slate-800 rounded-full inline-block">
              {currentUser?.user?.role}
            </p>
          </div>
        </div>

        <div className="border-t my-1 border-gray-700 mx-2" />
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-2 p-4 overflow-y-auto no-scrollbar">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Account Settings
        </div>
        <div className="border-t border-slate-800/60 mx-2" />
        {navItems.map((item) => (
          <NavButton
            key={item.key}
            active={activeTab === item.key}
            onClick={() => handleNavigate(item.key)}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>

      {/* Sign Out */}
      <div className="flex-none py-2 px-4 border-t border-slate-800/60 bg-slate-900/95 backdrop-blur-sm z-10">
        <SignOutButton className="w-full flex items-center justify-center" />
      </div>
    </div>
  );
};

export default ProfileSidebar;

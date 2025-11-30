"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProfileSidebar from "@/app/shared/Profile-sidebar/Profile-sidebar";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setCloseSidebar } from "@/app/redux/features/user-slice/message-user-slice";
import CloseSidebar from "@/app/shared/CloseSidebar/CloseSidebar";
import BackButton from "@/app/shared/BackButton/BackButton";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useAppSelector((state) => state.user.closeSidebar);
  const dispatch = useAppDispatch();

  // Responsive sidebar behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    // Desktop open, mobile closed
    dispatch(setCloseSidebar(mediaQuery.matches));

    const handleResize = (e: MediaQueryListEvent) => {
      dispatch(setCloseSidebar(e.matches));
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Sidebar Animation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed md:static z-50 h-full shadow-2xl md:shadow-none"
          >
            <ProfileSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <div className="relative w-full overflow-y-auto">
        {/* Close Sidebar Button and Back Button */}
        <div className="fixed top-3 right-9 z-50 md:hidden">
          <CloseSidebar />
        </div>

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProfileSidebar from "@/app/shared/Profile-sidebar/Profile-sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Responsive sidebar behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsSidebarOpen(mediaQuery.matches); // Desktop open, mobile closed

    const handleResize = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

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
            <ProfileSidebar onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <div className="w-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default ProfileLayout;

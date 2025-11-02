"use client";

import { motion } from "motion/react";
import { BsChat, BsPeople } from "react-icons/bs";

// Export the type so the parent can use it
export type SidebarTab = "chat" | "friends";

interface SidebarTabsProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
}

const SidebarTabs = ({ activeTab, onTabChange }: SidebarTabsProps) => {
  const tabs: SidebarTab[] = ["chat", "friends"];

  return (
    <div className="p-2 border-b border-slate-700">
      <div
        role="tablist"
        aria-label="Sidebar tabs"
        className="relative flex w-full rounded-lg bg-slate-700 p-[4px]"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`tab-panel-${tab}`}
            onClick={() => onTabChange(tab)}
            className={`relative z-10 flex-1 py-1.5 text-sm font-medium text-center transition-colors
              ${
                activeTab === tab
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }
            `}
          >
            {/* The Text + Icon */}
            <span className="relative z-10 flex items-center justify-center gap-2 capitalize">
              {tab === "chat" ? <BsChat /> : <BsPeople />}
              {tab}
            </span>

            {/* The sliding "pill" background */}
            {activeTab === tab && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-blue-600 rounded-md"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarTabs;

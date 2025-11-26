"use client";

import { FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setCloseSidebar } from "@/app/redux/features/user-slice/message-user-slice";
import { SquareChartGantt } from "lucide-react";

const CloseSidebar = () => {
  const isSidebarOpen = useAppSelector((state) => state.user.closeSidebar);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(setCloseSidebar(!isSidebarOpen));
  };

  return (
    <button
      onClick={toggleSidebar}
      className="
        md:hidden
        absolute top-3 right-3 z-50 
        p-2 rounded-lg 
        bg-slate-700 hover:bg-slate-600 
        transition
      "
    >
      {isSidebarOpen ? <FaTimes size={16} /> : <SquareChartGantt size={16} />}
    </button>
  );
};

export default CloseSidebar;

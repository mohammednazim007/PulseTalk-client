"use client";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setCloseSidebar } from "@/app/redux/features/user-slice/message-user-slice";
import { useAppSelector } from "@/app/hooks/hooks";

const CloseSidebar = () => {
  const isSidebarOpen = useAppSelector((state) => state.user.closeSidebar);
  const dispatch = useAppDispatch();

  return (
    <div>
      {isSidebarOpen ? (
        <button
          onClick={() => dispatch(setCloseSidebar(false))}
          className=" absolute top-3 right-3 z-50 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
        >
          <FaArrowLeft size={16} />
        </button>
      ) : (
        <button
          onClick={() => dispatch(setCloseSidebar(true))}
          className=" absolute top-3 right-3 z-50 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
        >
          <FaTimes size={16} />
        </button>
      )}
    </div>
  );
};

export default CloseSidebar;
// md: hidden;

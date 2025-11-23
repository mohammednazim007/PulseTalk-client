"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
    >
      <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
        <FaArrowLeft className="w-3 h-3" />
      </div>
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;

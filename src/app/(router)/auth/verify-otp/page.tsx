import VerifyOTP from "@/app/components/ui/VerifyOTP";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-slate-950 text-slate-200 px-4 selection:bg-indigo-500/30 selection:text-indigo-200">
      <BackgroundGradient />

      <VerifyOTP />
    </div>
  );
};

export default page;

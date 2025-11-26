import ResetPassword from "@/app/components/ui/ResetPassword";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";
import React from "react";

const page = () => {
  return (
    <div className="fullscreen-center">
      <BackgroundGradient />
      <ResetPassword />
    </div>
  );
};

export default page;

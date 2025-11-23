import ChangePassword from "@/app/components/ui/ChangePassword";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";
import React from "react";

const page = () => {
  return (
    <div className="fullscreen-center">
      <BackgroundGradient />
      <ChangePassword />
    </div>
  );
};

export default page;

import ProfileSecurity from "@/app/shared/Profile-security/Profile-security-main";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";

const page = () => {
  return (
    <div className="fullscreen-center">
      <BackgroundGradient />
      <ProfileSecurity />
    </div>
  );
};

export default page;

import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";
import MyProfile from "@/app/shared/my-profile/MyProfile";

const page = () => {
  return (
    <div className="fullscreen-center py-5">
      <BackgroundGradient />
      <MyProfile />
    </div>
  );
};

export default page;

// "use client";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import { motion, AnimatePresence } from "motion/react";
// import avatar from "@/app/assets/profile.png";

// import {
//   FaCamera,
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaArrowLeft,
//   FaEye,
//   FaEyeSlash,
//   FaCheckCircle,
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaTwitter,
//   FaGithub,
//   FaLinkedin,
//   FaPhone,
//   FaBell,
//   FaShieldAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import {
//   useCurrentUserQuery,
//   useUpdateProfileMutation,
// } from "@/app/redux/features/authApi/authApi";
// import { useRouter } from "next/navigation";
// import SignOutButton from "@/app/shared/signOut/Sign-out";
// import Image from "next/image";
// import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
// import { containerVariants, tabContentVariants } from "./animations";
// import ToggleSwitch from "@/app/shared/Profile/ToggleSwitch";
// import NavButton from "@/app/shared/Profile/NavButton";
// import { IProfileForms } from "@/app/types/userType";
// import { profileValidation } from "@/app/lib/validation/form-validation";
// import BackButton from "../BackButton/BackButton";

// // Types
// type TabType = "profile" | "security" | "notifications";

// const Profile: React.FC = () => {
//   const { data: currentUser } = useCurrentUserQuery();

//   const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
//   const router = useRouter();

//   const [activeTab, setActiveTab] = useState<TabType>("profile");
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   useEffect(() => {
//     if (currentUser?.user?.avatar) {
//       setProfileImage(currentUser.user.avatar);
//     }
//   }, [currentUser]);

//   const handleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setFieldValue: (
//       field: string,
//       value: File | null,
//       shouldValidate?: boolean
//     ) => void
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFieldValue("image", file);
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   //** Handle Form submit logic
//   const handleSubmit = useCallback(
//     async (
//       values: IProfileForms,
//       { resetForm }: FormikHelpers<IProfileForms>
//     ) => {
//       try {
//         const formData = new FormData();

//         formData.append("name", values.name ?? "");
//         formData.append("role", values.role ?? "");
//         formData.append("location", values.location ?? "");
//         formData.append("bio", values.bio ?? "");
//         formData.append("phone", values.phone ?? "");
//         formData.append("website", values.website ?? "");
//         formData.append("twitter", values.twitter ?? "");
//         formData.append("github", values.github ?? "");
//         formData.append("linkedin", values.linkedin ?? "");

//         // booleans → must convert to string
//         formData.append(
//           "marketingEmails",
//           String(values.marketingEmails ?? false)
//         );
//         formData.append(
//           "securityEmails",
//           String(values.securityEmails ?? false)
//         );
//         formData.append(
//           "productUpdates",
//           String(values.productUpdates ?? false)
//         );

//         // 3. PASSWORDS: Check existence before appending
//         if (values.currentPassword && values.newPassword) {
//           formData.append("currentPassword", values.currentPassword);
//           formData.append("newPassword", values.newPassword);
//         }

//         // 4. IMAGE: Check existence before appending
//         if (values.image) {
//           formData.append("image", values.image);
//         }

//         await updateProfile(formData).unwrap();
//         toast.success("Profile updated successfully!");

//         // Update form state with new values so fields don't clear
//         resetForm({ values });
//       } catch (err: unknown) {
//         console.error(err);
//         toast.error("Failed to update profile");
//       }
//     },
//     [updateProfile]
//   );

//   // ** Initialize form values
//   const initialValues: IProfileForms = {
//     name: currentUser?.user?.name,
//     role: currentUser?.user?.role,
//     location: currentUser?.user?.location,
//     bio: currentUser?.user?.bio,
//     phone: currentUser?.user?.phone,
//     website: currentUser?.user?.website,
//     twitter: currentUser?.user?.twitter,
//     github: currentUser?.user?.github,
//     linkedin: currentUser?.user?.linkedin,
//     marketingEmails: currentUser?.user?.marketingEmails || false,
//     securityEmails: currentUser?.user?.securityEmails || false,
//     productUpdates: currentUser?.user?.productUpdates || false,
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     image: null,
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 py-8 font-sans">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className=""
//       >
//         <div className="flex items-center gap-3 mb-6">
//           <BackButton />
//           <span className="h-5 w-px bg-slate-700" />
//           <span className="text-xl font-bold text-slate-200">
//             Account Settings
//           </span>
//         </div>

//         <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={profileValidation}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ setFieldValue }) => (
//               <Form className="contents">
//                 {/* LEFT SIDEBAR */}
//                 <div className="w-full md:w-72 bg-slate-950/30 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col">
//                   {/* Profile Summary */}
//                   <div className="flex flex-col items-center mb-8">
//                     <div className="relative group w-24 h-24 mb-4">
//                       <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-75 blur-sm" />
//                       <Image
//                         src={profileImage || avatar.src}
//                         alt="Profile"
//                         className="relative w-full h-full rounded-full object-cover border-2 border-slate-900 shadow-xl"
//                         width={100}
//                         height={100}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-slate-900 hover:bg-indigo-500 transition-colors shadow-lg z-10"
//                       >
//                         <FaCamera className="w-3 h-3" />
//                       </button>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={(e) => handleImageChange(e, setFieldValue)}
//                         className="hidden"
//                         accept="image/*"
//                       />
//                     </div>
//                     <h2 className="text-lg font-bold text-white text-center">
//                       {currentUser?.user?.name || "User"}
//                     </h2>
//                     <p className="text-xs text-slate-400 text-center mt-1">
//                       {/* {currentUser?.user?.role || "Developer"} */}
//                     </p>
//                   </div>

//                   {/* Navigation */}
//                   <div className="flex-1 space-y-2">
//                     <NavButton
//                       active={activeTab === "profile"}
//                       onClick={() => setActiveTab("profile")}
//                       icon={<FaUserCircle />}
//                       label="My Profile"
//                     />
//                     <NavButton
//                       active={activeTab === "security"}
//                       onClick={() => setActiveTab("security")}
//                       icon={<FaShieldAlt />}
//                       label="Login & Security"
//                     />
//                     <NavButton
//                       active={activeTab === "notifications"}
//                       onClick={() => setActiveTab("notifications")}
//                       icon={<FaBell />}
//                       label="Notifications"
//                     />
//                   </div>

//                   <div className="mt-8 pt-6 border-t border-slate-800">
//                     <SignOutButton />
//                   </div>
//                 </div>

//                 {/* RIGHT CONTENT AREA */}
//                 <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-slate-900/20">
//                   <AnimatePresence mode="wait">
//                     {/* PROFILE TAB */}
//                     {activeTab === "profile" && (
//                       <motion.div
//                         key="profile"
//                         variants={tabContentVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="space-y-8 max-w-2xl"
//                       >
//                         <div>
//                           <h2 className="text-2xl font-bold text-white mb-2">
//                             My Profile
//                           </h2>
//                           <p className="text-slate-400">
//                             Manage your personal information and social links.
//                           </p>
//                         </div>

//                         {/* Personal Info Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="col-span-1 md:col-span-2">
//                             <label className="block text-sm font-medium text-slate-300 mb-2">
//                               Full Name
//                             </label>
//                             <div className="relative">
//                               <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="name"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all"
//                                 placeholder="John Doe"
//                               />
//                             </div>
//                             <ErrorMessage
//                               name="name"
//                               component="p"
//                               className="text-xs text-red-400 mt-1"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-2">
//                               Job Title
//                             </label>
//                             <div className="relative">
//                               <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="role"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all"
//                                 placeholder="Software Engineer"
//                               />
//                             </div>
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-2">
//                               Location
//                             </label>
//                             <div className="relative">
//                               <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="location"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all"
//                                 placeholder="New York, USA"
//                               />
//                             </div>
//                           </div>

//                           <div className="col-span-1 md:col-span-2">
//                             <label className="block text-sm font-medium text-slate-300 mb-2">
//                               Bio
//                             </label>
//                             <Field
//                               as="textarea"
//                               rows={4}
//                               name="bio"
//                               className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all resize-none"
//                               placeholder="Tell us a little about yourself..."
//                             />
//                             <div className="text-right text-xs text-slate-500 mt-1">
//                               Max 500 characters
//                             </div>
//                           </div>
//                         </div>

//                         <div className="h-px bg-slate-800" />

//                         {/* Social Links */}
//                         <div className="space-y-4">
//                           <h3 className="text-lg font-semibold text-white">
//                             Social Profiles
//                           </h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="relative">
//                               <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="website"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200"
//                                 placeholder="https://website.com"
//                               />
//                             </div>
//                             <div className="relative">
//                               <FaTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="twitter"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200"
//                                 placeholder="@username"
//                               />
//                             </div>
//                             <div className="relative">
//                               <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="github"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200"
//                                 placeholder="Github username"
//                               />
//                             </div>
//                             <div className="relative">
//                               <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                               <Field
//                                 name="linkedin"
//                                 className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200"
//                                 placeholder="Linkedin username"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* SECURITY TAB */}
//                     {activeTab === "security" && (
//                       <motion.div
//                         key="security"
//                         variants={tabContentVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="space-y-8 max-w-2xl"
//                       >
//                         <div>
//                           <h2 className="text-2xl font-bold text-white mb-2">
//                             Login & Security
//                           </h2>
//                           <p className="text-slate-400">
//                             Manage your password and contact details.
//                           </p>
//                         </div>

//                         <div className="space-y-6">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                               <label className="block text-sm font-medium text-slate-300 mb-2">
//                                 Email Address
//                               </label>
//                               <div className="relative">
//                                 <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                                 <input
//                                   type="email"
//                                   readOnly
//                                   value={currentUser?.user?.email || ""}
//                                   className="w-full pl-11 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed"
//                                 />
//                                 <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 w-3 h-3" />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-slate-300 mb-2">
//                                 Phone Number
//                               </label>
//                               <div className="relative">
//                                 <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                                 <Field
//                                   name="phone"
//                                   className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all"
//                                   placeholder="+1 (555) 000-0000"
//                                 />
//                               </div>
//                             </div>
//                           </div>

//                           <div className="h-px bg-slate-800 my-6" />

//                           <div className="bg-slate-950/30 p-6 rounded-2xl border border-slate-800/50">
//                             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                               <FaShieldAlt className="text-indigo-400" /> Change
//                               Password
//                             </h3>
//                             <div className="space-y-4">
//                               <div className="relative">
//                                 <Field
//                                   type={
//                                     showPassword.current ? "text" : "password"
//                                   }
//                                   name="currentPassword"
//                                   placeholder="Current Password"
//                                   className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none text-slate-200"
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     setShowPassword((p) => ({
//                                       ...p,
//                                       current: !p.current,
//                                     }))
//                                   }
//                                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
//                                 >
//                                   {showPassword.current ? (
//                                     <FaEyeSlash />
//                                   ) : (
//                                     <FaEye />
//                                   )}
//                                 </button>
//                               </div>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="relative">
//                                   <Field
//                                     type={
//                                       showPassword.new ? "text" : "password"
//                                     }
//                                     name="newPassword"
//                                     placeholder="New Password"
//                                     className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none text-slate-200"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       setShowPassword((p) => ({
//                                         ...p,
//                                         new: !p.new,
//                                       }))
//                                     }
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
//                                   >
//                                     {showPassword.new ? (
//                                       <FaEyeSlash />
//                                     ) : (
//                                       <FaEye />
//                                     )}
//                                   </button>
//                                 </div>
//                                 <div className="relative">
//                                   <Field
//                                     type={
//                                       showPassword.confirm ? "text" : "password"
//                                     }
//                                     name="confirmPassword"
//                                     placeholder="Confirm Password"
//                                     className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none text-slate-200"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       setShowPassword((p) => ({
//                                         ...p,
//                                         confirm: !p.confirm,
//                                       }))
//                                     }
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
//                                   >
//                                     {showPassword.confirm ? (
//                                       <FaEyeSlash />
//                                     ) : (
//                                       <FaEye />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <ErrorMessage
//                                 name="newPassword"
//                                 component="p"
//                                 className="text-xs text-red-400"
//                               />
//                               <ErrorMessage
//                                 name="confirmPassword"
//                                 component="p"
//                                 className="text-xs text-red-400"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* NOTIFICATIONS TAB */}
//                     {activeTab === "notifications" && (
//                       <motion.div
//                         key="notifications"
//                         variants={tabContentVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="space-y-8 max-w-2xl"
//                       >
//                         <div>
//                           <h2 className="text-2xl font-bold text-white mb-2">
//                             Notifications
//                           </h2>
//                           <p className="text-slate-400">
//                             Choose what updates you want to receive.
//                           </p>
//                         </div>

//                         <div className="space-y-4">
//                           <ToggleSwitch
//                             name="marketingEmails"
//                             label="Marketing Emails"
//                             description="Receive emails about new features, promotions, and special offers."
//                           />
//                           <ToggleSwitch
//                             name="securityEmails"
//                             label="Security Alerts"
//                             description="Get notified about important security alerts and login attempts."
//                           />
//                           <ToggleSwitch
//                             name="productUpdates"
//                             label="Product Updates"
//                             description="Receive the latest news about product updates and changes."
//                           />
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Floating Save Button */}
//                   <motion.div
//                     initial={{ y: 50, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"
//                   >
//                     <motion.button
//                       whileHover={!isUpdating ? { scale: 1.05 } : {}}
//                       whileTap={!isUpdating ? { scale: 0.95 } : {}}
//                       type="submit"
//                       disabled={isUpdating}
//                       className={`
//                         flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all
//                         ${
//                           isUpdating
//                             ? "bg-indigo-500/50 cursor-not-allowed"
//                             : "bg-indigo-600 hover:bg-indigo-500 text-white"
//                         }
//                       `}
//                     >
//                       {isUpdating ? (
//                         <>
//                           <ButtonIndicator width={4} height={4} />
//                           <span className="ml-1">Saving...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Save Changes</span>
//                           <FaCheckCircle />
//                         </>
//                       )}
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Profile;

// **================================ second ============
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { motion, AnimatePresence } from "motion/react";
import avatar from "@/app/assets/profile.png";

import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaBriefcase,
  FaMapMarkerAlt,
  FaGlobe,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaBell,
  FaShieldAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/app/redux/features/authApi/authApi";
import SignOutButton from "@/app/shared/signOut/Sign-out";
import Image from "next/image";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";

import ToggleSwitch from "@/app/shared/Profile/ToggleSwitch";
import NavButton from "@/app/shared/Profile/NavButton";
import { IProfileForms } from "@/app/types/userType";
import { profileValidation } from "@/app/lib/validation/form-validation";
import { containerVariants, tabContentVariants } from "./animations";
import BackButton from "../BackButton/BackButton";

// Types
type TabType = "profile" | "security" | "notifications";

const Profile: React.FC = () => {
  const { data: currentUser } = useCurrentUserQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Handle resizing to auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentUser?.user?.avatar) {
      setProfileImage(currentUser.user.avatar);
    }
  }, [currentUser]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null,
      shouldValidate?: boolean
    ) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile when clicked
  };

  //** Handle Form submit logic
  const handleSubmit = useCallback(
    async (
      values: IProfileForms,
      { resetForm }: FormikHelpers<IProfileForms>
    ) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name ?? "");
        formData.append("role", values.role ?? "");
        formData.append("location", values.location ?? "");
        formData.append("bio", values.bio ?? "");
        formData.append("phone", values.phone ?? "");
        formData.append("website", values.website ?? "");
        formData.append("twitter", values.twitter ?? "");
        formData.append("github", values.github ?? "");
        formData.append("linkedin", values.linkedin ?? "");

        formData.append(
          "marketingEmails",
          String(values.marketingEmails ?? false)
        );
        formData.append(
          "securityEmails",
          String(values.securityEmails ?? false)
        );
        formData.append(
          "productUpdates",
          String(values.productUpdates ?? false)
        );

        if (values.currentPassword && values.newPassword) {
          formData.append("currentPassword", values.currentPassword);
          formData.append("newPassword", values.newPassword);
        }

        if (values.image) {
          formData.append("image", values.image);
        }

        await updateProfile(formData);
        toast.success("Profile updated successfully!");
        resetForm({ values });
      } catch (err: unknown) {
        console.error(err);
        toast.error("Failed to update profile");
      }
    },
    [updateProfile]
  );

  // ** Initialize form values
  const initialValues: IProfileForms = {
    name: currentUser?.user?.name,
    role: currentUser?.user?.role,
    location: currentUser?.user?.location,
    bio: currentUser?.user?.bio,
    phone: currentUser?.user?.phone,
    website: currentUser?.user?.website,
    twitter: currentUser?.user?.twitter,
    github: currentUser?.user?.github,
    linkedin: currentUser?.user?.linkedin,
    marketingEmails: currentUser?.user?.marketingEmails || false,
    securityEmails: currentUser?.user?.securityEmails || false,
    productUpdates: currentUser?.user?.productUpdates || false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    image: null,
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl"
      >
        {/* Header Area */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BackButton />
            <span className="h-5 w-px bg-slate-700 hidden md:block" />
            <span className="text-xl font-bold text-slate-200">
              Account Settings
            </span>
          </div>

          {/* Mobile Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl shadow-2xl overflow-hidden flex min-h-[700px] relative">
          <Formik
            initialValues={initialValues}
            validationSchema={profileValidation}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ setFieldValue }) => {
              // Shared Sidebar Content Render Function
              const SidebarContent = () => (
                <div className="flex flex-col h-full">
                  {/* Mobile Header inside drawer */}
                  <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800">
                    <h2 className="text-lg font-bold text-slate-200">Menu</h2>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 text-slate-400 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Profile Summary */}
                  <div className="flex flex-col items-center p-6 pb-0">
                    <div className="relative group w-24 h-24 mb-4">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-75 blur-sm" />
                      <Image
                        src={currentUser?.user?.avatar || avatar.src}
                        alt="Profile"
                        className="relative w-full h-full rounded-full object-cover border-2 border-slate-900 shadow-xl"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-slate-900 hover:bg-indigo-500 transition-colors shadow-lg z-10"
                      >
                        <FaCamera className="w-3 h-3" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-white text-center">
                      {currentUser?.user?.name || "User"}
                    </h2>
                    <p className="text-xs text-slate-400 text-center mt-1">
                      {currentUser?.user?.role || "Member"}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 space-y-2 p-6 overflow-y-auto">
                    <NavButton
                      active={activeTab === "profile"}
                      onClick={() => handleNavClick("profile")}
                      icon={<FaUserCircle />}
                      label="My Profile"
                    />
                    <NavButton
                      active={activeTab === "security"}
                      onClick={() => handleNavClick("security")}
                      icon={<FaShieldAlt />}
                      label="Login & Security"
                    />
                    <NavButton
                      active={activeTab === "notifications"}
                      onClick={() => handleNavClick("notifications")}
                      icon={<FaBell />}
                      label="Notifications"
                    />
                  </div>

                  <div className="p-6 border-t border-slate-800 bg-slate-950/20">
                    <SignOutButton />
                  </div>
                </div>
              );

              return (
                <Form className="contents">
                  {/*
                          DESKTOP SIDEBAR: Static Column
                          Hidden on mobile (md:flex)
                        */}
                  <div className="hidden md:flex w-72 bg-slate-950/30 border-r border-slate-800 flex-col shrink-0">
                    <SidebarContent />
                  </div>

                  {/*
                           MOBILE SIDEBAR: Drawer/Overlay
                           Controlled by AnimatePresence
                        */}
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          // variants={overlayVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onClick={() => setIsSidebarOpen(false)}
                          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        {/* Drawer Panel */}
                        <motion.div
                          // variants={sidebarVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="md:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 shadow-2xl border-r border-slate-800"
                        >
                          <SidebarContent />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* RIGHT CONTENT AREA */}
                  <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-slate-900/20 w-full">
                    <AnimatePresence mode="wait">
                      

                      {/* SECURITY TAB */}
                      {activeTab === "security" && (
                        
                      )}

                      {/* NOTIFICATIONS TAB */}
                      {activeTab === "notifications" && (
                        <motion.div
                          key="notifications"
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-8 max-w-2xl mx-auto md:mx-0"
                        >
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                              Notifications
                            </h2>
                            <p className="text-slate-400">
                              Choose what updates you want to receive.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <ToggleSwitch
                              name="marketingEmails"
                              label="Marketing Emails"
                              description="Receive emails about new features, promotions, and special offers."
                            />
                            <ToggleSwitch
                              name="securityEmails"
                              label="Security Alerts"
                              description="Get notified about important security alerts and login attempts."
                            />
                            <ToggleSwitch
                              name="productUpdates"
                              label="Product Updates"
                              description="Receive the latest news about product updates and changes."
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating Save Button */}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"
                    >
                      <motion.button
                        whileHover={!isUpdating ? { scale: 1.05 } : {}}
                        whileTap={!isUpdating ? { scale: 0.95 } : {}}
                        type="submit"
                        disabled={isUpdating}
                        className={`
                                    flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all
                                    ${
                                      isUpdating
                                        ? "bg-indigo-500/50 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                                    }
                                `}
                      >
                        {isUpdating ? (
                          <>
                            <ButtonIndicator width={4} height={4} />
                            <span className="ml-1">Saving...</span>
                          </>
                        ) : (
                          <>
                            <span>Save Changes</span>
                            <FaCheckCircle />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

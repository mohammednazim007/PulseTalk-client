"use client";

import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaGlobe,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaCamera,
} from "react-icons/fa";
import { motion } from "motion/react";
import { Field, ErrorMessage, Formik, Form, FormikHelpers } from "formik";

import { tabContentVariants } from "./animation";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { ProfileValidation } from "./validation";
import toast from "react-hot-toast";
import { FileInfoState, IMyProfile } from "./interface";
import {
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/app/redux/features/authApi/authApi";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];
const defaultAvatar = "https://picsum.photos/200/200";

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfoState>({
    name: null,
    size: null,
    error: null,
  });

  const { data } = useCurrentUserQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const currentUser = data?.user;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset first
    setProfileFile(null);
    setProfileImage(null);
    setFileInfo({ name: null, size: null, error: null });

    if (!file) return;

    // Validate type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileInfo({
        name: null,
        size: null,
        error: "Only PNG, JPG, and SVG formats are allowed.",
      });
      event.target.value = "";
      return;
    }

    // Validate size (3MB)
    if (file.size > MAX_FILE_SIZE) {
      setFileInfo({
        name: null,
        size: null,
        error: "Image size shouldn't exceed 3MB.",
      });
      event.target.value = "";
      return;
    }

    setProfileImage(URL.createObjectURL(file));
    setProfileFile(file);
  };

  useEffect(() => {
    if (currentUser?.avatar) {
      setProfileImage(currentUser.avatar);
    }
  }, [currentUser]);

  const handleSubmit = async (
    values: IMyProfile,
    { resetForm }: FormikHelpers<IMyProfile>
  ) => {
    if (fileInfo.error) {
      toast.error("Cannot submit profile due to image upload error.");
      return;
    }

    try {
      const formData = new FormData();

      // Append form data fields
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("location", values.location);
      formData.append("bio", values.bio);
      formData.append("website", values.website);
      formData.append("twitter", values.twitter);
      formData.append("github", values.github);
      formData.append("linkedin", values.linkedin);

      // Correctly append the File object to FormData
      if (profileFile) {
        formData.append("image", profileFile);
      }

      // Execute the RTK Query mutation
      await updateProfile(formData).unwrap();

      toast.success("Profile updated successfully!");
      resetForm({ values });
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred profile update.";
      console.error("API Error:", err);
      toast.error(errorMessage);
    }
  };

  const initialValues: IMyProfile = {
    name: currentUser?.name || "",
    role: currentUser?.role || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
    website: currentUser?.website || "",
    twitter: currentUser?.twitter || "",
    github: currentUser?.github || "",
    linkedin: currentUser?.linkedin || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileValidation}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form>
          <motion.div
            key="profile"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8 max-w-2xl mx-auto md:mx-0"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">My Profile</h2>
              <p className="text-slate-400">
                Manage your personal information and social links.
              </p>
            </div>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="relative w-36 h-36 group">
                <img
                  src={profileImage || defaultAvatar}
                  alt="Profile Avatar"
                  className={`w-full h-full object-cover rounded-full border-4 ${
                    profileImage ? "border-indigo-500" : "border-slate-700"
                  } shadow-xl transition-all duration-300`}
                />

                {/* Upload Overlay */}
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  aria-label="Upload profile image"
                >
                  <FaCamera className="text-white w-8 h-8" />
                </label>

                {/* Hidden File Input */}
                <input
                  id="profile-upload"
                  type="file"
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Display File Information and Error */}
              <div className="text-center w-full max-w-xs">
                {fileInfo.error && (
                  <p className="text-sm text-red-400 font-medium flex items-center justify-center gap-1">
                    {fileInfo.error}
                  </p>
                )}

                <p className="text-xs text-slate-500 mt-1">
                  (Max 3MB. Accepts PNG, JPG, SVG)
                </p>
              </div>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Field
                    name="name"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all placeholder:text-slate-600"
                    placeholder="John Doe"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Job Title
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Field
                    name="role"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all placeholder:text-slate-600"
                    placeholder="Software Engineer"
                  />
                </div>
                <ErrorMessage
                  name="role"
                  component="p"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Field
                    name="location"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all placeholder:text-slate-600"
                    placeholder="New York, USA"
                  />
                </div>
                <ErrorMessage
                  name="location"
                  component="p"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Bio */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <Field
                  as="textarea"
                  rows={4}
                  name="bio"
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-200 transition-all resize-none placeholder:text-slate-600"
                  placeholder="Tell us a little about yourself..."
                />
                <div className="flex justify-between items-start mt-1">
                  <ErrorMessage
                    name="bio"
                    component="p"
                    className="text-xs text-red-400"
                  />
                  <div className="text-right text-xs text-slate-500 ml-auto">
                    Max 500 characters
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Social Profiles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Website Field */}
                <div>
                  <div className="relative">
                    <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <Field
                      name="website"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="https://website.com"
                    />
                  </div>
                  <ErrorMessage
                    name="website"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                {/* Twitter Field */}
                <div>
                  <div className="relative">
                    <FaTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <Field
                      name="twitter"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="@username"
                    />
                  </div>
                  <ErrorMessage
                    name="twitter"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                {/* Github Field */}
                <div>
                  <div className="relative">
                    <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <Field
                      name="github"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="Github username"
                    />
                  </div>
                  <ErrorMessage
                    name="github"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                {/* LinkedIn Field */}
                <div>
                  <div className="relative">
                    <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <Field
                      name="linkedin"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-indigo-500/50 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="Linkedin username"
                    />
                  </div>
                  <ErrorMessage
                    name="linkedin"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading || !!fileInfo.error}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading || isSubmitting ? (
                  <ButtonIndicator width={16} height={16} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default MyProfile;

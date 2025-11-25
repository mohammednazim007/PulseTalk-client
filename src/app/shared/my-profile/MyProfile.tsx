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
import { Formik, Form, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import {
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/app/redux/features/authApi/authApi";
import { FileInfoState, IMyProfile } from "./types";
import { FormInput, FormTextArea } from "./FormComponent";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { ProfileValidation } from "./validation";
import CloseSidebar from "../BackAndClose/Back-close";

// --- Constants ---
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

const MyProfile = () => {
  // State
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfoState>({
    name: null,
    size: null,
    error: null,
  });

  // Mock Hooks (Replace with actual Redux hooks)
  const { data } = useCurrentUserQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const currentUser = data?.user;

  // Effects
  useEffect(() => {
    if (currentUser?.avatar) {
      setProfileImage(currentUser.avatar);
    }
  }, [currentUser]);

  // Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset first
    setProfileFile(null);
    setFileInfo({ name: null, size: null, error: null });

    if (!file) return;

    // Validate type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileInfo({
        name: null,
        size: null,
        error: "Only PNG, JPG, and SVG allowed.",
      });
      event.target.value = "";
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setFileInfo({
        name: null,
        size: null,
        error: "Max file size is 3MB.",
      });
      event.target.value = "";
      return;
    }

    setProfileImage(URL.createObjectURL(file));
    setProfileFile(file);
    toast.success("Image selected successfully");
  };

  const handleSubmit = async (
    values: IMyProfile,
    { resetForm }: FormikHelpers<IMyProfile>
  ) => {
    if (fileInfo.error) {
      toast.error("Please fix image errors before saving.");
      return;
    }

    try {
      const formData = new FormData();

      // Append fields
      Object.keys(values).forEach((key) => {
        const val = values[key as keyof IMyProfile];
        if (val !== null && key !== "avatar") {
          formData.append(key, val);
        }
      });

      if (profileFile) {
        formData.append("image", profileFile);
      }

      await updateProfile(formData); // Using mocked promise

      toast.success("Profile updated successfully!");
      resetForm({ values });
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.message || "Failed to update profile.");
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
    avatar: currentUser?.avatar || null,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      <div className="absolute top-1 right-2 z-50">
        <CloseSidebar />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileValidation}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="relative">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
              {/* Header Section */}
              <div className="px-6 md:px-10 pt-10 pb-8 relative">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                  {/* Avatar Upload */}
                  <div className="relative group shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-slate-500 shadow-xl">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                        <img
                          src={profileImage || "https://picsum.photos/200"}
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <FaCamera className="text-white text-2xl drop-shadow-md" />
                        </div>
                      </div>
                    </div>

                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-slate-800 transition-all active:scale-95"
                    >
                      <FaCamera size={14} />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept={ALLOWED_FILE_TYPES.join(",")}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/* Header Text */}
                  <div className="text-center md:text-left flex-1 pb-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                      Public Profile
                    </h1>
                    <p className="text-slate-400 max-w-lg mx-auto md:mx-0">
                      Update your photo and personal details here. These will be
                      displayed publicly on your profile card.
                    </p>

                    {fileInfo.error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm inline-block"
                      >
                        {fileInfo.error}
                      </motion.div>
                    )}
                  </div>

                  {/* Desktop Save Button (Sticky) */}
                  {/* Submit Button Section */}
                  <div className=" justify-end pt-4 hidden md:flex">
                    <button
                      type="submit"
                      disabled={isLoading || !!fileInfo.error}
                      className="items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading || isSubmitting ? (
                        <>
                          <span>Saving</span>{" "}
                          <ButtonIndicator width={10} height={10} />
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-700/50" />

              {/* Form Content */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Personal Info */}
                <div className="lg:col-span-8 space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-indigo-500 rounded-full block"></span>
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        name="name"
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        icon={FaUser}
                      />
                      <FormInput
                        name="role"
                        label="Job Title"
                        placeholder="e.g. Software Engineer"
                        icon={FaBriefcase}
                      />
                      <div className="md:col-span-2">
                        <FormInput
                          name="location"
                          label="Location"
                          placeholder="e.g. San Francisco, CA"
                          icon={FaMapMarkerAlt}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormTextArea
                          name="bio"
                          label="Biography"
                          placeholder="Share a little bit about yourself..."
                          rows={4}
                        />
                        <div className="text-right text-xs text-slate-500 mt-1">
                          Max 500 characters
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column: Social Links */}
                <div className="lg:col-span-4 space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-purple-500 rounded-full block"></span>
                      Social Profiles
                    </h3>

                    <div className="space-y-5 bg-slate-900/30 p-6 rounded-2xl border border-slate-700/30">
                      <FormInput
                        name="website"
                        label="Website"
                        placeholder="https://..."
                        icon={FaGlobe}
                      />
                      <FormInput
                        name="twitter"
                        label="Twitter"
                        placeholder="@username"
                        icon={FaTwitter}
                      />
                      <FormInput
                        name="github"
                        label="GitHub"
                        placeholder="username"
                        icon={FaGithub}
                      />
                      <FormInput
                        name="linkedin"
                        label="LinkedIn"
                        placeholder="username"
                        icon={FaLinkedin}
                      />
                    </div>
                  </section>
                </div>
              </div>

              {/* Mobile Save Button (Sticky Bottom) */}
              <div className="md:hidden sticky bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-20 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading || !!fileInfo.error}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <span>Saving</span>{" "}
                      <ButtonIndicator width={10} height={10} />
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default MyProfile;

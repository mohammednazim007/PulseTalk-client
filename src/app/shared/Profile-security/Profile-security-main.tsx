"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "motion/react";
import { Lock, Mail, Phone, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { SecurityFormValues } from "./types";
import DeviceHistory from "./DeviceHistory";
import { containerVariants, itemVariants } from "./animation";
import DangerZone from "./DangerZone";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { SecuritySchema } from "./validation";
import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";
import { useUpdateSecurityMutation } from "@/app/redux/features/update-profile/update-profile";
import Security_2FA from "./Security_2FA";
import toast from "react-hot-toast";
import { CustomRTKError } from "@/app/redux/features/update-profile/types";
import timeAgo from "@/app/utility/timeAgo";

const ProfileSecurity: React.FC = () => {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { data: currentUser } = useCurrentUserQuery();
  const [updateSecurity, { isLoading }] = useUpdateSecurityMutation();

  // ** initialValues
  const initialValues: SecurityFormValues = {
    phone: currentUser?.user.phone ?? "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: currentUser?.user.twoFactorEnabled,
  };

  // ** handle Security Form Submit
  const handleSubmit = async (values: SecurityFormValues) => {
    try {
      const response = await updateSecurity(values).unwrap();
      toast.success(response.message);
    } catch (error) {
      const apiError = error as CustomRTKError;

      const errorMessage =
        apiError?.data?.message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-indigo-500" />
              Login & Security
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl">
              Manage your password, 2FA settings, and linked devices to ensure
              your account stays secure.
            </p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SecuritySchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              {/* Contact Information Card */}
              <motion.section
                variants={itemVariants}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email (Read Only) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-hover:text-slate-400 transition-colors" />
                      <input
                        type="email"
                        readOnly
                        value={currentUser?.user.email ?? ""}
                        className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 cursor-not-allowed outline-none focus:border-indigo-500/50 transition-all font-mono text-sm"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        Verified
                      </div>
                    </div>
                  </div>

                  {/* Phone (Editable) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                      <Field
                        name="phone"
                        type="tel"
                        className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-200 transition-all placeholder:text-slate-600 font-mono text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-xs text-red-400 mt-1 pl-1"
                    />
                  </div>
                </div>
              </motion.section>

              {/* Security & Password Card */}
              <motion.section
                variants={itemVariants}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-indigo-400" />
                      Password & Authentication
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Update your password or enable 2-step verification.
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                    {currentUser?.user.lastPasswordChange ? (
                      <span className="text-xs font-medium text-indigo-300">
                        Last changed{" "}
                        {timeAgo(`${currentUser?.user.lastPasswordChange}`)}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-indigo-300">
                        Never changed
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Password Fields Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Current Password */}
                    <div className="lg:col-span-4 space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        Current Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showCurrentPass ? "text" : "password"}
                          name="currentPassword"
                          placeholder="••••••••••••"
                          className="w-full pl-4 pr-10 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-200 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showCurrentPass ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className="text-xs text-red-400"
                      />
                    </div>

                    {/* New Password */}
                    <div className="lg:col-span-4 space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        New Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          placeholder="At least 8 chars"
                          className="w-full pl-4 pr-10 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-200 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showNewPass ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-xs text-red-400"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="lg:col-span-4 space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showConfirmPass ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Repeat new password"
                          className="w-full pl-4 pr-10 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-200 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showConfirmPass ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-xs text-red-400"
                      />
                    </div>
                  </div>

                  <div className="h-px bg-slate-800/50" />

                  {/* 2FA Section */}
                  <Security_2FA />
                </div>
              </motion.section>

              {/* Device History */}
              <DeviceHistory />

              {/* Danger Zone */}
              <DangerZone />

              {/* Sticky Action Footer */}
              <motion.div variants={itemVariants} className=" z-10">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl flex justify-between items-center max-w-4xl mx-auto">
                  <div className="text-sm text-slate-400">
                    <span className="hidden sm:inline">
                      Please save your changes to update your profile security.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white shadow-lg shadow-indigo-500/20 transition-all ${
                        isSubmitting
                          ? "bg-indigo-700 cursor-wait"
                          : "bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <span>Saving</span>{" "}
                          <ButtonIndicator width={10} height={10} />
                        </>
                      ) : (
                        <>Save Changes</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default ProfileSecurity;

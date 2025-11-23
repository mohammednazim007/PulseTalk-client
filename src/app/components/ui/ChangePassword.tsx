"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { motion, AnimatePresence } from "motion/react";

import { toast } from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useSetNewPasswordMutation } from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import { IPasswordData } from "@/app/types/formType";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import { resetPasswordValidation } from "@/app/lib/validation/reset-password";
import storageEmailLocalStorage from "@/app/utility/storeEmail";
import BackButton from "@/app/shared/BackButton/BackButton";

const ChangePassword: React.FC = () => {
  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (
    values: IPasswordData,
    { setSubmitting }: FormikHelpers<IPasswordData>
  ) => {
    try {
      const email = localStorage.getItem("resetEmail") || "demo@example.com";

      if (!email) {
        toast.error("Email not found. Please try again.");
        setSubmitting(false);
        return;
      }

      const response = await setNewPassword({
        email,
        newPassword: values.newPassword!,
      }).unwrap();

      if (response?.success) {
        toast.success("Password updated successfully.");
        storageEmailLocalStorage(email, "remove");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to set new password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <BackButton />
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
              >
                <FaLock className="w-7 h-7" />
              </motion.div>

              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                Set New Password
              </h2>
              <p className="text-slate-400 leading-relaxed max-w-[90%]">
                Your new password must be different from previously used
                passwords.
              </p>
            </div>

            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={resetPasswordValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-5">
                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-slate-300 mb-2 ml-1"
                    >
                      New Password
                    </label>
                    <div className="relative group">
                      <FaLock
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                          errors.newPassword && touched.newPassword
                            ? "text-red-400"
                            : "text-slate-500 group-focus-within:text-indigo-400"
                        }`}
                      />
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="••••••••"
                        disabled={isSubmitting || isLoading}
                        className={`w-full pl-11 pr-12 py-2.5 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 outline-none border transition-all duration-200
                          ${
                            errors.newPassword && touched.newPassword
                              ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                        tabIndex={-1}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {errors.newPassword && touched.newPassword && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium pl-1 overflow-hidden"
                        >
                          <FaExclamationCircle className="flex-shrink-0" />
                          <span>{errors.newPassword}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-slate-300 mb-2 ml-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <FaCheckCircle
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "text-red-400"
                            : "text-slate-500 group-focus-within:text-indigo-400"
                        }`}
                      />
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        disabled={isSubmitting || isLoading}
                        className={`w-full pl-11 pr-12 py-2.5 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 outline-none border transition-all duration-200
                          ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium pl-1 overflow-hidden"
                        >
                          <FaExclamationCircle className="flex-shrink-0" />
                          <span>{errors.confirmPassword}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className={`w-full py-1.5 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2
                        ${
                          isLoading || isSubmitting
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
                            : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25"
                        }`}
                    >
                      {isLoading ? (
                        <>
                          <ButtonIndicator
                            width={15}
                            height={15}
                            className="py-1.5"
                          />
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;

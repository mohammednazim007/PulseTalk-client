"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import { motion, AnimatePresence } from "motion/react";

import { FaEnvelope, FaKey, FaExclamationCircle } from "react-icons/fa";
import { useSendOtpMutation } from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import { resetEmailValidation } from "@/app/lib/validation/reset-password";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import { IResetPassword } from "@/app/types/formType";
import BackButton from "@/app/shared/BackButton/BackButton";
import storageEmailLocalStorage from "@/app/utility/storeEmail";
import { CustomRTKError } from "@/app/redux/features/update-profile/types";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const router = useRouter();

  const handleSubmit = async (values: IResetPassword) => {
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) storageEmailLocalStorage(values.email, "add");

      const response = await sendOtp({
        email: values.email,
      }).unwrap();

      if (!response.success)
        throw new Error(response.message || "Failed to send OTP");

      router.push("/auth/verify-otp");
    } catch (error) {
      const apiError = error as CustomRTKError;

      const errorMessage =
        apiError?.data?.message || "An unknown error occurred.";
      toast.error(errorMessage);
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
        {/* Back Button */}
        <BackButton />

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10"
              >
                <FaKey className="w-7 h-7" />
              </motion.div>

              <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
                Reset Password
              </h2>
              <p className="text-slate-400 leading-relaxed max-w-[90%]">
                {`Enter the email associated with your account and we'll send you
                a code to reset your password.`}
              </p>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={resetEmailValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2 ml-1"
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <FaEnvelope
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                          errors.email && touched.email
                            ? "text-red-400"
                            : "text-slate-500 group-focus-within:text-indigo-400"
                        }`}
                      />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        disabled={isLoading || isSubmitting}
                        placeholder="you@example.com"
                        className={`w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 outline-none border transition-all duration-200
                          ${
                            errors.email && touched.email
                              ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                          }`}
                      />
                    </div>

                    {/* Inline Error Message */}
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -5 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium pl-1"
                        >
                          <FaExclamationCircle />
                          {errors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className={`w-full py-1.5 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2
                      ${
                        isLoading || isSubmitting
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
                          : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25"
                      }`}
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <ButtonIndicator
                          width={15}
                          height={15}
                          className="py-1.5"
                        />
                      </>
                    ) : (
                      "Send Reset Code"
                    )}
                  </motion.button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useSetNewPasswordMutation } from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import storageEmailLocalStorage from "@/app/utility/storeEmail";
import { IPasswordData } from "@/app/types/formType";
import { resetPasswordValidation } from "@/app/lib/validation/form-validation";

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
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        toast.error("Email not found. Please try again.");
        setSubmitting(false);
        return;
      }

      const response = await setNewPassword({
        email,
        newPassword: values.newPassword,
      }).unwrap();

      if (response?.success) {
        toast.success("Password updated successfully.");
        router.push("/");
        storageEmailLocalStorage(email, "remove");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to set new password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Set New Password
        </h2>

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={resetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <p className="text-sm text-center text-slate-400">
                Choose a strong password with at least 8 characters.
              </p>

              {/* New Password */}
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    disabled={isSubmitting || isLoading}
                    className={`w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="mt-1 text-xs text-red-400"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    disabled={isSubmitting || isLoading}
                    className={`w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="mt-1 text-xs text-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ease-in-out bg-lime-500 text-slate-900 hover:bg-lime-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? (
                  <ButtonIndicator width={11} height={11} />
                ) : (
                  "Set Password"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;

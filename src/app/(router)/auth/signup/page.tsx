"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { useRegisterUserMutation } from "@/app/redux/features/authApi/authApi";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";
import { ISignUpData } from "@/app/types/formType";
import { signUpValidation } from "@/app/lib/validation/form-validation";
import SubmitButton from "@/app/shared/SubmitButton/SubmitButton";

const SignUpPage = () => {
  const [show, setShow] = useState<Record<keyof ISignUpData, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  // ---------- FIELD CONFIG ----------
  const fields: Array<{
    label: string;
    name: keyof ISignUpData;
    type: string;
    placeholder: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isPassword?: boolean;
  }> = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "John Doe",
      Icon: User,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "name@company.com",
      Icon: Mail,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Create a password",
      Icon: Lock,
      isPassword: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      Icon: Lock,
      isPassword: true,
    },
  ];

  // ---------- SUBMIT HANDLER ----------
  const onSubmit = async (
    values: ISignUpData,
    { setFieldError }: FormikHelpers<ISignUpData>
  ) => {
    try {
      console.log("values", values);

      const response = await registerUser(values).unwrap();
      console.log("response", response);
      if (response.success === true) {
        router.push("/auth/signin");
      }
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setFieldError("name", apiError.data?.message || "Something went wrong"); // Set root error on "name" as workaround
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center relative bg-slate-950 text-slate-200 px-4 selection:bg-indigo-500/30"
    >
      <BackgroundGradient />

      <div className="w-full max-w-md z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />

          <div className="p-6">
            {/* HEADER */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2 border border-indigo-500/20">
                <User className="w-6 h-6" />
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                Create your account to get started.
              </p>
            </div>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signUpValidation}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  {fields.map((f) => (
                    <div key={f.name}>
                      <label className="text-sm font-medium text-slate-300 ml-1">
                        {f.label}
                      </label>

                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400">
                          <f.Icon className="w-5 h-5" />
                        </div>

                        <Field
                          name={f.name}
                          type={
                            f.isPassword
                              ? show[f.name]
                                ? "text"
                                : "password"
                              : f.type
                          }
                          placeholder={f.placeholder}
                          className={`w-full pl-10 pr-12 px-4 py-2 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 border outline-none transition-all ${
                            errors[f.name] && touched[f.name]
                              ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-700"
                          }`}
                        />

                        {f.isPassword && (
                          <button
                            type="button"
                            onClick={() =>
                              setShow((prev) => ({
                                ...prev,
                                [f.name]: !prev[f.name],
                              }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800"
                          >
                            {show[f.name] ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </div>

                      <ErrorMessage
                        name={f.name}
                        component="p"
                        className="text-red-400 text-xs ml-1 mt-[4px]"
                      />
                    </div>
                  ))}

                  {/* TERMS CHECKBOX */}
                  <label className="relative flex items-center cursor-pointer group">
                    <input type="checkbox" required className="peer sr-only" />

                    <div className="w-5 h-5 border-2 rounded-md transition-all flex items-center justify-center border-slate-600 bg-slate-800/50 peer-checked:bg-indigo-600 peer-checked:border-indigo-600">
                      <CheckCircle2 className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 text-white" />
                    </div>

                    <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Terms
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  <SubmitButton
                    isLoading={isLoading}
                    LoadingText="Creating account"
                    title="Create account"
                    indicatorWidth={11}
                    indicatorHeight={11}
                    className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </Form>
              )}
            </Formik>

            {/* FOOTER */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;

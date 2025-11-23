"use client";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  FC,
  createRef,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { FaShieldAlt } from "react-icons/fa";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import { useOtpTimer } from "@/app/hooks/useOtpTimer";
import ErrorMessage from "@/app/shared/ErrorMessage/ErrorMessage";
import OtpInput from "@/app/shared/OtpInput/OtpInput";

const VerifyOTP: FC = () => {
  const OTP_LENGTH = 6;
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const { timeLeft, resetTimer, formatTime } = useOtpTimer(300);

  const inputRefs = useRef(
    Array.from({ length: OTP_LENGTH }, () => createRef<HTMLInputElement>())
  );

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.current?.focus();
    setFocusedIndex(index);
  }, []);

  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < OTP_LENGTH - 1) focusInput(index + 1);
    },
    [otp, focusInput]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0)
        focusInput(index - 1);
      if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
        focusInput(index + 1);
      if (e.key === "ArrowLeft" && index > 0) focusInput(index - 1);
    },
    [otp, focusInput]
  );

  const handleVerify = useCallback(async () => {
    setErrorMessage("");
    if (otp.some((d) => !d)) {
      setErrorMessage("Please fill all OTP digits");
      return;
    }

    const email = localStorage.getItem("resetEmail") || "demo@example.com"; // Fallback for demo
    if (!email) {
      setErrorMessage("No email found");
      return;
    }

    try {
      const response: any = await verifyOtp({
        email,
        otpCode: otp.join(""),
      });

      if (response.success) {
        toast.success("OTP verified successfully!");
        router.push("/auth/change-password");
      } else {
        setErrorMessage(response.message || "OTP verification failed");
      }
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setErrorMessage(apiError.data?.message || "OTP verification failed");
    }
  }, [otp, verifyOtp, router]);

  const handleResend = useCallback(async () => {
    setErrorMessage("");
    if (timeLeft > 0) return;

    const email = localStorage.getItem("rememberedEmail") || "demo@example.com"; // Fallback
    if (!email) {
      setErrorMessage("Email not found");
      return;
    }

    try {
      await sendOtp({ email });
      toast.success("Code resent successfully");
      resetTimer();
      setOtp(Array(OTP_LENGTH).fill(""));
      focusInput(0);
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setErrorMessage(apiError.data?.message || "OTP resend failed");
    }
  }, [sendOtp, timeLeft, resetTimer, focusInput]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative gradients inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col items-center relative z-10">
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
              <FaShieldAlt className="w-8 h-8" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
              Verification Code
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-[280px] leading-relaxed">
              We have sent a 6-digit code to your email. Enter it below to
              continue.
            </p>

            {/* Error Message */}
            <ErrorMessage errorMessage={errorMessage} />

            <div className="flex gap-2 md:gap-3 mb-8">
              {otp.map((digit, i) => (
                <OtpInput
                  key={i}
                  value={digit}
                  onChange={(val) => handleChange(val, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  inputRef={inputRefs.current[i]}
                  isFocused={i === focusedIndex}
                  onFocus={() => setFocusedIndex(i)}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying || otp.some((d) => !d)}
              className="w-full py-1.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <ButtonIndicator width={15} height={15} className="py-1.5" />
                </>
              ) : (
                "Verify now"
              )}
            </button>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Didn't receive the code?
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                {timeLeft > 0 ? (
                  <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-slate-700">
                    Resend in {formatTime(timeLeft)}
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

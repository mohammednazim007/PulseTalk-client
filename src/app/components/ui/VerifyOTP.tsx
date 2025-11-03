import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

// Helper component for a single OTP input
interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isFocused: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isFocused,
  onFocus,
}) => (
  <input
    type="text"
    maxLength={1}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    ref={inputRef}
    value={value}
    className={`w-12 h-16 text-center text-3xl font-bold rounded-lg border-2 ${
      isFocused ? "border-lime-500 ring-4 ring-lime-500/50" : "border-slate-300"
    } bg-white text-slate-900 focus:outline-none transition duration-150 ease-in-out shadow-md`}
    style={{ caretColor: "transparent" }}
  />
);

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Refs for inputs
  const inputRefs = useRef(
    Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>())
  );

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].current?.focus();
        setFocusedIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].current?.focus();
      setFocusedIndex(index - 1);
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1].current?.focus();
      setFocusedIndex(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].current?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === otp.length) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log(`Verifying OTP: ${fullOtp}`);
      }, 1500);
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  const allDigitsEntered = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center"
      >
        {/* OTP Heading */}
        <h2 className="text-2xl font-bold mb-2 text-slate-800">
          Enter OTP Code
        </h2>
        <p className="text-xs text-center text-slate-500 mb-8 max-w-[200px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
          nonummy nibh.
        </p>

        {/* OTP Inputs */}
        <div className="flex space-x-2 mb-8">
          {otp.map((digit, index) => (
            <OtpInput
              key={index}
              value={digit}
              onChange={(value) => handleChange(value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={inputRefs.current[index]}
              isFocused={index === focusedIndex}
              onFocus={() => setFocusedIndex(index)}
            />
          ))}
        </div>

        {/* Resend Code */}
        <button
          onClick={handleResend}
          className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition duration-150 ease-in-out mb-6"
          disabled={loading}
        >
          Resend Code
        </button>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || !allDigitsEntered}
          className="w-full py-3 px-4 rounded-xl font-bold text-white transition duration-200 ease-in-out bg-lime-500 hover:bg-lime-600 disabled:bg-lime-300 disabled:cursor-not-allowed text-lg shadow-md hover:shadow-lg"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

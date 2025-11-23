"use client";
import { FC } from "react";
import { motion } from "motion/react";
import { OtpInputProps } from "@/app/types/auth";

const OtpInput: FC<OtpInputProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isFocused,
  onFocus,
}) => (
  <motion.div
    animate={
      isFocused
        ? {
            scale: 1.1,
            borderColor: "#6366f1", // Indigo 500
            boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)",
          }
        : {
            scale: 1,
            borderColor: value ? "#4f46e5" : "#334155", // Indigo 600 or Slate 700
            boxShadow: "none",
          }
    }
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className="w-12 h-14 md:w-14 md:h-16 rounded-xl border-2 bg-slate-900/50 flex items-center justify-center relative overflow-hidden transition-colors"
  >
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className="w-full h-full text-center bg-transparent outline-none text-2xl md:text-3xl font-bold text-white z-10 caret-indigo-500"
    />
    {value && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-indigo-500/10 blur-sm pointer-events-none"
      />
    )}
  </motion.div>
);

export default OtpInput;

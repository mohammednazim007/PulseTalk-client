"use client";
import { FC } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorMessage: FC<{ errorMessage: string }> = ({ errorMessage }) => (
  <AnimatePresence>
    {errorMessage && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mb-6 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20 text-sm font-medium w-full"
      >
        <FaExclamationCircle className="flex-shrink-0" />
        <span>{errorMessage}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorMessage;

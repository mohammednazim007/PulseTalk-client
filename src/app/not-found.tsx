"use client";
import React from "react";
import { RefreshCcw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const NotFound: React.FC<GlobalErrorProps> = ({ reset }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10 flex flex-col items-center text-center">
        {/* Static Icon */}
        <div className="mb-8 relative">
          <div className="relative z-10">
            <GlitchIcon />
          </div>
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200 drop-shadow-sm">
            MALFUNCTION
          </h1>
        </h1>

        <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mb-8 w-full max-w-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 text-red-400 mb-2 font-mono text-sm uppercase tracking-wider">
            {/* Animated Warning Icon */}
            <motion.div
              animate={{
                rotate: [0, 15, -15, 15, -15, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle size={16} />
            </motion.div>
            <span>Error Log</span>
          </div>
          <p className="font-mono text-red-200/80 text-sm break-words">
            {"An unexpected error occurred while processing your request."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all active:scale-95 shadow-lg shadow-red-900/20"
          >
            <RefreshCcw size={18} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            onClick={reset}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-lg font-medium transition-all active:scale-95"
          >
            <Home size={18} />
            <span>Return Safe Zone</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const GlitchIcon: React.FC = () => {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base Shape */}
      <path
        d="M80 20 L140 130 H20 L80 20Z"
        stroke="#EF4444"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="#450a0a"
        fillOpacity="0.5"
      />

      {/* Static Glitch Lines */}
      <g>
        <rect x="75" y="50" width="10" height="40" rx="2" fill="#FCA5A5" />
        <circle cx="80" cy="110" r="6" fill="#FCA5A5" />
      </g>

      {/* Static Glitch Fragments */}
      <rect x="45" y="60" width="20" height="2" fill="#EF4444" opacity="0.8" />
      <rect x="100" y="90" width="30" height="2" fill="#EF4444" opacity="0.6" />
    </svg>
  );
};

export default NotFound;

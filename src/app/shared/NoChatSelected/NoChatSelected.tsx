import { motion } from "motion/react";
import React from "react";
import { MessageSquareDashed, Sparkles, Zap, Command } from "lucide-react";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

const NoChatSelected: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-[#030712] overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none"
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-xl">
        {/* Floating Icons Cluster */}
        <div className="relative mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="relative z-10 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-700/50 ring-1 ring-white/10"
          >
            <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-xl" />
            <MessageSquareDashed
              className="w-16 h-16 text-indigo-400 relative z-10"
              strokeWidth={1.5}
            />

            {/* Active Indicator Badge */}
            <div className="absolute -top-2 -right-2">
              <ButtonIndicator width={4} height={4} />
            </div>
          </motion.div>

          {/* Orbiting Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ width: "200%", height: "200%", left: "-50%", top: "-50%" }}
          >
            <div className="absolute top-0 p-2 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="absolute bottom-10 left-10 p-2 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
              No Conversation Selected
            </span>
          </motion.h6>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-slate-400 max-w-sm mx-auto leading-relaxed font-light"
          >
            Select a conversation from the sidebar to start chatting or create a
            new workspace connection.
          </motion.p>
        </div>

        {/* Keyboard Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
        >
          <Command className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-500 font-medium">
            Press{" "}
            <kbd className="font-sans px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700/50 text-xs">
              K
            </kbd>{" "}
            to search
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default NoChatSelected;

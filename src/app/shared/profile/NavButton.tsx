import { motion } from "motion/react";

const NavButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
      active
        ? "text-white"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTabBg"
        className="absolute inset-0 bg-indigo-600/10 border border-indigo-500/20 rounded-xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span
      className={`relative z-10 text-lg ${
        active ? "text-indigo-400" : "group-hover:text-indigo-400"
      }`}
    >
      {icon}
    </span>
    <span className="relative z-10 font-medium">{label}</span>
    {active && (
      <motion.div
        layoutId="activeTabIndicator"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full"
      />
    )}
  </button>
);

export default NavButton;

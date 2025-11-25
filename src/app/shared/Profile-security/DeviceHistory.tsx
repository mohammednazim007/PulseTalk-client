import { Laptop, LogOut, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { SessionDevice } from "./types";
import { itemVariants } from "./animation";

const MOCK_SESSIONS: SessionDevice[] = [
  {
    id: "s-1",
    device: "Chrome on MacBook Pro",
    location: "San Francisco, CA",
    lastActive: "Active now",
    isCurrent: true,
    icon: "desktop",
  },
  {
    id: "s-2",
    device: "Safari on iPhone 13",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    isCurrent: false,
    icon: "mobile",
  },
  {
    id: "s-3",
    device: "Firefox on Windows PC",
    location: "Austin, TX",
    lastActive: "3 days ago",
    isCurrent: false,
    icon: "desktop",
  },
];

const DeviceHistory = () => {
  return (
    <div>
      <motion.section
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-6">
          Device History
        </h3>
        <div className="space-y-4">
          {MOCK_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    session.isCurrent
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {session.icon === "mobile" ? (
                    <Smartphone size={20} />
                  ) : (
                    <Laptop size={20} />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    {session.device}
                    {session.isCurrent && (
                      <span className="text-[10px] uppercase font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.isCurrent && (
                <button
                  type="button"
                  className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default DeviceHistory;

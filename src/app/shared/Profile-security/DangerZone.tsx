import { motion } from "motion/react";
import { itemVariants } from "./animation";
import { AlertTriangle } from "lucide-react";

const DangerZone = () => {
  return (
    <>
      <motion.section
        variants={itemVariants}
        className="border border-red-900/30 bg-red-950/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-red-200 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Danger Zone
        </h3>
        <p className="text-sm text-red-200/60 mb-6">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          type="button"
          className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl text-sm font-medium transition-colors"
        >
          Delete Account
        </button>
      </motion.section>
    </>
  );
};

export default DangerZone;

import { IProfileForms } from "@/app/types/auth";
import { useFormikContext } from "formik";
import { motion } from "motion/react";
// Components

const ToggleSwitch: React.FC<{
  name: string;
  label: string;
  description?: string;
}> = ({ name, label, description }) => {
  const { values, setFieldValue } = useFormikContext<IProfileForms>();
  // @ts-ignore - dynamic access
  const isOn = values[name] as boolean;

  return (
    <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
      <div className="flex-1 pr-4">
        <div className="font-medium text-slate-200">{label}</div>
        {description && (
          <div className="text-sm text-slate-400 mt-1">{description}</div>
        )}
      </div>
      <button
        type="button"
        className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
          isOn ? "bg-indigo-600" : "bg-slate-700"
        }`}
        onClick={() => setFieldValue(name, !isOn)}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ x: isOn ? 24 : 0 }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

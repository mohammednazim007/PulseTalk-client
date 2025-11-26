import React from "react";
import { Field, ErrorMessage } from "formik";
import { IconType } from "react-icons";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: IconType;
  type?: string;
}

export const FormInput: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  icon: Icon,
  type = "text",
}) => {
  return (
    <div className="group">
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider group-focus-within:text-indigo-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full bg-slate-900/50 border border-slate-700 text-slate-200 text-sm rounded-xl 
            ${Icon ? "pl-11" : "pl-4"} pr-4 py-3
            focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none
            placeholder:text-slate-600 transition-all duration-300 hover:border-slate-600`}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1 animate-pulse"
      />
    </div>
  );
};

export const FormTextArea: React.FC<InputProps & { rows?: number }> = ({
  name,
  label,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="group">
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider group-focus-within:text-indigo-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        <Field
          as="textarea"
          name={name}
          rows={rows}
          placeholder={placeholder}
          className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-3
            focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none
            placeholder:text-slate-600 resize-none transition-all duration-300 hover:border-slate-600"
        />
      </div>
      <div className="flex justify-between items-start mt-1.5">
        <ErrorMessage
          name={name}
          component="div"
          className="text-xs text-rose-500 font-medium animate-pulse"
        />
      </div>
    </div>
  );
};

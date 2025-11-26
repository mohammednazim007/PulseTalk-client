// import React from "react";
// import { motion } from "motion/react";

// const Security_2FA = () => {
//   return (
//     <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
//       <div className="flex items-center justify-between py-4">
//         <div className="flex flex-col">

//             <span className="text-sm font-medium text-white">
//               {"Two-Factor Authentication (2FA)"}
//             </span>

//             <span className="text-xs text-slate-400 mt-1">"Add an extra layer of security to your account by requiring a code when logging in."</span>

//         </div>
//         <button
//           type="button"
//           role="switch"
//           aria-checked={checked}
//           onClick={() =>{}}
//           className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
//             checked ? "bg-indigo-600" : "bg-slate-700"
//           }`}
//         >
//           <span className="sr-only">Use setting</span>
//           <motion.span
//             layout
//             transition={{ type: "spring", stiffness: 700, damping: 30 }}
//             className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
//               checked ? "translate-x-5" : "translate-x-0"
//             }`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Security_2FA;
// import React from "react";
// import { motion } from "motion/react";

// interface Security2FAProps {
//   checked: boolean;
//   onToggle: () => void;
// }

// const Security_2FA: React.FC<Security2FAProps> = ({ checked, onToggle }) => {
//   return (
//     <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
//       <div className="flex items-center justify-between py-4">
//         <div className="flex flex-col">
//           <span className="text-sm font-medium text-white">
//             Two-Factor Authentication (2FA)
//           </span>
//           <span className="text-xs text-slate-400 mt-1">
//             Add an extra layer of security to your account by requiring a code
//             when logging in.
//           </span>
//         </div>

//         <button
//           type="button"
//           role="switch"
//           aria-checked={checked}
//           onClick={onToggle}
//           className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
//             checked ? "bg-indigo-600" : "bg-slate-700"
//           }`}
//         >
//           <motion.span
//             layout
//             transition={{ type: "spring", stiffness: 700, damping: 30 }}
//             className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ${
//               checked ? "translate-x-5" : "translate-x-0"
//             }`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Security_2FA;

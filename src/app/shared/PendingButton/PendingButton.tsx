// src/app/shared/UserButtonCard/PendingButton.jsx

import { FaClock } from "react-icons/fa";

interface PendingButtonProps {
  baseClasses: string;
}

const PendingButton = ({ baseClasses }: PendingButtonProps) => {
  return (
    <button
      type="button"
      disabled
      // UI/Animation: Pulse effect to draw attention to the pending state
      className={`${baseClasses} bg-gray-600 text-gray-200 cursor-not-allowed 
                  opacity-90 animate-pulse flex items-center justify-center space-x-1`}
    >
      <FaClock className="w-3 h-3" />
      <span>Pending</span>
    </button>
  );
};

export default PendingButton;

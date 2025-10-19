// src/app/shared/UserButtonCard/AddButton.jsx

import { FaUserPlus, FaSpinner } from "react-icons/fa";

interface AddButtonProps {
  userId: string;
  onClick: (userId: string) => void;
  isLoading: boolean;
}

const AddButton = ({ userId, onClick, isLoading }: AddButtonProps) => {
  const baseClasses =
    "text-xs font-semibold py-2 px-3 rounded-md shadow-sm transition duration-300 ease-in-out whitespace-nowrap";

  return (
    <button
      type="button"
      onClick={() => onClick(userId)}
      disabled={isLoading}
      // UI/Animation: scale-105 on hover, blue color
      className={`${baseClasses} bg-blue-500 text-white 
                  hover:bg-blue-600 hover:scale-[1.02] 
                  disabled:bg-blue-400 disabled:cursor-wait 
                  flex items-center justify-center space-x-1`}
    >
      {isLoading ? (
        <>
          <FaSpinner className="w-3 h-3 animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <FaUserPlus className="w-3 h-3" />
          <span>Add</span>
        </>
      )}
    </button>
  );
};

export default AddButton;

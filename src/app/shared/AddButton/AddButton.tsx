// src/app/shared/UserButtonCard/AddButton.jsx

import { FaUserPlus, FaSpinner } from "react-icons/fa";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

interface AddButtonProps {
  userId: string;
  onClick: (userId: string) => void;
  isLoading: boolean;
}

const AddButton = ({ userId, onClick, isLoading }: AddButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(userId)}
      disabled={isLoading}
      className={``}
    >
      {isLoading ? (
        <span className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition text-xs space-x-2">
          <ButtonIndicator />
        </span>
      ) : (
        <span className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition text-xs space-x-2">
          <FaUserPlus className="w-3 h-3" />
          <span className="text-sx">Connect</span>
        </span>
      )}
    </button>
  );
};

export default AddButton;

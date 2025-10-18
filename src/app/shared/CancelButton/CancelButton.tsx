// // src/app/shared/UserButtonCard/CancelButton.jsx

// import { FaUserMinus } from "react-icons/fa";

// interface CancelButtonProps {
//   userId: string;
//   baseClasses: string;
//   onClick: (userId: string) => void;
// }

// const CancelButton = ({ userId, baseClasses, onClick }: CancelButtonProps) => {
//   return (
//     <button
//       type="button"
//       onClick={() => onClick(userId)}
//       // UI/Animation: Subtle background change and slight scale on hover
//       className={`${baseClasses} border border-gray-600 text-gray-400
//                   bg-transparent hover:bg-gray-700/60 hover:text-white
//                   hover:scale-[1.02] focus:ring-1 focus:ring-gray-500 flex items-center justify-center space-x-1`}
//     >
//       <FaUserMinus className="w-3 h-3" />
//       <span>Cancel</span>
//     </button>
//   );
// };

// export default CancelButton;
import { FaUserMinus } from "react-icons/fa";

interface CancelButtonProps {
  userId: string;
  baseClasses: string;
  onClick: (userId: string) => void;
  isLoading?: boolean; // 👈 added optional prop
}

const CancelButton = ({
  userId,
  baseClasses,
  onClick,
  isLoading,
}: CancelButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => !isLoading && onClick(userId)} // disable click during loading
      disabled={isLoading}
      className={`${baseClasses} border border-gray-600 text-gray-400 
        bg-transparent hover:bg-gray-700/60 hover:text-white 
        hover:scale-[1.02] focus:ring-1 focus:ring-gray-500 
        flex items-center justify-center space-x-1
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <span className="text-xs animate-pulse">Removing...</span>
      ) : (
        <>
          <FaUserMinus className="w-3 h-3" />
          <span>Cancel</span>
        </>
      )}
    </button>
  );
};

export default CancelButton;

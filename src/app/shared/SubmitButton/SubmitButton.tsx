// import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

// interface SubmitButtonProps {
//   isLoading: boolean;
//   isSubmitting: boolean;
//   LoadingText?: string;
//   title?: string;
//   indicatorWidth?: number;
//   indicatorHeight?: number;
//   className?: string;
//   isDisabled?: boolean;
//   onClick?: () => void;
// }

// const SubmitButton = ({
//   isLoading,
//   isSubmitting,
//   LoadingText = "Save Changes",
//   title = "Save Changes",
//   indicatorWidth = 10,
//   indicatorHeight = 10,
//   className,
//   isDisabled,
//   onClick,
// }: SubmitButtonProps) => {
//   const disabled = isLoading || isSubmitting || isDisabled;

//   return (
//     <button
//       type="submit"
//       disabled={disabled}
//       className={`
//         flex items-center justify-center gap-2
//         px-4 py-1.5 rounded-lg font-medium text-white
//         shadow-lg shadow-indigo-500/20 transition-all
//         ${
//           disabled
//             ? "cursor-wait bg-indigo-700"
//             : "bg-indigo-600 hover:bg-indigo-500"
//         }
//         ${className}
//       `}
//     >
//       {disabled ? (
//         <>
//           <span>{LoadingText}</span>
//           <ButtonIndicator width={indicatorWidth} height={indicatorHeight} />
//         </>
//       ) : (
//         <span>{title}</span>
//       )}
//     </button>
//   );
// };

// export default SubmitButton;

import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

interface SubmitButtonProps {
  isLoading?: boolean;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  LoadingText?: string;
  title?: string;
  indicatorWidth?: number;
  indicatorHeight?: number;
  className?: string;
  onClick?: () => void;
}

const SubmitButton = ({
  isLoading,
  isSubmitting,
  isDisabled = false,
  LoadingText = "Saving...",
  title = "Submit",
  indicatorWidth = 10,
  indicatorHeight = 10,
  className = "",
  onClick,
}: SubmitButtonProps) => {
  const showLoading = isLoading || isSubmitting;
  const disabled = showLoading || isDisabled;

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`
        flex items-center justify-center gap-2
        px-4 py-1.5 rounded-lg font-medium text-white
        shadow-lg shadow-indigo-500/20 transition-all
        ${
          disabled
            ? "cursor-not-allowed bg-indigo-700"
            : "bg-indigo-600 hover:bg-indigo-500"
        }
        ${className}
      `}
    >
      {showLoading ? (
        <>
          <span>{LoadingText}</span>
          <ButtonIndicator width={indicatorWidth} height={indicatorHeight} />
        </>
      ) : (
        <span className="text-center w-full">{title}</span>
      )}
    </button>
  );
};

export default SubmitButton;

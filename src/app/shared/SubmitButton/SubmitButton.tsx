import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

const SubmitButton = ({
  isSubmitting,
  isLoading,
}: {
  isSubmitting: boolean;
  isLoading: boolean;
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-white shadow-lg shadow-indigo-500/20 transition-all ${
        isSubmitting
          ? "bg-indigo-700 cursor-wait"
          : "bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0"
      }`}
    >
      {isSubmitting || isLoading ? (
        <>
          <span>Saving</span> <ButtonIndicator width={10} height={10} />
        </>
      ) : (
        <>Save Changes</>
      )}
    </button>
  );
};
export default SubmitButton;

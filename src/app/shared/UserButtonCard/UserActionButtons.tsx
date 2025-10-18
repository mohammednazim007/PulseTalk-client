import { User } from "@/app/types/auth";

interface UserAction {
  user: User;
}

const UserActionButtons = ({ user }: UserAction) => {
  // 1. Define Common Button Classes
  const baseClasses =
    "font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const onCancelFriendship = (userId: string) => {};

  const onAddFriend = (userId: string) => {};
  return (
    <>
      {user.isFriend ? (
        <button
          type="button" // Defined type
          onClick={() => onCancelFriendship(user._id)}
          className={`${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500`}
        >
          Cancel
        </button>
      ) : (
        <button
          type="button" // Defined type
          onClick={() => onAddFriend(user._id)}
          className={`${baseClasses} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500`}
        >
          Add
        </button>
      )}
    </>
  );
};

export default UserActionButtons;

import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import PendingButton from "../PendingButton/PendingButton";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "@/app/redux/features/friends/friendApi";

interface UserAction {
  user: User;
}

const UserActionButtons = ({ user }: UserAction) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();

  if (!currentUser) return null;

  // --- RELATIONSHIP LOGIC ---
  const isFriend = currentUser.friends?.includes(user._id) ?? false;
  const isPending =
    currentUser.sentRequests?.includes(user._id) ||
    user.friendRequests?.includes(currentUser._id);

  // ---ADD FRIEND HANDLERS  ---
  const handleAddFriend = async (receiverId: string) => {
    try {
      await addFriend({ senderId: currentUser._id, receiverId }).unwrap();
      console.log("✅ Friend request sent");
    } catch (err) {
      console.error("❌ Failed to send request:", err);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      console.log("🗑️ Friend removed");
    } catch (err) {
      console.error("❌ Failed to remove friend:", err);
    }
  };

  // --- BUTTON STYLES ---
  const baseClasses =
    "text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition duration-300 ease-in-out whitespace-nowrap";

  // --- CONDITIONAL RENDER ---
  if (isFriend) {
    return (
      <CancelButton
        userId={user._id}
        baseClasses={baseClasses}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );
  }

  if (isPending) {
    return <PendingButton baseClasses={baseClasses} />;
  }

  return (
    <AddButton
      userId={user._id}
      baseClasses={baseClasses}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;

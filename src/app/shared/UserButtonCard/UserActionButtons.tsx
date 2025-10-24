"use client";
import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import PendingButton from "../PendingButton/PendingButton";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";

interface UserActionProps {
  user: User;
}

const UserActionButtons = ({ user }: UserActionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();

  if (!currentUser) return null;

  // ---------------- RELATIONSHIP LOGIC ----------------

  const isFriend =
    currentUser.friends?.includes(user._id) &&
    user.friends?.includes(currentUser._id);

  // Request sent by current user
  const currentUserSentRequest = currentUser.sentRequests?.includes(user._id);
  // Request received by current user from target user
  const currentUserReceivedRequest = currentUser.friendRequests?.includes(
    user._id
  );

  // ---------------- HANDLERS ----------------

  const handleAddFriend = async (receiverId: string) => {
    try {
      await addFriend({ senderId: currentUser._id, receiverId }).unwrap();
      toast.success("✅ Friend request sent");
    } catch (err) {
      toast.error("❌ Failed to send request");
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      toast.success("🗑️ Friend request cancelled/removed");
    } catch (err) {
      toast.error("❌ Failed to remove friend");
    }
  };

  // ---------------- CONDITIONAL RENDER ----------------

  // Already friends → show cancel button (to remove friend)
  if (isFriend) {
    return (
      <CancelButton
        userId={user._id}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );
  }

  // Current user sent request → show pending
  if (currentUserSentRequest) {
    return <PendingButton />;
  }

  // Current user received request from target → show cancel (can reject)
  if (currentUserReceivedRequest) {
    return (
      <CancelButton
        userId={user._id}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );
  }

  // Default → can send friend request
  return (
    <AddButton
      userId={user._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;

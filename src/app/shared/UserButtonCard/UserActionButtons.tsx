"use client";
import { User } from "@/app/types/auth";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetFriendsQuery,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";
import { playSound } from "@/app/utility/playSound";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { useState, useEffect } from "react";

interface UserActionProps {
  friendUser: User;
}

const UserActionButtons = ({ friendUser }: UserActionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [localFriendRequests, setLocalFriendRequests] = useState<string[]>([]);

  // Initialize local state from currentUser
  useEffect(() => {
    if (currentUser?.friendRequests) {
      setLocalFriendRequests(currentUser.friendRequests);
    }
  }, [currentUser?.friendRequests]);

  const [sendFriendRequest, { isLoading: isAdding }] =
    useSendFriendRequestMutation();
  const [deleteFriendRequest, { isLoading: isRemoving }] =
    useDeleteFriendRequestMutation();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();

  if (!currentUser) return null;

  // ---- HANDLERS ----
  //* Add Friend Handler with receiverId
  const handleAddFriend = async (receiverId: string) => {
    try {
      await sendFriendRequest({
        senderId: currentUser._id,
        receiverId,
      }).unwrap();

      // Play success sound
      playSound("success");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Failed to send request");
    }
  };

  // * Accept Friend Request Handler with senderId
  const handleAcceptRequest = async (senderId: string) => {
    try {
      await acceptRequest({ senderId, receiverId: currentUser._id }).unwrap();
      //Refetch to ensure UI is updated
      playSound("success");
    } catch {
      toast.error("❌ Failed to accept request");
    }
  };

  // ** Remove the friend request
  const handleRemoveFriend = async (receiverId: string) => {
    try {
      await deleteFriendRequest(receiverId).unwrap();
      // Update local state immediately
      setLocalFriendRequests((prev) => prev.filter((id) => id !== receiverId));
      toast.success("Request cancelled");

      //Refetch to ensure UI is updated
      playSound("cancel");
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel request");
    }
  };

  // ---- RELATIONSHIP STATES ----
  const isFriendRequest = localFriendRequests.includes(friendUser._id);

  // ---- CONDITIONAL BUTTON RENDERING ----
  if (isFriendRequest)
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleAcceptRequest(friendUser._id)}
          disabled={isAccepting}
          className="px-3 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition text-xs"
        >
          {isAccepting ? <ButtonIndicator /> : "Confirm"}
        </button>
        <button
          onClick={() => handleRemoveFriend(friendUser._id)}
          disabled={isRemoving}
          className=" bg-gray-300 text-gray-800 rounded-ms hover:bg-gray-400 transition text-sx px-3 py-1 rounded-sm text-xs"
        >
          {isRemoving ? <ButtonIndicator /> : "Cancel"}
        </button>
      </div>
    );

  return (
    <AddButton
      userId={friendUser._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;

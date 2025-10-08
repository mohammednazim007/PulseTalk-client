import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../types/auth";
import { getSocket } from "../socket-io/socket-io";

export const useTypingIndicator = (
  currentUserId: string | undefined,
  activeUser: User | null
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    //** Ensure we have a socket and both users are defined
    if (!socket || !currentUserId || !activeUser) return;

    //**  Function to handle the 'user_typing' event
    const handleUserTyping = (senderId: string) => {
      if (senderId === activeUser._id) {
        setIsTyping(true);
      }
    };

    //** Function to handle the 'user_stop_typing' event
    const handleUserStopTyping = (senderId: string) => {
      if (senderId === activeUser._id) {
        setIsTyping(false);
      }
    };

    //** Attach event listeners
    socket.on("user_typing", handleUserTyping);
    socket.on("user_stop_typing", handleUserStopTyping);

    // ** Cleanup:
    return () => {
      socket.off("user_typing", handleUserTyping);
      socket.off("user_stop_typing", handleUserStopTyping);
    };
  }, [activeUser, currentUserId]);

  return [isTyping, setIsTyping];
};

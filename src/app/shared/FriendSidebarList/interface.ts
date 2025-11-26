import { IUser } from "@/app/types/userType";

export interface FriendListProps {
  friends: IUser[];
  onlineUsers: string[];
  onClick: (friend: IUser) => void; // ← fixed: should accept a User
}

export interface FriendListItemProps {
  friend: IUser;
  isOnline: boolean;
  isSelected: boolean;
  onClick: (friend: IUser) => void;
}

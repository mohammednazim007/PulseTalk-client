import { IUser } from "@/app/types/userType";

export interface IChatMessage {
  _id?: string;
  friend_id?: string;
  user_id?: string;
  text?: string;
  media?: string;
  createdAt?: string;
}

export interface OnlineState {
  onlineUsers: string[];
  activeUser: IUser | null;
  chat: IChatMessage[];
  loading: boolean;
  error: string | null;
  closeSidebar: boolean;
}

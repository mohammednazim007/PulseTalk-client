import { IFriend } from "@/app/types/friend.types";

export interface OnlineState {
  onlineUsers: IFriend[];
  activeUser: IFriend | null;
}

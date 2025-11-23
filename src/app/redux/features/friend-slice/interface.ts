import { IUser } from "@/app/types/userType";

export interface IFriendsState {
  friends: IUser[];
  isLoading: boolean;
  isError: null | string;
}

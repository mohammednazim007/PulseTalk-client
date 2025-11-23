import { IUser } from "./userType";

export interface IResponse {
  success: boolean;
  message: string;
  email?: string;
  users?: IUser[];
}
export interface ILoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: IUser;
}

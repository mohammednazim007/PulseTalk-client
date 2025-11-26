import { KeyboardEvent, RefObject } from "react";
import { IUser } from "./userType";

export interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

export interface IOtpVerify {
  email: string;
  otpCode: string;
  verify: boolean;
}
export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  isFocused: boolean;
}

export interface IOTPResponse {
  message: string;
  success: boolean;
  verify: boolean;
}

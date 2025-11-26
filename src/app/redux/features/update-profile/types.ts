import { IUser } from "@/app/types/userType";

export interface IUpdateProfile {
  data: IUser;
  success: boolean;
  message: string;
}

// TypeScript Interface for Zod Error
export interface CustomRTKError {
  data: {
    message: string;
    success: boolean;
  };
}

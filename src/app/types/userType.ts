export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
  password?: string;
  role?: string;
  location?: string;
  bio?: string;
  phone?: string;
  website?: string;

  twitter?: string;
  github?: string;
  linkedin?: string;
  marketingEmails?: boolean;
  securityEmails?: boolean;
  productUpdates?: boolean;

  isFriend?: boolean;
  friends?: string[];
  friendRequests?: string[];
  sentRequests?: string[];
  blockedUsers?: string[];
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfileForms {
  name?: string;
  role?: string;
  location?: string;
  bio?: string;
  phone?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  marketingEmails?: boolean;
  securityEmails?: boolean;
  productUpdates?: boolean;
  image?: File | null;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface IUpdateProfileResponse {
  success: boolean;
  message: string;
  user: IUser;
}

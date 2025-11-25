export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  avatarUrl: string;
  name: string;
  twoFactorEnabled: boolean;
}

export interface SecurityFormValues {
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

export interface SessionDevice {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  icon: "desktop" | "mobile";
}

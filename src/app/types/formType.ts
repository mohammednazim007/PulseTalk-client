export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  avatar?: File | null | string;
}

export type PasswordFields = {
  newPassword: string;
  confirmPassword: string;
};

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPassword {
  email: string;
}

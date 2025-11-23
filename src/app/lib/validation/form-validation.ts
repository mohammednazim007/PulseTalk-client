import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // 1 uppercase, 1 number, min 6 chars

// ** signUpValidation
export const signUpValidation = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().matches(emailRegex, "Invalid email").required("Required"),
  password: Yup.string()
    .matches(passwordRegex, "Weak password")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

// ** profileValidation
export const profileValidation = Yup.object().shape({
  name: Yup.string().required("Required"),
  role: Yup.string().max(50, "Too long"),
  location: Yup.string().max(50, "Too long"),
  bio: Yup.string().max(500, "Too long"),
  phone: Yup.string(),
  website: Yup.string().url("Invalid URL"),
  twitter: Yup.string().matches(/^@?(\w){1,15}$/, "Invalid handle"),
  github: Yup.string(),
  linkedin: Yup.string(),
  currentPassword: Yup.string(),
  newPassword: Yup.string().matches(passwordRegex, "Weak password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Must match"),
});

// ** signInValidation
export const signInValidation = Yup.object().shape({
  email: Yup.string().matches(emailRegex, "Invalid email").required("Required"),
  password: Yup.string()
    .matches(passwordRegex, "Weak password")
    .required("Required"),
});

// ** resetPasswordValidation
export const resetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .matches(passwordRegex, "Weak password")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Must match")
    .required("Required"),
});

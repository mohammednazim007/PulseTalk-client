import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

// ** Email validation
export const resetEmailValidation = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Invalid email format") // Applies your custom regex
    .required("Email is required"),
});

// ** resetPasswordValidation
export const resetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

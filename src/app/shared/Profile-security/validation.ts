import * as Yup from "yup";

export const SecuritySchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is required"),
  currentPassword: Yup.string(),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[^\w]/, "Password must contain a symbol")
    .when("currentPassword", {
      is: (val: string) => val && val.length > 0,
      then: (schema) =>
        schema.required("New password is required to change password"),
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .when("newPassword", {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required("Confirm your new password"),
    }),
  twoFactorEnabled: Yup.boolean(),
});

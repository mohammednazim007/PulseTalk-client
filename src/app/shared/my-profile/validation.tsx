import * as Yup from "yup";

export const ProfileValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  role: Yup.string().required("Job title is required"),
  location: Yup.string().required("Location is required"),
  bio: Yup.string().max(500, "Bio must be 500 characters or less"),
  website: Yup.string()
    .url("Please enter a valid URL (https://...)")
    .nullable(),
  twitter: Yup.string(),
  github: Yup.string(),
  linkedin: Yup.string(),
});

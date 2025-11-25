import * as Yup from "yup";

// --- Validation Schema ---
export const ProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name too short"),
  role: Yup.string().required("Role is required"),
  location: Yup.string().required("Location is required"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  website: Yup.string().url("Invalid URL format"),
  twitter: Yup.string(),
  github: Yup.string(),
  linkedin: Yup.string(),
});

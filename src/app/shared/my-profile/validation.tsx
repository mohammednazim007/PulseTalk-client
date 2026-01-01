import * as Yup from "yup";

// --- Validation Schema ---
export const ProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name too short"),
  role: Yup.string().max(50, "Role must be less than 50 characters"),
  location: Yup.string().max(50, "Location must be less than 50 characters"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  website: Yup.string().url("Invalid URL format"),
  twitter: Yup.string(),
  github: Yup.string(),
  linkedin: Yup.string(),
});

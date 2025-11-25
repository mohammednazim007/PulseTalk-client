export interface IMyProfile {
  name: string;
  role: string;
  location: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
  avatar: File | null | string;
}

export interface FileInfoState {
  name: string | null;
  size: string | null;
  error: string | null;
}

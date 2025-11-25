export interface IMyProfile {
  name: string;
  role: string;
  location: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
  avatar: string | null;
}

export interface FileInfoState {
  name: string | null;
  size: number | null;
  error: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
  avatar: string;
}

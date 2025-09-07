/*
{
    "_id": "68b538fcef71c24bb7d8e858",
    "username": "aryen1101",
    "email": "aryenmukundam@gmail.com",
    "profilePicture": "",
    "bio": "",
    "followers": [],
    "following": [],
    "posts": [],
    "reels": [],
    "story": [],
    "replies": [],
    "likes": [],
    "dislikes": [],
    "createdAt": "2025-09-01T06:11:08.544Z",
    "updatedAt": "2025-09-01T06:11:08.544Z",
    "__v": 0
}
*/

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  followers?: Object[];
  following?: Object[];
  posts?: Object[];
  reels?: Object[];
  story?: Object[];
  replies?: Object[];
  likes?: Object[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User | null;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

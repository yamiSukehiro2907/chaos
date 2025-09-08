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
    followers?: object[];
    following?: object[];
    posts?: object[];
    reels?: object[];
    story?: object[];
    replies?: object[];
    likes?: object[];
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

export interface AuthContextType {
    // State
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;


    // Actions
    checkAuth(): Promise<void>;
    login(credentials: LoginCredentials): Promise<void>;
    register(credentials: SignUpCredentials): Promise<void>;

}

export interface AuthResponse {
    user: User;
    message: string;
}
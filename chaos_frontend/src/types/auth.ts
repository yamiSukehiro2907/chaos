import type {User} from "@/types/Schema/User.ts";

export interface LoginCredentials {
    username: string,
    password: string,
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export interface AuthResponse {
    user: User,
    message: string
}
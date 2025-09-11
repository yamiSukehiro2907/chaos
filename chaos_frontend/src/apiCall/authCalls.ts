import type {AxiosResponse} from "axios";
import api from "@/apiCall/axiosConfig.ts";
import type {AuthResponse, LoginCredentials, SignUpCredentials} from "@/types/auth.ts";

export const fetchUser = async (): Promise<AuthResponse | undefined> => {
    try {
        const response: AxiosResponse<AuthResponse> = await api.get("/users/profile");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const signUp = async (credentials: SignUpCredentials): Promise<void> => {
    try {
        await api.post("/users/signup", {credentials: credentials});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const signIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
        const response = await api.post("/users/login", {credentials: credentials});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
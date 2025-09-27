import api from "@/apiCall/axiosConfig.ts";
import type { LoginCredentials, SignUpCredentials } from "@/types/auth.ts";

export const signUp = async (credentials: SignUpCredentials): Promise<void> => {
  try {
    await api.post("/auth/signup", credentials);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signIn = async (credentials: LoginCredentials): Promise<void> => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw error;
  }
};

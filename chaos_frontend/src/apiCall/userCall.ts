import type { AxiosResponse } from "axios";
import { type AuthResponse } from "@/types/auth.ts";
import api from "@/apiCall/axiosConfig.ts";

export const fetchCurrentUser = async (): Promise<AuthResponse | undefined> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.get(
      "/users/profile",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

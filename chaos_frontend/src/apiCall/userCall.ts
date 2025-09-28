import api from "@/apiCall/axiosConfig.ts";
import type { User } from "@/types/Schema/User";

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get("/users/profile", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await api.get(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProfile = async (formData: FormData): Promise<User> => {
  try {
    const response = await api.put("/users/editProfile", formData, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

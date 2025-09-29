import api from "@/apiCall/axiosConfig.ts";
import type { Post } from "@/types/Schema/Post";

export const createPost = async (formData: FormData): Promise<Post> => {
  try {
    const response = await api.post("/posts/create", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

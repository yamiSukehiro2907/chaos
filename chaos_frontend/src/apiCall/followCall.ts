import api from "@/apiCall/axiosConfig.ts";

export const followUser = async (id: string): Promise<void> => {
  try {
    const response = await api.post(`/friends/follow/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unFollowUser = async (id: string): Promise<void> => {
  try {
    const response = await api.post(`/friends/unfollow/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

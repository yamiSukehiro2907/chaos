import { fetchCurrentUser } from "@/apiCall/userCall";
import { setUserData } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchCurrentUser();
        dispatch(setUserData(response?.user));
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

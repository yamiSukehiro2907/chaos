import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setError } from "@/redux/slices/userSlice";
import { fetchCurrentUser } from "@/apiCall/userCall";

export const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const userObject = await fetchCurrentUser();
        if (userObject) {
          dispatch(setUserData(userObject));
        } else {
          throw new Error("API call succeeded but returned no user data.");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(setError("No valid session found."));
      }
    };
    validateSession();
  }, [dispatch]);
};

import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/Schema/User.ts";

interface UserState {
  userData: User | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  userData: null,
  isLoading: true,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false; 
      state.error = "";
    },
    clearUserData: (state) => {
      state.userData = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUserData, clearUserData, setLoading, setError } =
  userSlice.actions;
export default userSlice.reducer;

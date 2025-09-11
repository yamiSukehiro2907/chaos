import {createSlice} from "@reduxjs/toolkit";
import type {User} from "@/types/Schema/User.ts";

interface UserState {
    userData: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userData: null,
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
        },
    }
});

export const {setUserData, clearUserData} = userSlice.actions;
export default userSlice.reducer;
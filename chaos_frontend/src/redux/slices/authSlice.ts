import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    refreshToken: string;
    accessToken: string;
    isLoading: boolean;
    error: string | null
}

const initialState: AuthState = {
    isLoggedIn: false,
    refreshToken: '',
    accessToken: '',
    isLoading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state: AuthState) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.isLoggedIn = false;
        },
        logIn: (state: AuthState, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        }
    }
})

export const {logOut , logIn} = authSlice.actions;
export default authSlice.reducer;
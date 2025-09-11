import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts"
import authReducer from "./slices/authSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts";
import postReducer from "./slices/postSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

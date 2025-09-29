import type { Post } from "@/types/Schema/Post";
import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  postData: Post[];
}

const initialState: PostState = {
  postData: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;

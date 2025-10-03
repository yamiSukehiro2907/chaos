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

    updatePost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.postData.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index !== -1) {
        state.postData[index] = updatedPost;
      }
    },
  },
});

export const { setPostData , updatePost} = postSlice.actions;
export default postSlice.reducer;

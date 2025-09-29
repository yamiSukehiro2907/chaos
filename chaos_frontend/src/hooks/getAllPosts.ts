import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "@/apiCall/postCall";
import { setPostData } from "@/redux/slices/postSlice";

export const useGetAllPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postObjectArray = await getAllPosts();
        dispatch(setPostData(postObjectArray));
      } catch (error) {
        console.error("Error fetching all posts", error);
      }
    };
    getPosts();
  }, [dispatch]);
};

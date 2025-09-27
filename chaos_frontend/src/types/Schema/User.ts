import { type Post } from "@/types/Schema/Post.ts";
import type { Replies } from "@/types/Schema/Replies.ts";
import type { Story } from "@/types/Schema/Story.ts";
import type { Reel } from "@/types/Schema/Reel.ts";

export interface User {
  id: string;
  username: string;
  email: string;
  name: string,
  profilePicture?: string;
  bio?: string;
  followers?: User[];
  following?: User[];
  posts?: Post[];
  reels?: Reel[];
  story?: Story[];
  replies?: Replies[];
  likes?: object[];
  createdAt: string
}

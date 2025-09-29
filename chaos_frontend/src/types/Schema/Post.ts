import type { Replies } from "./Replies";
import type { User } from "./User";

export interface Post {
  id: string,
  author: User,
  mediaType: string,
  mediaUrl: string,
  caption: string,
  likes: User[],
  comments: Replies[],
  createdAt: string,
  updatedAt: string
}

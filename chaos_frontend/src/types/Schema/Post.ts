import type { User } from "./User";

export interface Post {
  id: string,
  author: string,
  user: User,
  mediaType: string,
  mediaUrl: string,
  caption: string,
  likes: [],
  comments: [],
  createdAt: string,
  updatedAt: string
}

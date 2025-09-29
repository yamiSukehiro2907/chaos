export interface Post {
  _id: string;
  author: {
    name: string;
    username: string;
    profilePicture: string;
  };
  mediaType: string;
  mediaUrl: string;
  caption: string;
  likes: [];
  comments: [];
  createdAt: string;
  updatedAt: string;
}

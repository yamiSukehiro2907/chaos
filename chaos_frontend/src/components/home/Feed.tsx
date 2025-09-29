import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { getAllPosts } from "@/apiCall/postCall";
import type { Post } from "@/types/Schema/Post";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    Record<string, boolean>
  >({});
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    showNotification("Post liked!");
  };

  const handleComment = () => {
    showNotification("Comment feature coming soon!");
  };

  const handleShare = () => {
    showNotification("Post shared!");
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    showNotification("Post saved!");
  };

  return (
    <div className="w-full space-y-6">
      {notification && (
        <div className="fixed top-20 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {posts.map((post) => (
        <Card
          key={post._id}
          className="w-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-blue-300 hover:ring-blue-400 transition-all">
                <AvatarImage
                  src={post.author.profilePicture}
                  alt={post.author.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-200 to-blue-300 text-blue-700 font-semibold">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 text-lg">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-600">
                  @{post.author.username} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          <CardContent className="pt-0 px-6 pb-6">
            {post.mediaUrl && (
              <div className="mb-6 rounded-xl overflow-hidden border border-blue-200">
                {post.mediaType === "image" ? (
                  <img
                    src={post.mediaUrl}
                    alt="Post content"
                    className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
                  />
                ) : (
                  <video
                    src={post.mediaUrl}
                    controls
                    className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
                  />
                )}
              </div>
            )}

            <p className="mb-4 leading-relaxed text-gray-800 text-base">
              {post.caption}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-blue-200">
              <div className="flex items-center space-x-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post._id)}
                  className={`transition-colors px-4 py-2 ${
                    likedPosts[post._id]
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      likedPosts[post._id] ? "fill-current" : ""
                    }`}
                  />
                  {post.likes.length + (likedPosts[post._id] ? 1 : 0)}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {post.comments.length}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2"
                >
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleBookmark(post._id)}
                className={`transition-colors w-10 h-10 ${
                  bookmarkedPosts[post._id]
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarkedPosts[post._id] ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;

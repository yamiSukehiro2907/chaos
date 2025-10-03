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
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { likePost } from "@/apiCall/postCall";
import { updatePost } from "@/redux/slices/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { postData } = useSelector((state: RootState) => state.post);
  const { userData } = useSelector((state: RootState) => state.user);
  const userId = userData?._id;

  const handleLike = async (postId: string) => {
    try {
      const response = await likePost(postId);
      dispatch(updatePost(response));
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  const isPostLikedByUser = (postLikes: string[]) => {
    console.log("UserId: "  , userId)
    console.log("Liked Users: " , postLikes)
    return postLikes.some((id) => id.toString() === userId?.toString());
  };

  return (
    <div className="space-y-6">
      {postData.map((post) => {
        const isLiked = isPostLikedByUser(post.likes);

        return (
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
                    {post.author.name}
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
                      isLiked
                        ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                        : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 transition-all ${
                        isLiked ? "fill-red-500" : ""
                      }`}
                    />
                    {post.likes.length}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {post.comments.length}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2"
                  >
                    <Share className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 transition-colors w-10 h-10"
                >
                  <Bookmark className="w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Feed;

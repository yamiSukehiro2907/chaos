import React, { useState, useRef } from "react";
import {
  Image,
  Video,
  X,
  Upload,
  ArrowLeft,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { createPost } from "@/apiCall/postCall";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { userData } = useSelector((state: RootState) => state.user);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      alert("Please select an image or video file");
      return;
    }

    setMediaFile(file);
    setMediaType(isImage ? "image" : "video");

    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!mediaFile) {
      alert("Please select an image or video to post");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("media", mediaFile);
      formData.append("caption", caption);
      formData.append("mediaType", mediaType!);

      const response = await createPost(formData);

      if (response) {
        setCaption("");
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        alert("Post created successfully!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/50"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-blue-300">
                <AvatarImage
                  src={userData?.profilePicture}
                  alt={userData?.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-200 to-blue-300 text-blue-700 font-semibold">
                  {userData?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">{userData?.name}</p>
                <p className="text-sm text-gray-600">@{userData?.username}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div>
                <Textarea
                  placeholder="What's on your mind?"
                  value={caption}
                  onChange={(e: any) => setCaption(e.target.value)}
                  className="min-h-[120px] text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                  maxLength={2000}
                />
                <div className="flex justify-end mt-2">
                  <span className="text-sm text-gray-500">
                    {caption.length}/2000
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {!mediaPreview ? (
                  <div
                    className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Add photos or videos
                        </p>
                        <p className="text-sm text-gray-500">
                          Drag and drop or click to browse
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <Badge
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          <Image className="w-4 h-4 mr-1" />
                          Images
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Videos
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden border border-blue-200">
                      {mediaType === "image" ? (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="w-full max-h-96 object-cover"
                        />
                      ) : (
                        <video
                          src={mediaPreview}
                          controls
                          className="w-full max-h-96"
                        />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full"
                      onClick={removeMedia}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!mediaFile || isUploading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6"
                >
                  {isUploading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Post</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;

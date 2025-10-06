import React, { useState, useEffect } from "react";
import {
  Search,
  MessageCircle,
  MoreHorizontal,
  Calendar,
  Camera,
  Film,
  Users,
  MessageSquare,
  Edit3,
  Loader2,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername } from "@/apiCall/userCall";
import { setProfileData, setUserData } from "@/redux/slices/userSlice";
import type { RootState } from "@/redux/store";
import { ProfilePicture } from "@/components/common/ProfilePicture";
import { followUser, unFollowUser } from "@/apiCall/followCall";

const ProfilePage: React.FC = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileData, userData } = useSelector(
    (state: RootState) => state?.user
  );

  const [activeTab, setActiveTab] = useState<
    "posts" | "reels" | "stories" | "replies"
  >("posts");

  const [isFollowing, setIsFollowing] = useState(() => {
    return userData?.following?.some(
      (id) => id.toString() === profileData?._id.toString()
    );
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followersCount, setFollowersCount] = useState(
    profileData?.followers?.length || 0
  );

  async function getProfile() {
    if (!username) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const userResult = await getUserByUsername(username);
      dispatch(setProfileData(userResult));
    } catch (err) {
      console.error(err);
      setError("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [username]);

  useEffect(() => {
    setIsFollowing(
      userData?.following?.some(
        (id) => id.toString() === profileData?._id.toString()
      ) || false
    );
  }, [userData, profileData]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleFollow = async (id: string) => {
    try {
      await followUser(id);
      setIsFollowing(true);
      if (userData) {
        dispatch(
          setUserData({
            ...userData,
            following: [...(userData.following || []), id],
          })
        );
      }
      setFollowersCount(followersCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (id: string) => {
    try {
      await unFollowUser(id);
      setIsFollowing(false);
      if (userData) {
        dispatch(
          setUserData({
            ...userData,
            following:
              userData.following?.filter(
                (followId) => followId.toString() !== id.toString()
              ) || [],
          })
        );
      }
      setFollowersCount(followersCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Loading profile...
      </h3>
      <p className="text-gray-500 text-sm">
        Please wait while we fetch the data
      </p>
    </div>
  );

  const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4">❌</div>
      <h3 className="text-lg font-medium text-red-600 mb-2">
        Error loading profile
      </h3>
      <p className="text-gray-500 text-sm">{message}</p>
      <button
        onClick={getProfile}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const EmptyState: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  }> = ({ icon, title, subtitle }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4 opacity-50">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <ErrorState message={error} />
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 cursor-pointer">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold text-blue-600">chaos</h1>
              <span className="text-blue-600 ml-1">▼</span>
            </div>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Who are we stalking today? 👀"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ProfilePicture
                src={userData?.profilePicture}
                name={userData?.name || "User"}
                size="sm"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              <ProfilePicture
                src={profileData?.profilePicture}
                name={profileData?.name || "Unknown User"}
                size="lg"
                showOnlineIndicator={true}
              />
              <div className="mt-4 sm:mt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {profileData?.name || "Unknown User"}
                </h1>
                <p className="text-gray-600 text-lg">
                  @{profileData?.username || "unknown"}
                </p>
                {profileData?.bio && (
                  <p className="text-gray-700 mt-2 text-base leading-relaxed">
                    {profileData.bio}
                  </p>
                )}
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    Joined{" "}
                    {profileData?.createdAt
                      ? formatDate(profileData.createdAt)
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
            {userData?.username === profileData?.username ? (
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={() => {
                    navigate("/profile/edit");
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all flex items-center"
                >
                  Edit Profile
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={() => {
                    if (isFollowing) {
                      handleUnfollow(profileData._id);
                    } else {
                      handleFollow(profileData._id);
                    }
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                    isFollowing
                      ? "bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {profileData?.posts?.length || 0}
              </div>
              <div className="text-gray-500 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {followersCount}
              </div>
              <div className="text-gray-500 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {profileData?.following?.length}
              </div>
              <div className="text-gray-500 text-sm">Following</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                {
                  key: "posts",
                  label: "Posts",
                  icon: Camera,
                  count: profileData?.posts?.length || 0,
                },
                {
                  key: "reels",
                  label: "Reels",
                  icon: Film,
                  count: profileData?.reels?.length || 0,
                },
                {
                  key: "stories",
                  label: "Stories",
                  icon: Users,
                  count: profileData?.story?.length || 0,
                },
                {
                  key: "replies",
                  label: "Replies",
                  icon: MessageSquare,
                  count: profileData?.replies?.length || 0,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "posts" && (
              <EmptyState
                icon={<Camera className="w-16 h-16" />}
                title="No posts yet"
                subtitle="Share your first post to get started!"
              />
            )}

            {activeTab === "reels" && (
              <EmptyState
                icon={<Film className="w-16 h-16" />}
                title="No reels yet"
                subtitle="Create your first reel to showcase your creativity!"
              />
            )}

            {activeTab === "stories" && (
              <EmptyState
                icon={<Users className="w-16 h-16" />}
                title="No stories yet"
                subtitle="Share moments that disappear in 24 hours!"
              />
            )}

            {activeTab === "replies" && (
              <EmptyState
                icon={<MessageSquare className="w-16 h-16" />}
                title="No replies yet"
                subtitle="Start conversations by replying to posts!"
              />
            )}
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50">
        <Edit3 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProfilePage;

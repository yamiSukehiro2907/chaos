import { Search, MessageCircle, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { ProfilePicture } from "../common/ProfilePicture";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);

  const handleProfileClick = () => {
    if (userData?.username) {
      navigate(`/profile/${userData.username}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center space-x-4"
        >
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            chaos 🌪️
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Who are we stalking today? 👀"
              className="pl-10 bg-blue-50/50 border-blue-200 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 rounded-xl placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-100 rounded-xl transition-all duration-300 group"
            title="Messages"
          >
            <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-pink-100 rounded-xl transition-all duration-300 group"
            title="Likes"
          >
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-pink-500" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
              12
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-yellow-100 rounded-xl transition-all duration-300 group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </Button>

          {/* Profile Avatar */}
          <Button
            variant="ghost"
            className="p-1 rounded-xl hover:bg-blue-100 transition-all duration-300"
            onClick={handleProfileClick}
            title={
              userData?.name
                ? `${userData.name} (@${userData.username})`
                : "Profile"
            }
          >
            <ProfilePicture
              src={userData?.profilePicture}
              name={userData?.name || "User"}
              size="sm"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

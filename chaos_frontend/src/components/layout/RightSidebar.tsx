import { MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePicture } from "../common/ProfilePicture";

const suggestions = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahc_dev",
    avatar: "/placeholder.svg",
    status: "Learning pottery 🏺",
  },
  {
    id: 2,
    name: "Alex Smith",
    username: "alexsmith",
    avatar: "/placeholder.svg",
    status: "Cat enthusiast 🐱",
  },
  {
    id: 3,
    name: "Maya Patel",
    username: "maya_creates",
    avatar: "/placeholder.svg",
    status: "Professional chaos maker",
  },
];

const messages = [
  {
    id: 1,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg",
    message: "Saw you stalking my story 👀",
    time: "2m",
    isOnline: true,
  },
  {
    id: 2,
    name: "David Kim",
    username: "davidk",
    avatar: "/placeholder.svg",
    message: "Thanks for the chaotic energy!",
    time: "5m",
    isOnline: true,
  },
  {
    id: 3,
    name: "Lisa Garcia",
    username: "lisag",
    avatar: "/placeholder.svg",
    message: "Ready for tomorrow's chaos?",
    time: "1h",
    isOnline: false,
  },
];

const RightSidebar = () => {
  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-[400px] bg-gradient-to-b from-gray-50 to-blue-50 border-l border-blue-200 shadow-lg p-6 overflow-y-auto">
      <div className="space-y-8">
        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>🤝</span>
              People you might know
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <ProfilePicture
                    src={user.avatar}
                    name={user.name}
                    size="sm"
                    // @ts-ignore
                    gradientFrom="from-blue-400"
                    gradientTo="to-blue-600"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      @{user.username}
                    </p>
                    <p className="text-xs text-blue-600">{user.status}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-xs shadow-md hover:shadow-lg transition-all px-3 py-1.5"
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2"
            >
              Discover more people
            </Button>
          </CardContent>
        </Card>

        {/* Recent Chats */}
        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span>💬</span>
                Recent Chats
              </CardTitle>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <ProfilePicture
                  src={msg.avatar}
                  name={msg.name}
                  // @ts-ignore
                  size="xs"
                  showOnlineIndicator={msg.isOnline}
                  gradientFrom="from-pink-400"
                  gradientTo="to-pink-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-gray-800">
                      {msg.name}
                    </p>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2"
            >
              View all conversations
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default RightSidebar;

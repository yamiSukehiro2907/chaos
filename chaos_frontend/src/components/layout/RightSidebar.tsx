import { MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gradient-to-b from-gray-50 to-blue-50 border-l border-blue-200 shadow-lg p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Who to Stalk */}
        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>👀</span>
              Who to stalk next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                    <p className="text-xs text-blue-600">{user.status}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-xs shadow-md hover:shadow-lg transition-all"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Stalk
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Find more people to stalk
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
          <CardContent className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.avatar} alt={msg.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-400 to-pink-600 text-white text-xs">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {msg.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
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
              className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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

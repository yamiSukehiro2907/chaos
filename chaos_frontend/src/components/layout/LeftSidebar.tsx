import {Home, Search, Compass, MessageCircle, Heart, PlusSquare, User, Settings, Eye, LogOut} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Card, CardContent} from '@/components/ui/card';
import {useNavigate} from "react-router-dom";

const navigationItems = [
    {icon: Home, label: 'Home Feed', active: true},
    {icon: Eye, label: 'Stalk Mode'},
    {icon: Search, label: 'Find People'},
    {icon: Compass, label: 'Discover Chaos'},
    {icon: MessageCircle, label: 'Chat Away'},
    {icon: Heart, label: 'Notifications'},
    {icon: PlusSquare, label: 'Create Post'},
    {icon: User, label: 'My Profile'},
];

const LeftSidebar = () => {
    const navigate = useNavigate()
    return (
        <aside
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-gray-50 to-blue-50 border-r border-blue-200 shadow-lg p-4 overflow-y-auto">
            <div className="flex flex-col h-full space-y-6">
                {/* Profile Section */}
                <Card className="bg-white/80 backdrop-blur-sm border border-blue-200 shadow-md">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Avatar className="w-12 h-12 ring-2 ring-blue-300 hover:ring-blue-500 transition-all">
                                    <AvatarImage src="/placeholder.svg" alt="Profile"/>
                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">John Doe</p>
                                <p className="text-sm text-gray-600">@johndoe</p>
                                <p className="text-xs text-blue-600">Professional Stalker 👀</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 px-2">Navigate</h3>
                    {navigationItems.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className={`w-full justify-start group transition-all duration-300 ${
                                item.active
                                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium shadow-md hover:shadow-lg"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                        >
                            <item.icon
                                className={`mr-3 h-4 w-4 ${item.active ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`}/>
                            <span className="text-sm">{item.label}</span>
                        </Button>
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-blue-200">
                    <Button
                        variant="ghost"
                        onClick={async (e) => {
                            e.preventDefault()
                            try {
                                navigate("/landing")
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="mr-3 h-4 w-4"/>
                        <span className="text-sm">Log Out</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all mt-1"
                    >
                        <Settings className="mr-3 h-4 w-4"/>
                        <span className="text-sm">Settings</span>
                    </Button>
                    <div className="mt-2 px-2">
                        <p className="text-xs text-gray-500 text-center">
                            Made with ❤️ by chaos lovers
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;
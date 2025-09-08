import {Plus} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'

const stories = [
    {id: 0, name: 'Your story', username: 'you', avatar: '/placeholder.svg', isOwn: true},
    {id: 1, name: 'Sarah Chen', username: 'sarahc_dev', avatar: '/placeholder.svg'},
    {id: 2, name: 'Alex Smith', username: 'alexsmith', avatar: '/placeholder.svg'},
    {id: 3, name: 'Maya Patel', username: 'maya_creates', avatar: '/placeholder.svg'},
    {id: 4, name: 'Emma Wilson', username: 'emmaw', avatar: '/placeholder.svg'},
    {id: 5, name: 'David Kim', username: 'davidk', avatar: '/placeholder.svg'},
]

const Stories = () => {
    return (
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg shadow-lg p-4 mb-6">
            <div className="flex space-x-4 overflow-x-auto pb-2">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center space-y-2 min-w-0">
                        <div className="relative">
                            {story.isOwn ? (
                                <div className="relative">
                                    <Avatar className="w-16 h-16 border-2 border-dashed border-blue-300">
                                        <AvatarImage src={story.avatar} alt={story.name}/>
                                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200">
                                            <Plus className="w-6 h-6 text-blue-600"/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="icon"
                                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
                                    >
                                        <Plus className="w-3 h-3"/>
                                    </Button>
                                </div>
                            ) : (
                                <Avatar
                                    className="w-16 h-16 ring-2 ring-blue-400 ring-offset-2 ring-offset-white cursor-pointer hover:scale-105 hover:ring-blue-500 transition-all duration-300">
                                    <AvatarImage src={story.avatar} alt={story.name}/>
                                    <AvatarFallback
                                        className="bg-gradient-to-br from-blue-200 to-blue-300 text-blue-700 font-semibold">
                                        {story.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        <p className="text-xs text-center max-w-[4rem] truncate font-medium text-gray-700">
                            {story.isOwn ? 'Your story' : story.name.split(' ')[0]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stories
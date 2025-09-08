import {Heart, MessageCircle, Share, Bookmark, MoreHorizontal} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {useState} from 'react'

const posts = [
    {
        id: 1,
        user: {name: 'Sarah Chen', username: 'sarahc_dev', avatar: '/placeholder.svg'},
        content: 'Just shipped a new feature! Working with React and TypeScript has been such a joy. The developer experience keeps getting better 🚀',
        image: null,
        likes: 42,
        comments: 8,
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        user: {name: 'Alex Smith', username: 'alexsmith', avatar: '/placeholder.svg'},
        content: 'Beautiful sunset from my weekend hike. Sometimes you need to disconnect to reconnect 🌅',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        likes: 127,
        comments: 23,
        timestamp: '4 hours ago'
    },
    {
        id: 3,
        user: {name: 'Maya Patel', username: 'maya_creates', avatar: '/placeholder.svg'},
        content: 'Excited to share my latest design project! Clean, minimal, and user-focused. What do you think? 🎨',
        image: null,
        likes: 89,
        comments: 15,
        timestamp: '6 hours ago'
    }
]

const Feed = () => {
    const [likedPosts, setLikedPosts] = useState({})
    const [bookmarkedPosts, setBookmarkedPosts] = useState({})
    const [notification, setNotification] = useState('')

    const showNotification = (message: string) => {
        setNotification(message)
        setTimeout(() => setNotification(''), 3000)
    }

    const handleLike = (postId: number) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId as keyof typeof prev]
        }))
        showNotification('Post liked! ❤️')
    }

    const handleComment = () => {
        showNotification('Comment feature coming soon! 💬')
    }

    const handleShare = () => {
        showNotification('Post shared! 🔗')
    }

    const handleBookmark = (postId: number) => {
        setBookmarkedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId as keyof typeof prev]
        }))
        showNotification('Post bookmarked! 🔖')
    }

    return (
        <div className="space-y-6">
            {/* Notification Toast */}
            {notification && (
                <div
                    className="fixed top-20 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                    {notification}
                </div>
            )}

            {posts.map((post) => (
                <Card key={post.id}
                      className="bg-white/80 backdrop-blur-sm border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Post Header */}
                    <div className="flex items-center justify-between p-4 pb-3">
                        <div className="flex items-center space-x-3">
                            <Avatar className="ring-2 ring-blue-300 hover:ring-blue-400 transition-all">
                                <AvatarImage src={post.user.avatar} alt={post.user.name}/>
                                <AvatarFallback
                                    className="bg-gradient-to-br from-blue-200 to-blue-300 text-blue-700 font-semibold">
                                    {post.user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-gray-800">{post.user.name}</p>
                                <p className="text-sm text-gray-600">@{post.user.username} • {post.timestamp}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon"
                                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                            <MoreHorizontal className="w-5 h-5"/>
                        </Button>
                    </div>

                    <CardContent className="pt-0">
                        {/* Post Content */}
                        <p className="mb-3 leading-relaxed text-gray-800">{post.content}</p>

                        {/* Post Image */}
                        {post.image && (
                            <div className="mb-4 rounded-lg overflow-hidden border border-blue-200">
                                <img
                                    src={post.image}
                                    alt="Post content"
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                            <div className="flex items-center space-x-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLike(post.id)}
                                    className={`transition-colors ${
                                        likedPosts[post.id as keyof typeof likedPosts]
                                            ? 'text-red-500 hover:text-red-600'
                                            : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                                    }`}
                                >
                                    <Heart
                                        className={`w-5 h-5 mr-2 ${likedPosts[post.id as keyof typeof likedPosts] ? 'fill-current' : ''}`}/>
                                    {post.likes + (likedPosts[post.id as keyof typeof likedPosts] ? 1 : 0)}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleComment()}
                                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2"/>
                                    {post.comments}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleShare()}
                                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    <Share className="w-5 h-5"/>
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleBookmark(post.id)}
                                className={`transition-colors ${
                                    bookmarkedPosts[post.id as keyof typeof bookmarkedPosts]
                                        ? 'text-blue-600 hover:text-blue-700'
                                        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                <Bookmark
                                    className={`w-5 h-5 ${bookmarkedPosts[post.id as keyof typeof bookmarkedPosts] ? 'fill-current' : ''}`}/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Feed
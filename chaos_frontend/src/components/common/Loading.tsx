import {Loader2} from 'lucide-react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div
                className="flex flex-col items-center p-8 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md border border-blue-200 transform transition-all duration-500 hover:scale-105">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-xl animate-ping"></div>
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin"/>
                </div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-800 tracking-wider">
                    Loading Chaos...
                </h2>
                <p className="font-sans text-sm sm:text-base text-gray-600 mt-2">
                    Please hold on while we find your friends.
                </p>
            </div>
        </div>
    );
};

export default Loading;

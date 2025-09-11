import {
  ArrowRight,
  MessageCircle,
  Heart,
  Eye,
  Coffee,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

interface Feature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  emoji: string;
}

const features: Feature[] = [
  {
    icon: Eye,
    title: "Friendly Stalking",
    description: "Keep tabs on your friends in the most wholesome way possible",
    emoji: "👀",
  },
  {
    icon: Coffee,
    title: "Casual Vibes",
    description: "No pressure, just good vibes and genuine connections",
    emoji: "☕",
  },
  {
    icon: Sparkles,
    title: "Fun Discoveries",
    description: "Find out what your friends are really up to (with consent!)",
    emoji: "✨",
  },
  {
    icon: MessageCircle,
    title: "Real Talk",
    description: "Finally, conversations that actually matter",
    emoji: "💬",
  },
];

const funReasons = [
  "Wanna know what your crush had for breakfast?",
  "Curious about your ex's new hobbies?",
  "Need to find out who's been ghosting the group chat?",
  "Ready to discover your friends' secret talents?",
];

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-200 relative overflow-hidden">
      {/* Fun floating elements */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>

      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-200 shadow-lg relative z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            chaos 🌪️
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/login")}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              I'm already chaotic ✨
            </Button>
            <Button
              onClick={() => handleNavigation("/signup")}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Let's get messy 🎭
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 shadow-lg flex items-center justify-center animate-bounce">
              <span className="text-4xl">👀</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
            Wanna stalk someone?{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg">
              Let's start with Chaos!
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Have someone in mind you wanna know about? Let's search for them
            together! It's like social media but actually fun and not
            soul-crushingly corporate.
          </p>

          {/* Fun reasons carousel */}
          <div className="mb-8 p-4 bg-white/80 rounded-xl shadow-lg max-w-xl mx-auto">
            <div className="text-lg text-gray-700 italic animate-pulse">
              "{funReasons[Math.floor(Date.now() / 3000) % funReasons.length]}"
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleNavigation("/signup")}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              I'm ready to be nosy 🕵️‍♀️
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
            >
              Tell me more 🤔
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Why Chaos is Actually Fun
            </h2>
            <p className="text-gray-700 text-lg">
              Unlike those other platforms that make you feel bad about
              yourself...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              return (
                <Card
                  key={feature.title}
                  className="bg-white/90 backdrop-blur-sm shadow-lg border border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 group cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:animate-spin">
                      {feature.emoji}
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fun Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            The Chaos Report 📊
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                420+
              </div>
              <p className="text-gray-700">Friendly stalkers online</p>
              <span className="text-2xl">👥</span>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                69K+
              </div>
              <p className="text-gray-700">Conversations that didn't suck</p>
              <span className="text-2xl">💬</span>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                ∞
              </div>
              <p className="text-gray-700">Amount of fun you'll have</p>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            What People Are Saying
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-100 to-blue-100 border-0">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 italic">
                  "Finally found out what my neighbor's cat is up to. 10/10
                  would stalk again."
                </p>
                <p className="text-sm text-gray-600">
                  - Anonymous Cat Enthusiast 🐱
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-100 to-green-100 border-0">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 italic">
                  "My ex is learning pottery now. Good for them! This app makes
                  stalking wholesome."
                </p>
                <p className="text-sm text-gray-600">
                  - Reformed Ex-Stalker 🏺
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-3xl"></div>
            <CardContent className="p-12 text-center relative z-10">
              <div className="text-6xl mb-6 animate-bounce">🎭</div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join the Beautiful Chaos?
              </h2>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Life's too short for boring social media. Come be weird with us!
                Your friends are probably doing something interesting right
                now...
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleNavigation("/signup")}
                className="bg-white text-blue-600 hover:bg-gray-50 transition-all duration-300 text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Let's get chaotic! 🌪️
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white/80 backdrop-blur-sm py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
              chaos 🌪️
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Making social media fun again, one wholesome stalk at a time.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-500">
                © 2024 Chaos (we're still figuring it out)
              </span>
              <Button
                variant="link"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy (we promise we're cool)
              </Button>
              <Button
                variant="link"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms (but fun)
              </Button>
              <Button
                variant="link"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Help (we got you)
              </Button>
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              Made with{" "}
              <Heart className="w-3 h-3 text-red-500 mx-1 animate-pulse" /> by
              people who get it
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

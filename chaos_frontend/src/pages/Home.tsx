import Navbar from "@/components/layout/Navbar.tsx";
import LeftSidebar from "@/components/layout/LeftSidebar.tsx";
import RightSidebar from "@/components/layout/RightSidebar.tsx";
import Stories from "@/components/home/Stories.tsx";
import Feed from "@/components/home/Feed.tsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <LeftSidebar />
        <main className="flex-1 ml-64 mr-[400px] p-6">
          <div className="w-full max-w-none">
            <Stories />
            <Feed />
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import Home from "@/pages/Home.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import EditProfilePage from "@/pages/EditProfilePage.tsx";
import Landing from "./pages/Landing.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { useCurrentUser } from "./hooks/getCurrentUser.ts";
import type { RootState } from "./redux/store.ts";
import CreatePost from "./pages/CreatePost.tsx";
import { useGetAllPosts } from "./hooks/getAllPosts.ts";

const App = () => {
  useCurrentUser();
  useGetAllPosts();
  const { userData } = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={!userData ? <Landing /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!userData ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
};

export default App;

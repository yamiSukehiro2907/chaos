import { Routes, Route } from "react-router-dom";
import Landing from "../src/pages/Landing.tsx";
import Home from "../src/pages/Home.tsx";
import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "./hooks/getCurrentUser.ts";
import { useSelector } from "react-redux";

const App = () => {
  useCurrentUser();

  // @ts-ignore
  const { userData } = useSelector((state) => state?.user);

  return (
    <Routes>
      <Route
        path="/"
        element={!userData ? <Landing /> : <Navigate to={"/home"} />}
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;

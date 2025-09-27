import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../apiCall/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slices/userSlice";
import { fetchCurrentUser } from "@/apiCall/userCall";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      return;
    }

    try {
      let r2 = await signIn({
        username: loginData.username,
        password: loginData.password,
      });
      console.log(r2)
      const response = await fetchCurrentUser();
      console.log(response)
      dispatch(setUserData(response));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }

    setLoginData({
      username: "",
      password: "",
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="relative w-[850px] h-[550px] bg-white mx-5 rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-20 opacity-100 pointer-events-auto">
          <div className="w-full">
            <h1 className="text-4xl font-medium -mt-2 mb-4">Login</h1>

            <form onSubmit={handleLoginFormSubmit}>
              <div className="relative my-8">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
                  value={loginData.username}
                  onChange={handleLoginInputChange}
                />
                <User className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              </div>

              <div className="relative my-8">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
                />
                <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              </div>

              <div className="-mt-4 mb-4">
                <a href="#" className="text-sm text-gray-800">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-400 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none cursor-pointer text-base text-white font-semibold hover:bg-blue-500 transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-sm my-4">or login with social platforms</p>

            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="inline-flex p-2 border-2 border-gray-300 rounded-lg text-2xl text-gray-800 hover:border-blue-400 transition-colors group"
              >
                <FaGoogle className="w-6 h-6 group-hover:text-red-500 transition-colors" />
              </a>
              <a
                href="#"
                className="inline-flex p-2 border-2 border-gray-300 rounded-lg text-2xl text-gray-800 hover:border-blue-400 transition-colors group"
              >
                <FaGithub className="w-6 h-6 group-hover:text-gray-900 transition-colors" />
              </a>
              <a
                href="#"
                className="inline-flex p-2 border-2 border-gray-300 rounded-lg text-2xl text-gray-800 hover:border-blue-400 transition-colors group"
              >
                <FaLinkedin className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full pointer-events-none">
          <div className="absolute w-[300%] h-full bg-blue-400 rounded-[150px] z-5 -left-[250%] transition-all duration-[1800ms] ease-in-out"></div>
        </div>

        <div className="absolute left-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-15 opacity-100 transition-all duration-[600ms] ease-in-out">
          <div>
            <h1 className="text-4xl font-medium mb-4">Hello, Welcome!</h1>
            <p className="text-sm mb-5">Don't have an account?</p>
            <button
              onClick={handleRegisterClick}
              className="w-40 h-12 bg-transparent border-2 border-white rounded-lg cursor-pointer text-base text-white font-semibold hover:bg-white hover:text-blue-400 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

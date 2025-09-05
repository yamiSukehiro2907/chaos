import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";

const Auth: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="relative w-[850px] h-[550px] bg-white mx-5 rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Login Form */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 transition-all duration-[600ms] ease-in-out ${
            isActive 
              ? "left-0 z-10 opacity-0 pointer-events-none" 
              : "left-1/2 z-20 opacity-100 pointer-events-auto delay-[600ms]"
          }`}
        >
          <div className="w-full">
            <h1 className="text-4xl font-medium -mt-2 mb-4">Login</h1>

            <div className="relative my-8">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
              />
              <User className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>

            <div className="relative my-8">
              <input
                type="password"
                placeholder="Password"
                required
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
              onClick={handleFormSubmit}
              className="w-full h-12 bg-blue-400 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none cursor-pointer text-base text-white font-semibold hover:bg-blue-500 transition-colors"
            >
              Login
            </button>

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

        {/* Registration Form */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 transition-all duration-[600ms] ease-in-out ${
            isActive 
              ? "left 1/2 z-20 opacity-100 pointer-events-auto delay-[600ms]" 
              : "left-full z-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full">
            <h1 className="text-4xl font-medium -mt-2 mb-4">Registration</h1>

            <div className="relative my-8">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
              />
              <User className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>

            <div className="relative my-8">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
              />
              <Mail className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>

            <div className="relative my-8">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full py-3 pl-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium placeholder-gray-500"
              />
              <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>

            <button
              type="submit"
              onClick={handleRegisterSubmit}
              className="w-full h-12 bg-blue-400 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none cursor-pointer text-base text-white font-semibold hover:bg-blue-500 transition-colors"
            >
              Register
            </button>

            <p className="text-sm my-4">or register with social platforms</p>

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
                className="inline-flex p-2 border-2 border-2 border-gray-300 rounded-lg text-2xl text-gray-800 hover:border-blue-400 transition-colors group"
              >
                <FaLinkedin className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Sliding Background */}
        <div className="absolute w-full h-full pointer-events-none">
          <div
            className={`absolute w-[300%] h-full bg-blue-400 rounded-[150px] z-5 transition-all duration-[1800ms] ease-in-out ${
              isActive ? "left-1/2" : "-left-[250%]"
            }`}
          ></div>
        </div>

        {/* Welcome Panel - Left */}
        <div
          className={`absolute w-1/2 h-full text-white flex flex-col justify-center items-center z-15 transition-all duration-[600ms] ease-in-out ${
            isActive 
              ? "left-[-50%] opacity-0 delay-[0ms]" 
              : "left-0 opacity-100 delay-[600ms]"
          }`}
        >
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

        {/* Welcome Panel - Right */}
        <div
          className={`absolute w-1/2 h-full text-white flex flex-col justify-center items-center z-10 transition-all duration-[600ms] ease-in-out ${
            isActive 
              ? "right-0 opacity-100 delay-[600ms]" 
              : "right-[-50%] opacity-0 delay-[0ms]"
          }`}
        >
          <div>
            <h1 className="text-4xl font-medium mb-4">Welcome Back!</h1>
            <p className="text-sm mb-5">Already have an account?</p>
            <button
              onClick={handleLoginClick}
              className="w-40 h-12 bg-transparent border-2 border-white rounded-lg cursor-pointer text-base text-white font-semibold hover:bg-white hover:text-blue-400 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
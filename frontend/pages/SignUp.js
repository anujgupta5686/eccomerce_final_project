import React, { useState } from "react";
// import loginIcons from "../assets/signin.gif";
import loginIcons from "../assest/authicons1.gif";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section
      id="signup"
      className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto animate-fadeIn">
          <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-cyan-500 mb-4">
            <img
              src={data.profilePic || loginIcons}
              alt="Profile"
              className="object-none w-full h-full"
            />
            <label className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
              Upload Photo
            </label>
          </div>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Password:
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <div
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password:
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <div
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full mt-6 transition-transform transform hover:scale-105">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

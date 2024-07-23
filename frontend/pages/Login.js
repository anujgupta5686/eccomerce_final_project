import React, { useContext, useState } from "react";
import loginIcons from "../assest/authicons1.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section
      id="login"
      className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto animate-fadeIn">
          <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-cyan-500 mb-4">
            <img
              src={loginIcons}
              alt="Login Icons"
              className="object-none w-full h-full"
            />
          </div>

          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
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
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-cyan-500"
              >
                Forgot password?
              </Link>
            </div>

            <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full mt-6 transition-transform transform hover:scale-105">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

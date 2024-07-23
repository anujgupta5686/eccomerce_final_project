import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const dataResponse = await fetch(SummaryApi.reset_password.url, {
        method: SummaryApi.reset_password.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, token }),
      });
      const responseData = await dataResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error during password update request:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false once the API call is complete
    }
    console.log({ ...formData, token }); // Log form data and token
  };

  return (
    <section
      id="update-password"
      className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto animate-fadeIn">
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full mt-6 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;

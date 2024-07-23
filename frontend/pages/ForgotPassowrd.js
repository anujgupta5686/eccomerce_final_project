import React, { useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const dataResponse = await fetch(SummaryApi.reset_password_token.url, {
        method: SummaryApi.reset_password_token.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Pass email as an object
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success("Reset password link has been sent to your email.");
      } else {
        toast.error(dataApi.message);
      }
      setEmail("");
    } catch (error) {
      console.error("Error during password reset request:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false once the API call is complete
    }
  };

  return (
    <section
      id="forgot-password"
      className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto animate-fadeIn">
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full mt-6 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            If you remember your password,{" "}
            <Link
              to={"/login"}
              className="text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              click here to Login
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { signup, verifyCode, login } from "../services/auth.js";
import { FaFacebook } from "react-icons/fa";


const SignUpModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (view === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match. Please try again.");
          return;
        }
        await signup({ username, email, password, confirmPassword });
        setView("verify");
        setPassword("");
        setConfirmPassword("");
        setSuccess("A verification code has been sent to your email.");
      } else if (view === "verify") {
        const response = await verifyCode({ email, verificationCode });
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", username);
        setSuccess("Verification successful!");
        setTimeout(() => {
          onClose();
          onLoginSuccess(username || email.split("@")[0]);
        }, 2000);
      } else if (view === "login") {
        const data = await login({ email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name || email.split("@")[0]);
        setEmail("");
        setPassword("");
        onClose();
        onLoginSuccess(data.name || email.split("@")[0]);
      }
    } catch (err) {
      setError(err.message || `An error occurred during ${view}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="authModalTitle"
    >
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative transform transition-transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2
          id="authModalTitle"
          className="text-2xl font-semibold text-gray-800 mb-6 text-center"
        >
          {view === "login"
            ? "Welcome Back"
            : view === "signup"
            ? "Create Your Account"
            : "Verify Email"}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {(view === "signup" || view === "verify" || view === "login") && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          )}

          {view === "signup" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          )}

          {(view === "signup" || view === "login") && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          )}

          {view === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          )}

          {view === "verify" && (
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : view === "signup"
              ? "Sign Up"
              : view === "verify"
              ? "Verify Code"
              : "Log In"}
          </button>
        </form>

        {view === "login" && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:shadow-md transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2 cursor-pointer"
                />
                <span className="text-sm text-gray-700 cursor-pointer">
                  Sign in with Google
                </span>
              </button>
              <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:shadow-md transition">
                <FaFacebook className="w-5 h-5 cursor-pointer" />

                <span className="text-sm text-gray-700 ml-2 cursor-pointer">
                  Sign in with Facebook
                </span>
              </button>
            </div>
          </>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          {view === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setView("signup")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setView("login")}
                className="text-blue-600 hover:underline"
              >
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>,
    document.body
  );
};

export default SignUpModal;

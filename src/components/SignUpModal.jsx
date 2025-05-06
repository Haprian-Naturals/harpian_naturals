import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { signup, verifyCode, login } from "../services/auth.js";

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
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true); // Set loading to true when submission starts

    if (view === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        setLoading(false);
        return;
      }
      const userData = { username, email, password, confirmPassword };
      try {
        await signup(userData);
        // localStorage.setItem("token", response.token);
        setView("verify");
        setPassword("");
        setConfirmPassword("");
        setSuccess("A verification code has been sent to your email.");
        
      } catch (err) {
        setError(err.message || "Signup failed. Email may already be in use.");
      } finally {
        setLoading(false); // Reset loading state
      }
    } else if (view === "verify") {
      const verificationData = { email, verificationCode };
      try {
        const response = await verifyCode(verificationData);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", username);
        setSuccess("Verification successful!");
        setTimeout(() => {
          onClose();
          onLoginSuccess(username || email.split("@")[0]);
        }, 2000);
      } catch (err) {
        setError(err.message || "Verification failed. Please try again.");
      } finally {
        setLoading(false); // Reset loading state
      }
    } else if (view === "login") {
      const credentials = { email, password };
      try {
        const data = await login(credentials);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name || email.split("@")[0]);
        setEmail("");
        setPassword("");
        onClose();
        onLoginSuccess(data.name || email.split("@")[0]);
      } catch (err) {
        setError(err.message || "Login failed. Please check your credentials.");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="authModalTitle"
    >
      <div
        className={`bg-white w-full max-w-md p-4 rounded-lg shadow-lg mr-4 max-h-[500px] overflow-y-auto relative transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#333333] hover:text-[#8CC63F]"
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

        <div>
          {view === "login" && (
            <>
              <h2
                id="authModalTitle"
                className="text-xl font-bold mb-4 text-[#333333]"
              >
                Log In to Your Account
              </h2>
              {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-[#666666] hover:text-[#8CC63F]"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-end mb-3">
                  <a
                    href="#"
                    className="text-sm text-[#666666] hover:text-[#4A6BFF]"
                  >
                    Forgotten your password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "LOG IN"
                  )}
                </button>
                
                <div className="flex items-center mb-3">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-sm text-[#666666]">OR</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <button className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] flex items-center justify-center space-x-2 transition">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.78 4.95 2.05L14.34 8.66C13.61 7.93 12.85 7.5 12 7.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.85 0 1.61-.43 2.34-1.16l2.61 2.61C15.68 19.22 13.93 20 12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8zm6.5 6h-4v1.5h2.5v3h1.5v-3h2.5V10h-2.5z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
                <button className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] flex items-center justify-center space-x-2 transition">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.77 7.46H14.5v-1.9c0-.21-.15-.46-.5-.46h-4c-.36 0-.5.25-.5.46v1.9H6.23c-.4 0-.73.34-.73.73v9.1c0 .4.33.73.73.73h12.54c.4 0 .73-.33.73-.73V8.19c0-.39-.34-.73-.73-.73zm-12.54 9.19v-7.9h2.62v7.9h-2.62zm4.5 0v-7.9h2.64v7.9h-2.64zm7.91 0v-7.9H18v7.9h-2.63z" />
                    <path d="M6.5 5.34c0-.25.2-.45.5-.45h8c.3 0 .5.2.5.45v.82h-9V5.34z" />
                  </svg>
                  <span>Sign in with Facebook</span>
                </button>
                <button className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] flex items-center justify-center space-x-2 transition">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.77-.79-3.29-.79-1.53 0-2.03.77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 3 14.66 3 12.14c0-3.99 2.52-6.12 5-6.12 1.29 0 2.37.63 3.19.83.78.19 1.5-.38 2.81-.38.99 0 2.07.38 2.81 1.41-1.09.66-1.87 1.62-1.87 2.94 0 1.62.94 2.96 2.31 3.29-.29.84-.94 1.71-1.55 2.47zM12 5.5c0-1.66-.94-3.08-2.31-3.81-.75-.37-1.69-.56-2.69-.56C7 1.63 8.25 2.5 9 3.19c.75.69 1.31 1.56 1.31 2.81 0 .31-.03.62-.09.94.94-.06 1.81-.25 2.69-.56.81-.29 1.44-.81 1.44-1.88z" />
                  </svg>
                  <span>Sign in with Apple</span>
                </button>
                <p className="text-sm text-[#666666] mb-3">
                  <span className="text-[#8CC63F]">
                    Step into a hair & beauty experience as unique as you are
                  </span>{" "}
                  with VIP perks, monthly giveaways, freebies, and news about
                  our products.
                </p>
                <p className="text-sm text-[#666666]">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setView("signup")}
                    className="text-[#003087] font-semibold hover:text-[#4A6BFF]"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </>
          )}
          {view === "signup" && (
            <>
              <h2
                id="authModalTitle"
                className="text-xl font-bold mb-4 text-[#333333]"
              >
                Create Your Account
              </h2>
              {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-[#666666] hover:text-[#8CC63F]"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c-4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-[#666666] hover:text-[#8CC63F]"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c-4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-sm text-[#666666] mb-3">
                  By creating an account, I agree to the{" "}
                  <a href="#" className="text-[#003087] hover:text-[#4A6BFF]">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#003087] hover:text-[#4A6BFF]">
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "SIGN UP"
                  )}
                </button>
                <p className="text-sm text-[#666666]">
                  Already have an account?{" "}
                  <button
                    onClick={() => setView("login")}
                    className="text-[#003087] font-semibold hover:text-[#4A6BFF]"
                  >
                    Log In
                  </button>
                </p>
              </form>
            </>
          )}
          {view === "verify" && (
            <>
              <h2
                id="authModalTitle"
                className="text-xl font-bold mb-4 text-[#333333]"
              >
                Verify Your Email
              </h2>
              <p className="text-sm text-[#666666] mb-4">
                A verification code has been sent to {email}. Please enter it
                below.
              </p>
              {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
              {success && (
                <p className="text-green-600 mb-4 text-sm">{success}</p>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[#333333] cursor-not-allowed mb-2"
                />
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "VERIFY"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default SignUpModal;

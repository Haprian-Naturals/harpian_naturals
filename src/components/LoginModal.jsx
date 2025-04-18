import React, { useState, useEffect } from "react";

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted! (This is a placeholder action)");
    console.log({ email, password });
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-md z-50 flex justify-end"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#333333] hover:text-[#8CC63F]"
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

        <div className="mt-12">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
            required
          />
          <div className="flex justify-end mb-4">
            <a href="#" className="text-sm text-[#666666] hover:text-[#4A6BFF]">
              Forgotten your password?
            </a>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-4 hover:bg-[#4A6BFF] transition"
          >
            LOG IN
          </button>

          <button className="w-full bg-[#8CC63F] text-white text-sm font-semibold py-2 mb-4 hover:bg-[#6B9A30] flex items-center justify-center space-x-2 transition">
            <span>Sign in with</span>
            <span className="font-bold">Shopify</span>
          </button>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-[#666666]">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-4 hover:bg-[#4A6BFF] flex items-center justify-center space-x-2 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.78 4.95 2.05L14.34 8.66C13.61 7.93 12.85 7.5 12 7.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.85 0 1.61-.43 2.34-1.16l2.61 2.61C15.68 19.22 13.93 20 12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8zm6.5 6h-4v1.5h2.5v3h1.5v-3h2.5V10h-2.5z" />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <button className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-4 hover:bg-[#4A6BFF] flex items-center justify-center space-x-2 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.77-.79-3.29-.79-1.53 0-2.03.77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 3 14.66 3 12.14c0-3.99 2.52-6.12 5-6.12 1.29 0 2.37.63 3.19.83.78.19 1.5-.38 2.81-.38.99 0 2.07.38 2.81 1.41-1.09.66-1.87 1.62-1.87 2.94 0 1.62.94 2.96 2.31 3.29-.29.84-.94 1.71-1.55 2.47zM12 5.5c0-1.66-.94-3.08-2.31-3.81-.75-.37-1.69-.56-2.69-.56C7 1.63 8.25 2.5 9 3.19c.75.69 1.31 1.56 1.31 2.81 0 .31-.03.62-.09.94.94-.06 1.81-.25 2.69-.56.81-.29 1.44-.81 1.44-1.88z" />
            </svg>
            <span>Sign in with Apple</span>
          </button>

          <p className="text-sm text-[#666666] mb-4">
            <span className="text-[#8CC63F]">
              Step into a hair & beauty experience as unique as you are
            </span>{" "}
            with VIP perks, monthly giveaways, freebies, and news about our
            products.
          </p>

          <p className="text-sm text-[#666666]">
            Don’t have an account?{" "}
            <button
              onClick={onSwitchToSignUp}
              className="text-[#003087] font-semibold hover:text-[#4A6BFF]"
            >
              SIGN UP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

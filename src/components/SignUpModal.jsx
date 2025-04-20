import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [joinLoyalty, setJoinLoyalty] = useState(false);

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
    alert("Sign Up submitted! (This is a placeholder action)");
    console.log({
      firstName,
      lastName,
      email,
      phone,
      dob,
      password,
      joinLoyalty,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDob("");
    setPassword("");
    setJoinLoyalty(false);
    onClose();
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
      aria-labelledby="signUpModalTitle"
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
          <h2
            id="signUpModalTitle"
            className="text-xl font-bold mb-4 text-[#333333]"
          >
            Create your account
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
              />
              <span className="absolute right-3 top-2 text-[#666666] text-sm">
                OPTIONAL
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-sm text-[#333333] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#003087] mb-2"
              />
              <span className="absolute right-3 top-2 text-[#666666] text-sm">
                OPTIONAL
              </span>
            </div>
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

            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={joinLoyalty}
                onChange={(e) => setJoinLoyalty(e.target.checked)}
                className="mr-2 accent-[#003087]"
              />
              <span className="text-sm text-[#666666]">
                Join the Loyalty Program & subscribe to the newsletter and
                updates
              </span>
            </label>

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
              onClick={handleSubmit}
              className="w-full bg-[#003087] text-white text-sm font-semibold py-2 mb-3 hover:bg-[#4A6BFF] transition"
            >
              SIGN UP
            </button>

            <p className="text-sm text-[#666666]">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-[#003087] font-semibold hover:text-[#4A6BFF]"
              >
                Log In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default SignUpModal;
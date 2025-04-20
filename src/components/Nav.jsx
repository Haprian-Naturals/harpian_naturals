import React, { useState } from "react";
import { User, Heart, ShoppingBag } from "lucide-react";
import Logo from "./HaprianLogo";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSwitchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className="w-full bg-white/70 backdrop-blur-md shadow-md p-3 px-4 md:px-8 fixed top-0 left-0 z-50"
        style={{ "--navbar-height": "5rem" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section: Hamburger and Logo */}
          <div className="flex items-center">
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-[#333333] hover:text-[#8CC63F] mr-3 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6 transition-transform duration-200 hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start">
              <a href="/" className="mt-2">
                <Logo />
              </a>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#8CC63F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#8CC63F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`
              }
            >
              SHOP
            </NavLink>
            <NavLink
              to="/sale"
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#8CC63F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`
              }
            >
              SALE
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#8CC63F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`
              }
            >
              CONTACT
            </NavLink>
          </div>

          {/* Right Section: Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[#333333] hover:text-[#8CC63F] cursor-pointer"
            >
              <User size={20} />
            </button>
            <a
              href="/wishlist"
              className="text-[#333333] hover:text-[#8CC63F] relative"
            >
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#F5F5F5] text-[#333333] text-xs rounded-full w-3 h-3 flex items-center justify-center">
                1
              </span>
            </a>
            <a
              href="/cart"
              className="text-[#333333] hover:text-[#8CC63F] relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-[#F5F5F5] text-[#333333] text-xs rounded-full w-3 h-3 flex items-center justify-center">
                0
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu (Mobile) */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-full bg-white shadow-xl p-4 z-[100] transform transition-transform duration-300 flex flex-col opacity-100 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="text-[#333333] hover:text-[#8CC63F] transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200 hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <a
            href="/"
            className={`font-medium text-xl ${
              activeLink === "home"
                ? "text-[#8CC63F]"
                : "text-[#333333] hover:text-[#4A6BFF]"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            HOME
          </a>
          <div className="relative">
            <a
              href="/shop"
              className={`font-medium text-xl flex items-center ${
                activeLink === "shop"
                  ? "text-[#8CC63F]"
                  : "text-[#333333] hover:text-[#4A6BFF]"
              }`}
              onClick={() => handleLinkClick("shop")}
            >
              SHOP
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <div className="mt-2 space-y-2">
              <a
                href="/shop/category1"
                className={`block text-lg ${
                  activeLink === "category1"
                    ? "text-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`}
                onClick={() => handleLinkClick("category1")}
              >
                Category 1
              </a>
              <a
                href="/shop/category2"
                className={`block text-lg ${
                  activeLink === "category2"
                    ? "text-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`}
                onClick={() => handleLinkClick("category2")}
              >
                Category 2
              </a>
            </div>
          </div>
          <a
            href="/sale"
            className={`font-medium text-xl ${
              activeLink === "sale"
                ? "text-[#8CC63F]"
                : "text-[#333333] hover:text-[#4A6BFF]"
            }`}
            onClick={() => handleLinkClick("sale")}
          >
            SALE
          </a>
          <a
            href="/contact"
            className={`font-medium text-xl ${
              activeLink === "contact"
                ? "text-[#8CC63F]"
                : "text-[#333333] hover:text-[#4A6BFF]"
            }`}
            onClick={() => handleLinkClick("contact")}
          >
            CONTACT
          </a>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;

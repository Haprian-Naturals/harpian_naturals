import React, { useState } from "react";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";
import Logo from "./HaprianLogo";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Track the active link

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
    setIsMenuOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="w-full bg-white shadow-sm p-3 px-4 md:px-8 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Hamburger, Search, and Logo */}
        <div className="flex items-center">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#333333] hover:text-[#8CC63F] mr-3"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a
              href="/search"
              className="text-[#333333] hover:text-[#8CC63F] mr-3"
            >
              <Search size={20} />
            </a>
          </div>
          <div className="flex-1 flex justify-center md:flex-none md:justify-start">
            <a href="/" className="mt-2">
              <Logo />
            </a>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className={`font-medium ${
              activeLink === "home"
                ? "text-[#8CC63F]"
                : "text-[#333333] hover:text-[#4A6BFF]"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            HOME
          </a>
          <div className="relative group">
            <a
              href="/shop"
              className={`font-medium ${
                activeLink === "shop"
                  ? "text-[#8CC63F]"
                  : "text-[#333333] hover:text-[#4A6BFF]"
              }`}
              onClick={() => handleLinkClick("shop")}
            >
              SHOP
            </a>
          </div>
          <a
            href="/sale"
            className={`font-medium ${
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
            className={`font-medium ${
              activeLink === "contact"
                ? "text-[#8CC63F]"
                : "text-[#333333] hover:text-[#4A6BFF]"
            }`}
            onClick={() => handleLinkClick("contact")}
          >
            CONTACT
          </a>
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

      {/* Hamburger Menu (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-4 z-50">
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-[#333333] hover:text-[#8CC63F]"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <a
              href="/"
              className={`block font-medium ${
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
                className={`font-medium flex items-center ${
                  activeLink === "shop"
                    ? "text-[#8CC63F]"
                    : "text-[#333333] hover:text-[#4A6BFF]"
                }`}
                onClick={() => handleLinkClick("shop")}
              >
                SHOP
                <svg
                  className="w-4 h-4 ml-1"
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
              <div className="ml-4 mt-2 space-y-2">
                <a
                  href="/shop/category1"
                  className={`block ${
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
                  className={`block ${
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
              className={`block font-medium ${
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
              className={`block font-medium ${
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
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  );
};

export default Navbar;

import React, { useState, useContext } from "react";
import { User, Heart, ShoppingBag } from "lucide-react";
import Logo from "./HaprianLogo";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { totalItems } = useContext(CartContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

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
        className="w-full bg-white/80 backdrop-blur-md shadow-lg p-3 px-4 md:px-8 fixed top-0 left-0 z-50 border-b border-[#E0E0E0]"
        style={{ "--navbar-height": "4rem" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

          <div className="hidden md:flex items-center space-x-6">
            {["/", "/shop", "/sale", "/contact"].map((path, idx) => {
              const labels = ["HOME", "SHOP", "SALE", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative font-[500] text-sm tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-[#8CC63F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#8CC63F]"
                        : "text-[#333333] hover:text-[#8CC63F]"
                    }`
                  }
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[#333333] hover:text-[#8CC63F] cursor-pointer"
            >
              <User size={20} />
            </button>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `p-2 rounded-full relative hover:bg-[#F0F0F0] transition ${
                  isActive ? "text-[#8CC63F]" : "text-[#333333]"
                }`
              }
            >
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#8CC63F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                1
              </span>
            </NavLink>
            <button
              onClick={toggleCartModal}
              className="p-2 rounded-full relative hover:bg-[#F0F0F0] transition cursor-pointer"
            >
              <ShoppingBag size={20} className="text-[#333333]" />
              <span className="absolute -top-1 -right-1 bg-[#8CC63F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-y-0 left-0 w-full bg-white/95 shadow-xl p-6 z-[100] transform transition-transform duration-300 flex flex-col rounded-b-3xl ${
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
          {["home", "shop", "sale", "contact"].map((label) => (
            <a
              key={label}
              href={`/${label === "home" ? "" : label}`}
              className={`font-medium text-xl ${
                activeLink === label
                  ? "text-[#8CC63F]"
                  : "text-[#333333] hover:text-[#4A6BFF]"
              } border-b border-gray-200 pb-4 w-full text-center`}
              onClick={() => handleLinkClick(label)}
            >
              {label.toUpperCase()}
            </a>
          ))}
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

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
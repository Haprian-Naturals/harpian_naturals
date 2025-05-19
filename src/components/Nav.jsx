import React, { useState, useContext, useEffect } from "react";
import { User, Heart, ShoppingBag } from "lucide-react";
import Logo from "./HaprianLogo";
import SignUpModal from "./SignUpModal";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { totalItems } = useContext(CartContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem("userName") || "");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = (name) => {
    setIsAuthenticated(true);
    setUserName(name || "User");
    localStorage.setItem("token", "example-token");
    localStorage.setItem("userName", name);
    setIsAuthModalOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    let initials = names[0][0];
    if (names.length > 1) initials += names[names.length - 1][0];
    return initials.toUpperCase();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-[#333] hover:text-[#8CC63F] transition mr-3"
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
            <a href="/" className="mt-1">
              <Logo />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["/", "/shop", "/sale", "/contact"].map((path, idx) => {
              const labels = ["HOME", "SHOP", "SALE", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition relative pb-1 ${
                      isActive
                        ? "text-[#8CC63F] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8CC63F]"
                        : "text-[#333] hover:text-[#8CC63F]"
                    }`
                  }
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#333] hover:text-[#8CC63F] transition ${
                isAuthenticated ? "" : "cursor-pointer"
              }`}
              onClick={isAuthenticated ? null : () => setIsAuthModalOpen(true)}
            >
              {isAuthenticated ? (
                <span className="text-sm font-bold">
                  {getInitials(userName)}
                </span>
              ) : (
                <User size={20} />
              )}
            </div>

            {!isAuthenticated && (
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `relative p-2 rounded-full hover:bg-gray-100 transition ${
                    isActive ? "text-[#8CC63F]" : "text-[#333]"
                  }`
                }
              >
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8CC63F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  1
                </span>
              </NavLink>
            )}

            <button
              onClick={toggleCartModal}
              className="relative p-2 rounded-full hover:bg-gray-100 transition text-[#333]"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8CC63F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </button>

            {isAuthenticated && (
              <div
                className="text-xl text-[#333] hover:text-[#8CC63F] transition cursor-pointer"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mt-[2px]"></i>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-full bg-white/95 shadow-xl z-[100] p-6 transition-transform duration-300 rounded-b-3xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="text-[#333] hover:text-[#8CC63F] transition"
          >
            <svg
              className="w-6 h-6 hover:rotate-90 transition-transform"
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

        <div className="mt-6 flex flex-col space-y-5 items-center">
          {["home", "shop", "sale", "contact"].map((label) => (
            <a
              key={label}
              href={`/${label === "home" ? "" : label}`}
              onClick={() => handleLinkClick(label)}
              className={`w-full text-center text-lg font-medium py-2 rounded-md transition ${
                activeLink === label
                  ? "text-[#8CC63F] border-b-2 border-[#8CC63F]"
                  : "text-[#333] hover:text-[#8CC63F]"
              }`}
            >
              {label.toUpperCase()}
            </a>
          ))}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-[#333] hover:text-[#8CC63F] flex items-center space-x-2 mt-4"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>SIGN OUT</span>
            </button>
          )}
        </div>
      </div>

      <SignUpModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleAuthSuccess}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

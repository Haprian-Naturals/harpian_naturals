import React, { useState } from "react";
import { Search, ShoppingBag, Map, User } from "lucide-react";
import Logo from "./Logo";


const Navbar = () => {

  return (
    <nav className="w-full  bg-white shadow-sm p-3">
      <div className="max-w-7xl  flex justify-between items-center">
        {/* Logo */}
        <Logo/>
        {/* <img src={logo} alt="" /> */}
        {/* <div className="">
          <a href="/" className="flex items-center">
            <h1 className="text-xl font-bold">
              <span>HAPRIAN</span>
              <span className="text-gray-400 px-1 text-sm">AND</span>
              <span>NATURALS</span>
            </h1>
            
          </a>
        </div> */}

        

        {/* Right Navigation */}
        <div className="flex items-center mt-4 md:mt-0 md:ml-8">
          <a
            href="/stores"
            className="flex flex-col items-center mx-4 text-gray-700 hover:text-purple-600"
          >
            <Map size={20} />
            <span className="text-xs mt-1">Stores</span>
          </a>

          <a
            href="/login"
            className="flex flex-col items-center mx-4 text-gray-700 hover:text-purple-600"
          >
            <User size={20} />
            <span className="text-xs mt-1">Log in</span>
          </a>

          <a
            href="/cart"
            className="flex flex-col items-center mx-4 text-gray-700 hover:text-purple-600 relative"
          >
            <ShoppingBag size={20} />
            <span className="text-xs mt-1">$0.00</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

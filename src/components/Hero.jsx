import React from "react";
import neem from "../assets/neem.jpg"

const HeroSection = () => {
  return (
    <div className="relative w-full bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left content */}
          <div className="px-6 md:px-10 py-16 md:py-24 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-4">
              20% Off Aveda Litres
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-8">
              with 2+ Aveda Litre products*
            </p>
            <div>
              <button className="border-2 border-black px-8 py-3 uppercase font-bold tracking-wide hover:bg-black hover:text-white transition-colors duration-300">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Right side - background image container */}
          <div className="relative h-full min-h-96">
            {/* This div is an empty container that will have the background image */}
          </div>
        </div>
      </div>

      {/* Background image and promo tag positioned absolutely */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${neem})`,
          }}
        />

        {/* Circular savings badge */}
        <div className="absolute top-16 left-0 md:-left-12 bg-blue-200 rounded-full w-24 h-24 flex items-center justify-center text-center transform rotate-0">
          <p className="text-sm font-bold text-gray-800">
            Save up
            <br />
            to $107!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

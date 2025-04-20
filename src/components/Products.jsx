import React, { useState } from "react";
import product1 from "../assets/treat.png";
import product2 from "../assets/ist.png";
import product3 from "../assets/cast.png";
import product4 from "../assets/rose.png";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Best Sellers");

  const products = [
    {
      image: product2,
      brand: "REDO HAIRCARE",
      name: "Genie in a Bottle Miracle Spray 250ml Miracle",
      price: "$24.95",
      rating: 58,
    },
    {
      image: product2,
      brand: "MILK_SHAKE",
      name: "Incredible Milk 150ml in a Bottle Miracle",
      price: "$31.96",
      rating: 58,
    },
    {
      image: product3,
      brand: "TYPEBEA G1",
      name: "Overnight Boosting Peptide Serum 100ml",
      price: "$80.00",
      rating: 11,
    },
    {
      image: product4,
      brand: "K18",
      name: "Leave-In Molecular Repair Mask 50ml Miracle",
      price: "$99.95",
      rating: 793,
    },
  ];

  const tabs = ["Best Sellers", "New Arrivals", "Sale"];

  return (
    <div className="py-12 bg-[#F5F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl text-[#1A3C34] font-bold text-center uppercase mb-6 font-['Playfair_Display']">
          Just For You
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium uppercase ${
                activeTab === tab
                  ? "text-[#1A3C34] border-b-2 border-[#8CC63F]"
                  : "text-gray-500 hover:text-[#1A3C34] transition-colors duration-300"
              } pb-2`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Product Info */}
              <div className="px-4 pb-5 flex flex-col items-center flex-grow">
                <p className="text-xs text-[#8CC63F] uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <h3 className="text-base font-medium text-[#1A3C34] text-center leading-tight mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating / 10)
                          ? "text-[#8CC63F]"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.691h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.27 9.394c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.691l1.286-3.966z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  {product.price}
                </p>
                <a
                  href="#"
                  className="text-sm text-[#1A3C34] hover:text-[#8CC63F] hover:underline mb-3 block"
                >
                  Quick View
                </a>
                <button className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

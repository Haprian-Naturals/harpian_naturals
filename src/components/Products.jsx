import React from "react";
import product1 from "../assets/treat.png"; // Adjust paths based on your folder structure
import product2 from "../assets/ist.png";
import product3 from "../assets/cast.png";
import product4 from "../assets/rose.png";

const ProductSection = () => {
  const products = [
    {
      image: product1,
      brand: "REDO HAIRCARE",
      name: "Genie in a Bottle Miracle Spray 250ml",
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
      name: "Leave-In Molecular Repair Mask 50ml",
      price: "$99.95",
      rating: 793,
    },
  ];

  return (
    <div className="py-10 bg-white">
      {/* Heading and Navigation */}
      <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-[#24349c] font-bold text-center  mb-4">
          JUST FOR YOU
        </h2>
        <div className="flex justify-center space-x-6 mb-8">
          <button className="text-[#2b3db8] font-semibold hover:text-black">
            Best Sellers
          </button>
          <button className="text-[#2b3db8] font-semibold hover:text-black">
            New Arrivals
          </button>
          <button className="text-[#2b3db8] font-semibold hover:text-black">
            Sale
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative mb-4 border border-gray-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-55 object-contain"
                />
              </div>
              <div className="w-full text-left flex flex-col h-50 items mx-3 justify-evenly">
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  {product.brand}
                </p>
                <h3 className="text-sm font-medium text-gray-800 leading-tight mb-1">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {product.price}
                </p>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <a
                  href=""
                  className="text-xs font-semibold text-[#24349c] underline hover:text-purple-800 mb-3 block"
                >
                  QUICK VIEW
                </a>

                <button className=" py-4 w-full text-xs font-semibold text-[#24349c] border border-[#24349c] py-2 hover:bg-[#24349c] hover:text-white">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;

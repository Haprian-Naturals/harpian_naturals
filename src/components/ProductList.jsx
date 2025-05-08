import React, { useState } from "react";
import product1 from "../assets/treat.png";
import product2 from "../assets/ist.png";
import product3 from "../assets/cast.png";
import product4 from "../assets/rose.png";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const [startIndex, setStartIndex] = useState(0);

  const products = [
    {
      id: "1",
      image: product2,
      brand: "REDO HAIRCARE",
      name: "Genie in a Bottle Miracle Spray 250ml Miracle",
      price: "GH₵24.95",
      rating: 58,
      category: "Best Sellers",
    },
    {
      id: "2",
      image: product2,
      brand: "MILK_SHAKE",
      name: "Incredible Milk 150ml in a Bottle Miracle",
      price: "GH₵31.96",
      rating: 58,
      category: "New Arrivals",
    },
    {
      id: "3",
      image: product3,
      brand: "TYPEBEA G1",
      name: "Overnight Boosting Peptide Serum 100ml",
      price: "GH₵80.00",
      rating: 11,
      category: "Sale",
    },
    {
      id: "4",
      image: product4,
      brand: "K18",
      name: "Leave-In Molecular Repair Mask 50ml Miracle",
      price: "GH₵99.95",
      rating: 793,
      category: "Best Sellers",
    },
    {
      id: "5",
      image: product1,
      brand: "REDO HAIRCARE",
      name: "Hydrating Shampoo Molecular 300ml",
      price: "GH₵19.99",
      rating: 45,
      category: "Best Sellers",
    },
    {
      id: "6",
      image: product3,
      brand: "MILK_SHAKE",
      name: "Conditioner for Dry Hair 200ml",
      price: "GH₵25.00",
      rating: 32,
      category: "New Arrivals",
    },
    {
      id: "7",
      image: product4,
      brand: "TYPEBEA G1",
      name: "Scalp Treatment Oil 100ml",
      price: "GH₵35.00",
      rating: 20,
      category: "Sale",
    },
    {
      id: "8",
      image: product4,
      brand: "K18",
      name: "Leave-In Molecular Repair Mask 50ml Miracle",
      price: "GH₵99.95",
      rating: 793,
      category: "Best Sellers",
    },
  ];

  const tabs = ["Best Sellers", "New Arrivals", "Sale"];

  const filteredProducts = products.filter(
    (product) => product.category === activeTab
  );

  const productsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + productsPerPage;
      return newIndex >= filteredProducts.length ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - productsPerPage;
      return newIndex < 0
        ? Math.max(0, filteredProducts.length - productsPerPage)
        : newIndex;
    });
  };

  // On mobile (below md), show all products for horizontal scrolling; on md and above, use slider logic
  const displayedProducts =
    window.innerWidth < 768
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + productsPerPage);

  React.useEffect(() => {
    setStartIndex(0);
  }, [activeTab]);

  return (
    <div className="py-12 bg-[#F5F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-[#1A3C34] font-bold text-center uppercase mb-6 font-['Playfair_Display']">
          Just For You
        </h2>
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
        <div className="relative">
          <div className="md:grid md:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {displayedProducts.map((product) => (
              <div
                className="snap-center shrink-0 w-60 md:w-auto"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filteredProducts.length > productsPerPage && (
            <>
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-3 bg-[#1A3C34] text-white rounded-full shadow-md hover:bg-[#8CC63F] transition-colors duration-300"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 p-3 bg-[#1A3C34] text-white rounded-full shadow-md hover:bg-[#8CC63F] transition-colors duration-300"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

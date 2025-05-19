import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard"; // import here
import { getProducts } from "../services/product.js";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const tabs = ["Best Sellers", "New Arrivals", "Sale"];

  const getFilteredProducts = () => {
    let filtered = [...products];
    switch (activeTab) {
      case "Best Sellers":
        filtered.sort((a, b) => (b.rating || 40) - (a.rating || 50));
        return filtered.slice(0, 4);
      case "New Arrivals":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        return filtered.slice(0, 4);
      case "Sale":
        return filtered.slice(0, 3);
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredProducts();
  const productsPerPage = 4;

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

  const displayedProducts =
    typeof window !== "undefined" && window.innerWidth < 768
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
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
            {loading ? (
              // Show 4 skeletons as fallback
              [...Array(4)].map((_, index) => (
                <div
                  className="snap-center shrink-0 w-60 md:w-auto"
                  key={index}
                >
                  <SkeletonCard />
                </div>
              ))
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div
                  className="snap-center shrink-0 w-60 md:w-auto"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No products available in this category.
              </p>
            )}
          </div>

          {!loading && filteredProducts.length > productsPerPage && (
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

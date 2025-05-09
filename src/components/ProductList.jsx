import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/product.js"; // Adjust path to your API file

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
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const tabs = ["Best Sellers", "New Arrivals", "Sale"];

  // Apply sorting and limiting based on active tab
  const getFilteredProducts = () => {
    let filtered = [...products]; // Create a copy to avoid mutating the original array
    switch (activeTab) {
      case "Best Sellers":
        filtered.sort((a, b) => (b.rating || 40) - (a.rating || 50)); // Descending order by rating
        return filtered.slice(0, 4);
      case "New Arrivals":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Descending order by createdAt
        return filtered.slice(0, 4);
      case "Sale":
        return filtered.slice(0, 3); // First 3 products, no sorting
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredProducts();

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

  useEffect(() => {
    setStartIndex(0);
  }, [activeTab]);

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;

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
            {displayedProducts.length > 0 ? (
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
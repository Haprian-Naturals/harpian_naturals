import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import rc-slider styles
import { MdGridView, MdList } from "react-icons/md";

import productsData from '../data'

const Shop = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [isGridView, setIsGridView] = useState(true);
  const [sortOption, setSortOption] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 3760]);
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [productTypes, setProductTypes] = useState({
    Deals: false,
    HairCare: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by availability
    if (availability.inStock || availability.outOfStock) {
      filtered = filtered.filter(
        (product) =>
          (availability.inStock && product.inStock) ||
          (availability.outOfStock && !product.inStock)
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by product type
    if (productTypes.Deals || productTypes.HairCare) {
      filtered = filtered.filter(
        (product) =>
          (productTypes.Deals && product.type === "Deals") ||
          (productTypes.HairCare && product.type === "Hair Care")
      );
    }

    // Sort products
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Featured") {
      filtered.sort((a, b) => (b.isPopular ? 1 : -1));
    }

    setFilteredProducts(filtered);
  }, [availability, priceRange, productTypes, sortOption, products]);

  // Handle availability checkbox
  const handleAvailabilityChange = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle product type checkbox
  const handleProductTypeChange = (type) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Toggle view
  const toggleView = (view) => {
    setIsGridView(view === "grid");
  };

  return (
    <div className=" min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 px-6 shadow-sm">
        <p className="text-[#333333] text-sm">Home | Hair Care</p>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <div
          className={`lg:w-1/4 w-full lg:pr-8 ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <button
            className="lg:hidden mb-4 text-[#8A9A5B] text-lg font-semibold"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close Filters" : "Open Filters"}
          </button>

          <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b-2 border-[#8A9A5B] pb-2">
            CATEGORIES
          </h2>
          <p className="text-[#333333] font-medium mb-4">Hair Care</p>

          <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b-2 border-[#8A9A5B] pb-2">
            AVAILABILITY
          </h2>
          <div className="mb-4">
            <label className="flex items-center text-[#333333] mb-2">
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={() => handleAvailabilityChange("inStock")}
                className="mr-2"
              />
              In Stock
            </label>
            <label className="flex items-center text-[#333333]">
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={() => handleAvailabilityChange("outOfStock")}
                className="mr-2"
              />
              Out of Stock
            </label>
          </div>

          <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b-2 border-[#8A9A5B] pb-2">
            PRICE
          </h2>
          <div className="mb-4">
            <Slider
              range
              min={0}
              max={3760}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              trackStyle={{ backgroundColor: "#8A9A5B" }}
              handleStyle={{
                borderColor: "#8A9A5B",
                backgroundColor: "#8A9A5B",
              }}
              railStyle={{ backgroundColor: "#D3D3D3" }}
            />
            <div className="flex justify-between text-[#333333] mt-2">
              <span>₵ {priceRange[0]}</span>
              <span>₵ {priceRange[1]}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b-2 border-[#8A9A5B] pb-2">
            PRODUCT TYPE
          </h2>
          <div className="mb-4">
            <label className="flex items-center text-[#333333] mb-2">
              <input
                type="checkbox"
                checked={productTypes.Deals}
                onChange={() => handleProductTypeChange("Deals")}
                className="mr-2"
              />
              Deals
            </label>
            <label className="flex items-center text-[#333333]">
              <input
                type="checkbox"
                checked={productTypes.HairCare}
                onChange={() => handleProductTypeChange("HairCare")}
                className="mr-2"
              />
              Hair Care
            </label>
          </div>

          <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b-2 border-[#8A9A5B] pb-2">
            POPULAR PRODUCT
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md relative">
            <span className="absolute top-2 left-2 bg-[#8A9A5B] text-white text-xs font-semibold px-2 py-1 rounded">
              POPULAR
            </span>
            <img
              src={productsData[0].image}
              alt={productsData[0].name}
              className="w-full h-48 object-contain mb-4"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/150?text=Image+Not+Found")
              }
            />
            <p className="text-[#333333] font-medium">
              {productsData[0].name} ({productsData[0].size})
            </p>
            <p className="text-[#8A9A5B] font-bold">
              ₵ {productsData[0].price.toFixed(2)}
            </p>
          </div>

          <button className="mt-4 bg-[#8A9A5B] text-white text-lg font-semibold py-2 px-4 rounded hover:bg-[#6B7A4A] transition">
            Let Me Help You
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => toggleView("grid")}
                className={`text-[#333333] ${
                  isGridView ? "text-[#8A9A5B]" : ""
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => toggleView("list")}
                className={`text-[#333333] ${
                  !isGridView ? "text-[#8A9A5B]" : ""
                }`}
              >
                List
              </button>
            </div>
            <p className="text-[#333333]">
              Showing: {filteredProducts.length} Results
            </p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#D3D3D3] rounded px-2 py-1 text-[#333333]"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid/List */}
          <div
            className={`grid gap-6 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white p-4 rounded-lg shadow-md ${
                  isGridView
                    ? "flex flex-col"
                    : "flex flex-col sm:flex-row items-center"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`${
                    isGridView ? "w-full h-48" : "w-32 h-32 sm:w-48 sm:h-48"
                  } object-contain mb-4 sm:mb-0 sm:mr-4`}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=Image+Not+Found")
                  }
                />
                <div className="flex-1">
                  <p className="text-[#333333] font-medium">
                    {product.name} ({product.size})
                  </p>
                  <p className="text-[#8A9A5B] font-bold">
                    ₵ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React, { useState, useEffect, useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MdGridView, MdList } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import "../styles/Shop.css"; // Import the new CSS file
import productsData from "../data";

const Shop = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      price: product.price,
    };
    addToCart(productToAdd);
    alert(`${product.name} has been added to your cart!`);
  };

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

  useEffect(() => {
    let filtered = [...products];

    if (availability.inStock || availability.outOfStock) {
      filtered = filtered.filter(
        (product) =>
          (availability.inStock && product.inStock) ||
          (availability.outOfStock && !product.inStock)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (productTypes.Deals || productTypes.HairCare) {
      filtered = filtered.filter(
        (product) =>
          (productTypes.Deals && product.type === "Deals") ||
          (productTypes.HairCare && product.type === "Hair Care")
      );
    }

    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - b.price);
    } else if (sortOption === "Featured") {
      filtered.sort((a, b) => (b.isPopular ? 1 : -1));
    }

    setFilteredProducts(filtered);
  }, [availability, priceRange, productTypes, sortOption, products]);

  const handleAvailabilityChange = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleProductTypeChange = (type) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleView = (view) => {
    setIsGridView(view === "grid");
  };

  return (
    <div className="min-h-screen">
      

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <div
          className={`sidebar lg:w-1/4 w-full lg:pr-8 bg-[#F5F7F5] p-6 rounded-md shadow-md ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <button
            className="lg:hidden mb-6 text-[#1A3C34] text-lg font-semibold hover:text-[#8CC63F] transition-colors duration-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close Filters" : "Open Filters"}
          </button>

          <h2 className="text-2xl font-bold text-[#1A3C34] mb-4 border-b-2 border-[#8CC63F] pb-2 font-['Playfair_Display']">
            CATEGORIES
          </h2>
          <p className="text-[#666666] font-medium mb-6">Hair Care</p>
          <p className="text-[#666666] font-medium mb-6">Skin Care</p>
          <p className="text-[#666666] font-medium mb-6">Natural oil</p>

          <h2 className="text-2xl font-bold text-[#1A3C34] mb-4 border-b-2 border-[#8CC63F] pb-2 font-['Playfair_Display']">
            AVAILABILITY
          </h2>
          <div className="mb-6">
            <label className="flex items-center text-[#666666] mb-3">
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={() => handleAvailabilityChange("inStock")}
                className="mr-2 accent-[#8CC63F]"
              />
              In Stock
            </label>
            <label className="flex items-center text-[#666666]">
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={() => handleAvailabilityChange("outOfStock")}
                className="mr-2 accent-[#8CC63F]"
              />
              Out of Stock
            </label>
          </div>

          <h2 className="text-2xl font-bold text-[#1A3C34] mb-4 border-b-2 border-[#8CC63F] pb-2 font-['Playfair_Display']">
            PRICE
          </h2>
          <div className="mb-6">
            <Slider
              range
              min={0}
              max={3760}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              trackStyle={{ backgroundColor: "#8CC63F" }}
              handleStyle={{
                borderColor: "#8CC63F",
                backgroundColor: "#8CC63F",
              }}
              railStyle={{ backgroundColor: "#D4E4D8" }}
            />
            <div className="flex justify-between text-[#666666] mt-2">
              <span>GH₵{priceRange[0]}</span>
              <span>GH₵{priceRange[1]}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1A3C34] mb-4 border-b-2 border-[#8CC63F] pb-2 font-['Playfair_Display']">
            PRODUCT TYPE
          </h2>
          <div className="mb-6">
            <label className="flex items-center text-[#666666] mb-3">
              <input
                type="checkbox"
                checked={productTypes.Deals}
                onChange={() => handleProductTypeChange("Deals")}
                className="mr-2 accent-[#8CC63F]"
              />
              Deals
            </label>
            <label className="flex items-center text-[#666666]">
              <input
                type="checkbox"
                checked={productTypes.HairCare}
                onChange={() => handleProductTypeChange("HairCare")}
                className="mr-2 accent-[#8CC63F]"
              />
              Hair Care
            </label>
          </div>

          <h2 className="text-2xl font-bold text-[#1A3C34] mb-4 border-b-2 border-[#8CC63F] pb-2 font-['Playfair_Display']">
            POPULAR PRODUCT
          </h2>
          <div className="bg-white p-4 rounded-md shadow-md relative">
            <span className="absolute top-2 left-2 bg-[#8CC63F] text-white text-xs font-semibold px-2 py-1 rounded">
              POPULAR
            </span>
            <div className="relative overflow-hidden p-4">
              <img
                src={productsData[0].image}
                alt={productsData[0].name}
                className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=Image+Not+Found")
                }
              />
            </div>
            <div className="px-4 pb-4 flex flex-col items-center">
              <p className="text-xs text-[#8CC63F] uppercase tracking-wide mb-1">
                {productsData[0].brand}
              </p>
              <h3 className="text-base font-medium text-[#1A3C34] text-center leading-tight mb-2">
                {productsData[0].name} ({productsData[0].size})
              </h3>
              <p className="text-sm font-semibold text-gray-800">
                GH₵{productsData[0].price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <div className="flex justify-between items-center mb-6">
            {/* <div className="flex space-x-4">
              <button
                onClick={() => toggleView("grid")}
                className={`text-[#333333] ${
                  isGridView ? "text-[#8A9A5B]" : ""
                }`}
              >
                <MdGridView />
              </button>
              <button
                onClick={() => toggleView("list")}
                className={`text-[#333333] ${
                  !isGridView ? "text-[#8A9A5B]" : ""
                }`}
              >
                <MdList />
              </button>
            </div> */}
            <p className="mx-2 text-[#333333]">
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
                className="bg-white rounded-md shadow-md hover:shadow-lg relative"
              >
                <div className="relative overflow-hidden p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
                  />
                </div>
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
                    GH₵{product.price.toFixed(2)}
                  </p>
                  <a
                    href="#"
                    className="text-sm text-[#1A3C34] hover:text-[#8CC63F] hover:underline mb-3 block"
                  >
                    Quick View
                  </a>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
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

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/product.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductSkeleton from "../components/ProductSkeleton.jsx"; // 👈 Import the skeleton
import "../styles/Shop.css";
import toast from "react-hot-toast";
import { useLocation,useNavigate } from "react-router-dom";


const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.orderSuccess) {
      toast.success(
        "Order placed successfully! WhatsApp message sent to vendor."
      );

      // Clean up the state to prevent duplicate toast on refresh or revisit
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  console.log("Shop loaded. Location state:", location.state);



  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let isGridView = true;
  // const [isGridView, setIsGridView] = useState(true);
  const [sortOption, setSortOption] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 3760]); // Original range in rupees, adjust based on API data
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [productTypes, setProductTypes] = useState({
    SkinCare: false,
    HairCare: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (!Array.isArray(data.products)) {
          throw new Error("Invalid data format: Expected an array of products");
        }
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

    if (productTypes.SkinCare || productTypes.HairCare) {
      filtered = filtered.filter(
        (product) =>
          (productTypes.SkinCare &&
            product.category.toLowerCase() === "skin care") ||
          (productTypes.HairCare &&
            product.category.toLowerCase() === "hair care")
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Featured") {
      filtered.sort((a, b) => (b.isPopular ? 1 : -1));
    }

    setFilteredProducts(filtered.slice(0, 15));
  }, [
    availability,
    priceRange,
    productTypes,
    sortOption,
    products,
    searchTerm,
    selectedCategory,
  ]);

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

  const allowedCategories = ["All", "Skin Care", "Hair Care"];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar - Hidden on mobile, visible on lg and above */}
        <div className="hidden lg:block lg:w-1/4 w-full lg:pr-8 mb-8 lg:mb-0">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg text-[#333333] font-semibold mb-4">CATEGORIES</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-[#D3D3D3] rounded px-2 py-1 text-[#333333] mb-6"
            >
              {allowedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <h2 className="text-lg text-[#333333] font-semibold mb-4">AVAILABILITY</h2>
            <div className="space-y-2 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={availability.inStock}
                  onChange={() => handleAvailabilityChange("inStock")}
                  className="mr-2"
                />
                In stock
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={availability.outOfStock}
                  onChange={() => handleAvailabilityChange("outOfStock")}
                  className="mr-2"
                />
                Out of stock
              </label>
            </div>

            <h2 className="text-lg text-[#333333] font-semibold mb-4">PRICE</h2>
            <div className="mb-6">
              <Slider
                range
                min={0}
                max={3760} // Adjust based on your API's max price, converted to GHC
                value={priceRange}
                onChange={setPriceRange}
                className="mb-4"
                trackStyle={{ backgroundColor: "#8CC63F" }}
                handleStyle={{ borderColor: "#8CC63F" }}
                railStyle={{ backgroundColor: "#D3D3D3" }}
              />
              <p className="text-[#333333]">
                GHC {priceRange[0].toFixed(2)} - GHC {priceRange[1].toFixed(2)}
              </p>
            </div>

            <h2 className="text-lg text-[#333333] font-semibold mb-4">PRODUCT TYPE</h2>
            <div className="space-y-2 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={productTypes.HairCare}
                  onChange={() => handleProductTypeChange("HairCare")}
                  className="mr-2"
                />
                Hair Care
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={productTypes.SkinCare}
                  onChange={() => handleProductTypeChange("SkinCare")}
                  className="mr-2"
                />
                Skin Care
              </label>
            </div>

            <h2 className="text-lg text-[#333333] font-semibold mb-4">POPULAR PRODUCT COLLECTION</h2>
            <p className="text-[#333333] text-sm mb-2">
              Please select collection from store
            </p>
            <a href="#" className="text-[#8CC63F] text-sm hover:underline">
              admin | customize | Collection page
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#D3D3D3] rounded px-2 py-1 text-[#333333] hidden lg:block"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
            <div className="flex w-full lg:w-auto space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="border border-[#D3D3D3] rounded px-2 py-1 text-[#333333] w-1/2"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-[#D3D3D3] rounded px-2 py-1 text-[#333333] w-2/5"
              >
                {allowedCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid/List */}
          <div
            className={`grid gap-6 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center py-6 text-red-500">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
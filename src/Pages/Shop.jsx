import React, { useState, useEffect, useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MdGridView, MdList } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/product.js"; // Adjust path to your API config file
import ProductCard from "../components/ProductCard.jsx"; // Adjust path to your ProductCard
import "../styles/Shop.css"; // Import the new CSS file

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

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [sortOption, setSortOption] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 3760]);
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [productTypes, setProductTypes] = useState({
    SkinCare: false,
    HairCare: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        console.log("Fetched products:", data);
        if (!Array.isArray(data.products)) {
          throw new Error("Invalid data format: Expected an array of products");
        }
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize filtered products with all data
      } catch (err) {
        console.error("Error fetching products:", err);
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

    setFilteredProducts(filtered.slice(0, 15)); // Limit to 15 products
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

  const toggleView = (view) => {
    setIsGridView(view === "grid");
  };

  if (loading)
    return <div className="text-center py-10 text-base">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-base">{error}</div>
    );

  // Define allowed categories
  const allowedCategories = ["All", "Skin Care", "Hair Care"];

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
          {allowedCategories.map((category, index) => (
            <p key={index} className="text-[#666666] font-medium mb-6">
              {category}
            </p>
          ))}

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
                checked={productTypes.SkinCare}
                onChange={() => handleProductTypeChange("SkinCare")}
                className="mr-2 accent-[#8CC63F]"
              />
              Skin Care
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
                src={products.length > 0 ? products[0].image : ""}
                alt={products.length > 0 ? products[0].name : "Popular Product"}
                className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=Image+Not+Found")
                }
              />
            </div>
            <div className="px-4 pb-4 flex flex-col items-center">
              <p className="text-xs text-[#8CC63F] uppercase tracking-wide mb-1">
                {products.length > 0 ? products[0].brand : "Unknown Brand"}
              </p>
              <h3 className="text-base font-medium text-[#1A3C34] text-center leading-tight mb-2">
                {products.length > 0 ? products[0].name : "Unnamed Product"} (
                {products.length > 0 ? products[0].size : ""})
              </h3>
              <p className="text-sm font-semibold text-gray-800">
                GH₵
                {(products.length > 0 ? products[0].price : 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

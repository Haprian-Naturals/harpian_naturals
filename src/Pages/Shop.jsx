import React, { useState, useEffect, useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MdGridView, MdList } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/product.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductSkeleton from "../components/ProductSkeleton.jsx"; // 👈 Import the skeleton
import "../styles/Shop.css";

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

  const toggleView = (view) => {
    setIsGridView(view === "grid");
  };

  const allowedCategories = ["All", "Skin Care", "Hair Care"];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar -- unchanged */}
        {/* ... Keep your entire sidebar code the same ... */}

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

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getProductById } from "../services/product.js";
import TabSection from "../components/TabSection";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageUrl = "https://res.cloudinary.com/dpflhpvla/image/upload/";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const parsedPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("GH₵", "") || "0")
        : product.price || 0;

    addToCart({
      ...product,
      price: parsedPrice,
      quantity,
    });
    alert(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  const imageSrc = `${imageUrl}${product.image}.${
    product.image?.includes("png") ? "png" : "jpg"
  }`;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center bg-[#D4E4D8] p-6 rounded-md">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-[280px] h-auto object-contain"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/400?text=No+Image")
            }
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-[#1A3C34] leading-snug">
            {product.name}
          </h1>

          {/* Stock + Sold Info */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#8CC63F] font-semibold">In Stock</span>
            <span className="flex items-center gap-1 text-gray-500">
              🔥 <strong>{product.sold || 15}</strong> sold in last{" "}
              <strong>5 hours</strong>
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-gray-800">
            GH₵{product.price}
          </div>

          {/* Description with Read More */}
          <div className="text-gray-700 text-base leading-relaxed">
            {showFullDesc
              ? product.description
              : product.description?.slice(0, 160) + "..."}
            {product.description?.length > 160 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-[#003087] ml-2 font-medium hover:underline cursor-pointer"
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Wishlist + Enquiry */}
          <div className="flex items-center gap-4 text-sm">
            <button className="text-[#003087] hover:underline">
              ♡ Add to Wishlist
            </button>
            <button className="text-[#003087] hover:underline">
              ✉ Enquiry
            </button>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4 mt-6 w-full">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-lg font-semibold"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-lg font-semibold"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-grow py-3 px-6 text-sm font-bold tracking-wide text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-all"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div id="tab" className="mb-5">
        <TabSection />
      </div>
    </>
  );
};

export default ProductDetail;

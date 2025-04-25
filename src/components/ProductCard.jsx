import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const parsedPrice = parseFloat(product.price.replace("GH₵", ""));
    const productToAdd = {
      ...product,
      price: parsedPrice,
    };
    addToCart(productToAdd);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg relative">
      {/* Image */}
      <div className="relative overflow-hidden p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
        />
      </div>
      {/* Product Info */}
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
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-3">
          {product.price}
        </p>
        <a
          href="#"
          className="text-sm text-[#1A3C34] hover:text-[#8CC63F] hover:underline mb-3 block"
        >
          Quick View
        </a>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
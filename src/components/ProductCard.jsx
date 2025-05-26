import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast"; // New Toast import

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getTruncatedDescription = (desc, maxLength = 100) => {
    if (!desc) return "Rejuvenate Your Skin While You Sleep...";
    if (desc.length <= maxLength || showFullDescription) return desc;
    return desc.slice(0, maxLength) + "...";
  };

  if (!addToCart) {
    console.error("addToCart is not available in CartContext");
    return <div>Error: Cart functionality is not available.</div>;
  }

  const handleAddToCart = () => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }
    let parsedPrice;
    if (typeof product.price === "string") {
      parsedPrice = parseFloat(product.price.replace("GH₵", "") || "0");
    } else if (typeof product.price === "number") {
      parsedPrice = product.price;
    } else {
      parsedPrice = 0;
    }

    const productToAdd = {
      ...product,
      price: parsedPrice,
      quantity: quantity,
    };

    addToCart(productToAdd);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    setIsModalOpen(false);
  };

  const handleQuickView = () => {
    setIsModalOpen(true);
  };

  const imageUrl = "https://res.cloudinary.com/dpflhpvla/image/upload/";
  const imageSrc = `${imageUrl}${product.image}.${
    product.image?.includes("png") ? "png" : "jpg"
  }`;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isModalOpen]);

  return (
    <>
      <div className="bg-white rounded-md shadow-md hover:shadow-lg relative">
        <div className="relative overflow-hidden p-4">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="px-4 pb-5 flex flex-col items-center flex-grow">
          <p className="text-xs text-[#8CC63F] uppercase tracking-wide mb-1">
            {product.brand || "Unknown Brand"}
          </p>
          <h3 className="text-base font-medium text-[#1A3C34] text-center leading-tight mb-2">
            {product.name || "Unnamed Product"}
          </h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor((product.rating || 0) / 10)
                    ? "text-[#8CC63F]"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.691h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.27 9.394c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.691l1.286-3.966z" />
              </svg>
            ))}
            {/* <span className="text-xs text-gray-500 ml-1">
              ({product.rating || 0})
            </span> */}
          </div>
          <p className="text-sm font-semibold text-gray-800 mb-3">
            GH₵{product.price || "0.00"}
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleQuickView();
            }}
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
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 px-2 sm:px-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-4xl relative overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-3 text-gray-700 text-xl hover:text-black cursor-pointer"
              >
                &times;
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex-1 flex justify-start md:justify-center items-start md:items-start">
                  <div className="sticky top-10">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-[80%] max-w-xs md:max-w-sm object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3 text-center md:text-left">
                  <h3 className="text-xs sm:text-sm text-gray-600 font-medium uppercase">
                    HAPRIAN NATURALS
                  </h3>
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-green-600 text-sm sm:text-base font-medium">
                    In Stock
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-800">
                    GH₵{product.price}
                  </p>
                  <div className="text-gray-700 text-xs sm:text-sm">
                    <p>{getTruncatedDescription(product.description)}</p>
                    {product.description &&
                      product.description.length > 100 && (
                        <button
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                          className="text-blue-600 hover:underline cursor-pointer text-xs mt-1"
                        >
                          {showFullDescription ? "Read less" : "Read more"}
                        </button>
                      )}
                  </div>

                  <div className="flex justify-center md:justify-start items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="space-y-2 pt-4">
                    <button
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                        setIsModalOpen(false);
                      }}
                      className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors"
                    >
                      VIEW MORE DETAILS
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors pointer-cursor"
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <button className="text-sm text-gray-700 hover:text-green-600 mt-3">
                    ♥ Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <Toast
          message={`${product.name} added to cart!`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default ProductCard;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2 } from "lucide-react"; // 👈 install lucide-react if not already

const CartModal = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative w-full md:w-96 bg-[#F5F7F5] shadow-2xl p-6 rounded-l-xl flex flex-col transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1A3C34] font-['Playfair_Display']">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-[#1A3C34] hover:text-[#8CC63F] transition"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {cart.length === 0 ? (
            <div>
            <p className="text-[#666] text-center text-base">
              Your cart is empty.
            </p>
            <a href="/shop">Continue shopping</a>
            </div>
            
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 border-b border-[#D4E4D8] pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-[#D4E4D8] shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium text-[#1A3C34] leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#666] hover:text-[#8CC63F] transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-[#666] mt-1">
                      GH₵{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-[#D4E4D8] rounded-full text-[#1A3C34] hover:bg-[#8CC63F] hover:text-white transition"
                      >
                        −
                      </button>
                      <span className="text-[#1A3C34] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-[#D4E4D8] rounded-full text-[#1A3C34] hover:bg-[#8CC63F] hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-[#1A3C34] tracking-wide">
                SUBTOTAL:
              </span>
              <span className="text-lg font-semibold text-[#1A3C34]">
                GH₵{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-[#666] mb-4">
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={handleViewCart}
              className="w-full py-3 rounded-md font-semibold text-white bg-[#003087] hover:bg-[#3657a4] transition"
            >
              VIEW CART
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
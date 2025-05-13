import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const [isInsuranceAdded, setIsInsuranceAdded] = useState(false);

  const imageUrl = "https://res.cloudinary.com/dpflhpvla/image/upload/";

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Add some items before proceeding to checkout."
      );
      return;
    }

    let message = "Hello, I'd like to place an order:\n\n";
    cart.forEach((item) => {
      message += `- ${item.name} (Qty: ${item.quantity}) - GH₵${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\nSubtotal: GH₵${totalPrice.toFixed(2)}\n`;
    if (isInsuranceAdded) {
      message += `Parcel Insurance: GH₵1.95\n`;
      message += `Total: GH₵${(totalPrice + 1.95).toFixed(2)}\n`;
    } else {
      message += `Total: GH₵${totalPrice.toFixed(2)}\n`;
    }
    message += "Please confirm my order and provide payment details.";
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+233550114976";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  const handleApplyDiscount = () => {
    if (discountCode) {
      alert(
        `Discount code "${discountCode}" applied! (Note: Discount logic not implemented)`
      );
    }
  };

  const handleToggleInsurance = () => {
    setIsInsuranceAdded(!isInsuranceAdded);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-['Playfair_Display']">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Products
            </h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-5 border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={`${imageUrl}${item.image[0]}.${
                      item.image[0]?.includes("png") ? "png" : "jpg"
                    }`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      GH₵{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 text-lg border border-gray-300 rounded hover:bg-green-500 hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 text-lg border border-gray-300 rounded hover:bg-green-500 hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm mt-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">
              Order Summary
            </h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-500 mb-1">
                Enter Discount Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="e.g. SAVE20"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="text-sm text-green-600 hover:text-green-800 underline"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-200 mt-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-gray-700 font-semibold">
                GH₵{totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-gray-800 font-bold">
                GH₵{(totalPrice + (isInsuranceAdded ? 1.95 : 0)).toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2 mb-5">
              Shipping & taxes calculated at checkout
            </p>

            <button
              // onClick={handleProceedToCheckout}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              <a href="/checkout">Checkout</a>
            </button>

            {/* <button
              onClick={handleToggleInsurance}
              className={`w-full py-3 mt-3 border rounded-md font-semibold transition ${
                isInsuranceAdded
                  ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {isInsuranceAdded
                ? "Parcel Insurance Added - GH₵1.95"
                : "Add Parcel Insurance - GH₵1.95"}
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

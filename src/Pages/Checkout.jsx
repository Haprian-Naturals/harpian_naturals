import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2 } from "lucide-react";

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/shop");
    }
  }, [cart, navigate]);

  const [delivery, setDelivery] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery (COD)");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [discountCode, setDiscountCode] = useState("");

  const imageUrl = "https://res.cloudinary.com/dpflhpvla/image/upload/";

  if (cart.length === 0) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !delivery.email ||
      !delivery.firstName ||
      !delivery.lastName ||
      !delivery.address ||
      !delivery.city ||
      !delivery.postalCode ||
      !delivery.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Order placed successfully! (Placeholder)");
  };

  const shippingCost = shippingMethod === "Standard" ? 200.0 : 0.0;
  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src="/path-to-hm-naturals-logo.png"
              alt="HM Naturals Logo"
              className="h-10"
            />
          </div>
          <button className="text-blue-600">Log in</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Form Sections */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-semibold mb-4">Contact</h2>
              <input
                type="email"
                value={delivery.email}
                onChange={(e) =>
                  setDelivery({ ...delivery, email: e.target.value })
                }
                placeholder="Email or mobile phone number"
                className="w-full p-2 border border-gray-200 rounded mb-2"
                required
              />
              <input
                type="text"
                value="joe@schmoe.com"
                disabled
                className="w-full p-2 border border-gray-200 rounded mb-2 bg-gray-100"
              />
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Email me with news and offers
              </label>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-semibold mb-4">Delivery</h2>
              <select
                value="Pakistan"
                disabled
                className="w-full p-2 border border-gray-200 rounded mb-2 bg-gray-100"
              >
                <option>Pakistan</option>
              </select>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={delivery.firstName}
                  onChange={(e) =>
                    setDelivery({ ...delivery, firstName: e.target.value })
                  }
                  placeholder="First name (optional)"
                  className="w-1/2 p-2 border border-gray-200 rounded"
                />
                <input
                  type="text"
                  value={delivery.lastName}
                  onChange={(e) =>
                    setDelivery({ ...delivery, lastName: e.target.value })
                  }
                  placeholder="Last name"
                  className="w-1/2 p-2 border border-gray-200 rounded"
                  required
                />
              </div>
              <input
                type="text"
                value={delivery.address}
                onChange={(e) =>
                  setDelivery({ ...delivery, address: e.target.value })
                }
                placeholder="Address"
                className="w-full p-2 border border-gray-200 rounded mb-2"
                required
              />
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={delivery.city}
                  onChange={(e) =>
                    setDelivery({ ...delivery, city: e.target.value })
                  }
                  placeholder="City"
                  className="w-1/2 p-2 border border-gray-200 rounded"
                  required
                />
                <input
                  type="text"
                  value={delivery.postalCode}
                  onChange={(e) =>
                    setDelivery({ ...delivery, postalCode: e.target.value })
                  }
                  placeholder="Postal code (optional)"
                  className="w-1/2 p-2 border border-gray-200 rounded"
                />
              </div>
              <input
                type="tel"
                value={delivery.phone}
                onChange={(e) =>
                  setDelivery({ ...delivery, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full p-2 border border-gray-200 rounded mb-2"
                required
              />
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Save this information for next time
              </label>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
              <label className="flex items-center justify-between p-2 border border-gray-200 rounded mb-2 bg-blue-50">
                <span>Standard</span>
                <span>Rs. 200.00</span>
              </label>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-semibold mb-4">Payment</h2>
              <p className="text-sm text-gray-600 mb-2">
                All transactions are secure and encrypted.
              </p>
              <label className="flex items-center justify-between p-2 border border-gray-200 rounded mb-2 bg-blue-50">
                <span>Cash on Delivery (COD)</span>
                <span>Rs. 0.00</span>
              </label>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-semibold mb-4">Billing address</h2>
              <label className="flex items-center p-2 border border-gray-200 rounded mb-2 bg-blue-50">
                <input
                  type="radio"
                  checked={billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(true)}
                  className="mr-2"
                />
                Same as shipping address
              </label>
              <label className="flex items-center p-2 border border-gray-200 rounded">
                <input
                  type="radio"
                  checked={!billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(false)}
                  className="mr-2"
                />
                Use a different billing address
              </label>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded mt-4"
            >
              Complete order
            </button>

            
          </div>

          {/* Right Column - Cart Summary */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-gray-100 p-4 rounded">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{index + 1}</span>
                    <img
                      src={`${imageUrl}${item.image}.${
                        item.image?.includes("png") ? "png" : "jpg"
                      }`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Rs.{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="w-3/4 p-2 border border-gray-200 rounded"
                />
                <button className="w-1/4 p-2 bg-blue-600 text-white rounded">
                  Apply
                </button>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal - {cart.length} items</span>
                <span className="font-semibold">
                  Rs.{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="font-semibold">
                  Rs.{shippingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs.{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

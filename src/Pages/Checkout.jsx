import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import { addOrder } from "../services/order";

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const imageUrl = "https://res.cloudinary.com/dpflhpvla/image/upload/";

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/shop");
    }
  }, [cart, navigate]);

  const [delivery, setDelivery] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Ghana",
  });

  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const countries = ["Ghana", "Nigeria", "Kenya", "South Africa", "Egypt"];

  if (cart.length === 0) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !delivery.fullName ||
      !delivery.address ||
      !delivery.city ||
      !contact.email ||
      !contact.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice.toFixed(2),
      delivery: {
        fullName: delivery.fullName,
        address: delivery.address,
        city: delivery.city,
        postalCode: delivery.postalCode,
        country: delivery.country,
      },
      contact: {
        email: contact.email,
        phone: contact.phone,
      },
    };

    setLoading(true);
    try {
      const result = await addOrder(orderData);
      console.log("Order submitted successfully:", result);

      const vendorPhone = "+233550114976";
      const message = `
New Order Received! 🎉

**Contact Information:**
- Email: ${contact.email}
- Phone: ${contact.phone}

**Delivery Information:**
- Name: ${delivery.fullName}
- Address: ${delivery.address}
- City: ${delivery.city}
- Postal Code: ${delivery.postalCode}
- Country: ${delivery.country}

**Order Details:**
${cart
  .map(
    (item) =>
      `- ${item.name} (Qty: ${item.quantity}) - GH₵${item.price.toFixed(2)}`
  )
  .join("\n")}

**Total Price:** GH₵${totalPrice.toFixed(2)}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${vendorPhone}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      clearCart();
      alert("Order placed successfully! WhatsApp message sent to vendor.");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F7F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* LEFT SIDE: Contact + Delivery + Payment */}
          <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-6">
            {/* Contact */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#1A3C34] mb-4">
                Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  placeholder="Email"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                  required
                />
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                  required
                />
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#1A3C34] mb-4">
                Delivery
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={delivery.fullName}
                  onChange={(e) =>
                    setDelivery({ ...delivery, fullName: e.target.value })
                  }
                  placeholder="Full Name"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  value={delivery.address}
                  onChange={(e) =>
                    setDelivery({ ...delivery, address: e.target.value })
                  }
                  placeholder="Address"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  value={delivery.city}
                  onChange={(e) =>
                    setDelivery({ ...delivery, city: e.target.value })
                  }
                  placeholder="City"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  value={delivery.postalCode}
                  onChange={(e) =>
                    setDelivery({ ...delivery, postalCode: e.target.value })
                  }
                  placeholder="Postal Code (optional)"
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                />
                <select
                  value={delivery.country}
                  onChange={(e) =>
                    setDelivery({ ...delivery, country: e.target.value })
                  }
                  className="p-3 border border-[#D4E4D8] rounded-md w-full"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-6 py-3 font-semibold text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#003087] hover:bg-[#3657a4]"
                } rounded-md flex items-center justify-center gap-2`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Placing Order..." : "Complete Order"}
              </button>
            </div>
          </form>

          {/* RIGHT SIDE: Cart Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit mb-6 lg:mb-0">
            <h2 className="text-xl font-semibold text-[#1A3C34] mb-4">
              Order Summary
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between space-x-4 border-b pb-4"
                >
                  <img
                    src={`${imageUrl}${item.image}.${
                      item.image?.includes("png") ? "png" : "jpg"
                    }`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-[#D4E4D8]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A3C34]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#666]">
                      GH₵{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#666] hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>GH₵{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>GH₵0.00</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>GH₵{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

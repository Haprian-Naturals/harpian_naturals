const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

// Send order to the server
export const addOrder = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to send order");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

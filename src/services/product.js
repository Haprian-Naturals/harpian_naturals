const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

// Fetch all skincare products
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Add a product (for vendor dashboard)
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/vendor/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

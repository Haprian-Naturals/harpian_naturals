const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

// Fetch all skincare products
export const getProducts = async () => {
  try {
    const url = `${BASE_URL}/api/products`;
    console.log("Request URL:", url);
    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
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
    const url = `${BASE_URL}/api/products/${id}`;
    console.log("Request URL:", url);
    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("Response status:", response.status);
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
    const response = await fetch(`${BASE_URL}/api/vendor/product`, {
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

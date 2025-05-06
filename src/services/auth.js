const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Signup function
export const signup = async (userData) => {
  try {
    const response = await fetch(
      `https://haprian-api.onrender.com/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
        throw new Error("Signup failed");
    }
    const data = await response.json();
    // localStorage.setItem("token", data.token); // Assume signup returns a token
    
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Verify code function
// In auth.js
export const verifyCode = async (verificationData) => {
  const response = await fetch(`${BASE_URL}/user/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(verificationData),
  });
  if (!response.ok) throw new Error('Verification failed');
  return response.json();
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    // Store token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};

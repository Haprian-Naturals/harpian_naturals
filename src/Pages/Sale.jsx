import React, { useState } from "react";
import axios from "axios";

const Sale = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("avatar", avatar); // image is a file

    try {
      const response = await axios.post(
        "https://680390880a99cb7408ec5f80.mockapi.io/api/v1/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important
          },
        }
      );

      console.log("Product posted:", response.data);
      // Clear form
      setTitle("");
      setDescription("");
      setAvatar(null);
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        className="w-full"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload Product
      </button>
    </form>

    
  );
};

export default Sale;

import React from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <div>
      <h2>This is my shop page</h2>
      <Link to="/" className="font-semibold hover:text-gray-300">
        Home
      </Link>
    </div>
  );
};

export default Shop;

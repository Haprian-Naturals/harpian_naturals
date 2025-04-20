import React from "react";
import blogImage1 from "../assets/hair_needs.jpg";
import blogImage2 from "../assets/happy.jpg";
import keratin from "../assets/keratin.jpg";

const Blog = () => {
  const blogs = [
    {
      category: "Haircare",
      title:
        "Color Wow’s Newest Money Mist: Boost Shine and Hydration for Healthier Hair",
      description:
        "If you’re a fan of haircare that gets straight to the point (and the glam), then you’ve probably alr…",
      image: blogImage1,
    },
    {
      category: "Skin Care",
      title:
        "Typebea: The Celebrity Haircare Line Tackling Hair Loss and Boosting Growth",
      description:
        "We want to introduce you to Typebea, the hot new haircare brand that’s been creating waves in the be…",
      image: blogImage2,
    },
    {
      category: "Haircare",
      title:
        "Color Wow’s Newest Money Mist: Boost Shine and Hydration for Healthier Hair",
      description:
        "If you’re a fan of haircare that gets straight to the point (and the glam), then you’ve probably alr…",
      image: keratin,
    },
    {
      category: "Haircare",
      title:
        "Typebea: The Celebrity Haircare Line Tackling Hair Loss and Boosting Growth",
      description:
        "We want to introduce you to Typebea, the hot new haircare brand that’s been creating waves in the be…",
      image: blogImage2,
    },
  ];

  return (
    <div className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center uppercase text-[#1A3C34] mb-8 font-['Playfair_Display']">
          In The Glow
        </h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover mb-4"
              />
              {/* Category */}
              <p className="text-sm text-[#8CC63F] uppercase mb-2">
                {blog.category}
              </p>
              {/* Title */}
              <h3 className="text-lg font-semibold text-[#1A3C34] mb-2">
                {blog.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.description}
              </p>
            </div>
          ))}
        </div>

        {/* View Blogs Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-[#003087] text-white uppercase font-semibold rounded px-6 py-2 hover:bg-[#4A6BFF] transition">
            View Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;

import React from "react";
import blogImage1 from "../assets/hair_needs.jpg"; // Replace with your actual image
import blogImage2 from "../assets/happy.jpg"; // Replace with your actual image
import keratin from "../assets/keratin.jpg";

const BlogSection = () => {
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
    <div className="py-10 mb-7 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">In The Glow</h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-84 object-cover mb-4"
              />
              {/* Category */}
              <p className="text-sm text-gray-500 uppercase mb-2">
                {blog.category}
              </p>
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-gray-600">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;

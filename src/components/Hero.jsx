import React, { useState, useEffect } from "react";
import group from "../assets/group.jpg";
import products from "../assets/products.png";
import ad from "../assets/ad.jpg";
import hair from "../assets/hair_essentials.png"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Ditch The Tangles",
      subtitle:
        "Free NAK Hair Hydrate Detangle Mist 100ml with all NAK Hair orders over $30*",
      image: group, // Replace with your image
      badge: "AVAILABLE ONLINE & IN STORE",
      
    },
    {
      title: "Free Christophne Robine",
      subtitle: "Across all OZ Hair and Beauty Essentials*",
      image: products, // Replace with your image
      badge: "AVAILABLE ONLINE & IN STORE",
      limitedText:
        "*Discount automatically applied at checkout, to the product of lowest value.",
    },
    {
      title: "Smooth & Sleek",
      subtitle: "Free NAK Hair Smooth Cream 150ml with orders over $35*",
      image: ad, // Replace with your image
      
    },
    {
      title: "Volume Boost",
      subtitle: "Free NAK Hair Volume Spray 200ml with orders over $45*",
      image: hair, // Replace with your image
      badge: "IN STORE ONLY",
      limitedText: "Limited stock!",
    },
  ];

  // Automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Determine if the current slide is odd-numbered to apply the background image to the section
  const isOddSlide = currentSlide % 2 === 0;
  const sectionBackground = isOddSlide
    ? {
        backgroundImage: `url(${slides[currentSlide].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: "#D3D3D3" };

  return (
    <section
      className="w-full h-[86vh] mt-12 flex flex-col justify-between"
      style={sectionBackground}
    >
      <div className="relative w-full flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 w-full ${
              currentSlide === index ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            {index % 2 === 0 ? (
              // Layout 1: Image as background (applied to section), text centered (for odd-numbered slides: 0, 2)
              <>
                {/* Overlay for text readability */}
                <div className="absolute flex flex-col justify-end inset-0 bg-black opacity-50"></div>

                {/* Text Content */}
                <div className="relative text-center z-10">
                  {slide.badge && (
                    <span className="inline-block bg-white text-[#333333] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white mb-6">{slide.subtitle}</p>
                  <a
                    href="/shop"
                    className="inline-block bg-[#003087] text-white text-sm font-semibold py-2 px-6 rounded hover:bg-[#4A6BFF] transition"
                  >
                    SHOP NOW
                  </a>
                </div>

                {/* Limited Text */}
                <span className="absolute top-4 right-4 text-white text-sm font-semibold transform rotate-45 z-10">
                  {slide.limitedText}
                </span>
              </>
            ) : (
              // Layout 2: Image on right, text on left, centered on page (for even-numbered slides: 1, 3)
              <div className="flex flex-col lg:flex-row items-center justify-center min-h-[70vh] px-4">
                {/* Left: Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 px-4">
                  {slide.badge && (
                    <span className="inline-block bg-white text-[#333333] text-sm font-semibold px-4 py-2 rounded-full mb-6">
                      {slide.badge}
                    </span>
                  )}
                  <h1
                    className="text-5xl sm:text-6xl font-bold text-[#1A1A1A] mb-6"
                    style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-2xl text-[#4A4A4A] mb-6">
                    {slide.subtitle}
                  </p>
                  <a
                    href="/shop"
                    className="inline-block bg-white text-[#333333] text-base font-semibold py-3 px-8 rounded border border-[#333333] hover:bg-[#E6D7F5] hover:text-white transition"
                  >
                    SHOP NOW
                  </a>
                </div>

                {/* Right: Image */}
                <div className="lg:w-1/2 flex justify-center px-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-[500px] h-[450px] object-contain"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
                    }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/576x576?text=Image+Not+Found")
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mb-6 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentSlide === index ? "bg-[#8CC63F]" : "bg-white"
            } border border-[#333333]`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

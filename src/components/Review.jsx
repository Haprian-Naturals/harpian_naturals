import React, { useEffect, useRef } from "react";
import product1 from "../assets/cast.png";
import product2 from "../assets/rose.png";
import product3 from "../assets/ist.png";
// import vid1 from "../videos/washing_video.mp4";
// import vid2 from "../videos/oil_treatment.mp4";
// import vid3 from "../videos/dirty_hair.mp4";
import vid1 from "/videos/washing_video.mp4"
import vid2 from "/videos/oil_treatment.mp4"
import vid3 from "/videos/dirty_hair.mp4"

const ReviewSection = () => {
  const reviews = [
    {
      name: "Emily",
      video: vid1,
      productImage: product1,
      comment: "You can visibly see a difference after just one use!",
    },
    {
      name: "Sophie",
      video: vid2,
      productImage: product2,
      comment:
        "It adds strength, hydration, frizz-control and most important to me it",
    },
    {
      name: "Ava",
      video: vid3,
      productImage: product3,
      comment:
        "I’ve seen a huge improvement in my curls, including less breakage",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videos = sectionRef.current.querySelectorAll("video");
            videos.forEach((video) => {
              video.play().catch((error) => {
                console.log("Video playback failed:", error);
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Small Heading */}
        <h2 className="text-sm font-light text-center uppercase text-[#8CC63F] mb-2 font-['Playfair_Display']">
          How You Function
        </h2>
        {/* Main Heading */}
        <h3 className="text-4xl md:text-5xl font-light text-center text-[#1A3C34] mb-8 tracking-wide font-['Playfair_Display']">
          Real Repair Stories, Real Joy
        </h3>
        {/* Grid of Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Video */}
              <div className="relative w-full">
                <video
                  className="w-full h-80 object-cover"
                  muted
                  loop
                  playsInline
                  style={{
                    border: "none",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <source src={review.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Username Overlay */}
                <div className="absolute top-2 left-2 bg-black/50 text-white text-sm font-semibold px-2 py-1 rounded">
                  @{review.name}
                </div>
              </div>
              {/* Colored Bar with Product Image, Comment, and Name */}
              <div className="w-full bg-[#D4E4D8] flex items-center justify-between p-4">
                {/* Product Image */}
                <img
                  src={review.productImage}
                  alt={review.name}
                  className="w-16 h-20 object-contain relative -mt-12"
                  style={{
                    border: "none",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                />
                {/* Comment and Name */}
                <div className="flex-1 ml-4">
                  <p className="text-sm italic text-gray-600 mb-1">
                    "{review.comment}"
                  </p>
                  <p className="text-sm font-bold text-[#1A3C34] text-right">
                    {review.name.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

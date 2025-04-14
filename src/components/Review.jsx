import React, { useEffect, useRef } from "react";
import product1 from "../assets/cast.png";
import product2 from "../assets/rose.png";
import product3 from "../assets/ist.png";
import vid1 from '../videos/washing_video.mp4'
import vid2 from '../videos/oil_treatment.mp4'
import vid3 from '../videos/dirty_hair.mp4'

// Placeholder video URL (replace with your actual video imports)
const placeholderVideo =
  "https://www.instagram.com/haprian_naturals/reel/DIFCIkaiWw1/";

const ReviewSection = () => {
  const reviews = [
    {
      name: "Emily",
      video: vid1, // Replace with actual video import, e.g., import review1 from '../videos/review1.mp4';
      productImage: product1,
      comment:
        '"You can visibly see a difference after just one use!"',
    },
    {
      name: "Sophie",
      video: vid2, // Replace with actual video import
      productImage: product2,
      comment:
        '"It adds strength, hydration, frizz-control and most important to me it"',
    },
    {
      name: "Ava",
      video: vid3, // Replace with actual video import
      productImage: product3,
      comment:
        '"I’ve seen a huge improvement in my curls, including less breakage"',
    },
  ];

  // Ref to track the section
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the section is in view, play all videos
            const videos = sectionRef.current.querySelectorAll("video");
            videos.forEach((video) => {
              video.play().catch((error) => {
                console.log("Video playback failed:", error);
              });
            });
            // Stop observing once videos start playing
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-6xl font-light text-center mb-8">
          Real Repair Stories, Real Joy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Video */}
              <div className="relative mb-4 w-94">
                <video
                  className="w-full h-100 object-cover" // Increased height to h-80
                  muted
                  loop
                  playsInline
                  style={{
                    border: "none",
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                >
                  <source src={review.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Name Overlay */}
                <div className="absolute top-2 left-2  bg-opacity-50 text-white text-sm font-semibold px-2 py-1">
                  @{review.name}
                </div>
                {/* Product Image at Bottom Left */}
                {/* <img
                  src={review.productImage}
                  alt={review.name}
                  className="absolute top-8 left-2 w-16 h-20 object-contain" // Smaller size, positioned at bottom left
                /> */}

                {/* Comment Below */}
                <div className="flex w-full items-center justify-between bg-purple-200">
                  <img
                    src={review.productImage}
                    alt={review.name}
                    style={{
                      border: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "6px",
                    }}
                    className=" left-2 w-36 h-39 object-contain" // Smaller size, positioned at bottom left
                  />
                  <div>
                    <p className="text-semibold text-gray-600 text-left italic w-4/5">
                      {review.comment}
                    </p>
                    <p>{review.name}</p>
                  </div>
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

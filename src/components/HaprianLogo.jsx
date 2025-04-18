// import React from "react";

// const Logo = () => {
//   return (
//     <div className="flex items-baseline space-x-1">
//       <span className="text-3xl font-extrabold text-purple-600 tracking-tight">
//         Haprian
//       </span>
//       <span className="text-lg font-medium text-purple-400">Naturals</span>
//     </div>
//   );
// };

// export default Logo;

import React from "react";

const HaprianLogo = ({ className }) => {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative">
        {/* Leaf element */}
        <div className="absolute -top-5 left-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C10 8 8 10 4 12C8 14 10 16 12 20C14 16 16 14 20 12C16 10 14 8 12 4Z"
              fill="#24349c"
              stroke="#24349c"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Main text */}
        <div className="flex items-end">
          <h1 className="font-serif italic font-bold text-3xl text-[#24349c]">
            Haprian
          </h1>
          <div className="ml-1 mb-1">
            <p className="font-sans text-xl text-[#8cc63f] font-medium">
              naturals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaprianLogo;

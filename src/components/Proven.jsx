import React from "react";

const ScientificallyProven = () => {
  return (
    <div className="py-12 bg-[#F5F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl text-[#1A3C34] font-['Playfair_Display'] font-bold text-center uppercase mb-8">
          Scientifically Proven, Backed by Data
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before/After Images */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
              <img
                src="https://via.placeholder.com/200x300?text=Before"
                alt="Before"
                className="w-1/2 rounded-md"
              />
              <img
                src="https://via.placeholder.com/200x300?text=After"
                alt="After"
                className="w-1/2 rounded-md"
              />
            </div>
            <h3 className="text-2xl text-[#1A3C34] font-medium text-center">
              2x Stronger Hair, 90% Less Breakage
            </h3>
            <p className="text-sm text-gray-600 text-center">
              *Complete SOS system vs untreated hair. Instant 4-week results.
            </p>
          </div>

          {/* Text and Benefits */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl text-[#1A3C34] font-medium mb-4">
              Results on wavy, highlighted hair
            </h3>
            <p className="text-gray-700 mb-4">
              “The SOS Repair saved my strands! My ends felt so much healthier,
              my frizz is under control, and split ends are gone. My hair feels
              softer, shinier, and stronger.”
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Wavy
              </span>
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Curly
              </span>
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Coily
              </span>
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Thin
              </span>
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Thick
              </span>
              <span className="px-3 py-1 bg-[#D4E4D8] text-[#1A3C34] rounded-full text-sm">
                Heat-Styled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificallyProven;

import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4 space-y-4 w-60 md:w-full">
      <div className="bg-gray-200 h-40 w-full rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mt-2"></div>
    </div>
  );
};

export default SkeletonCard;

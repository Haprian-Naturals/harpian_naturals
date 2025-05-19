import React from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-50 bg-[#ECF4EC] border border-[#A2C79A] text-[#375B2B] px-4 py-2 rounded shadow-md animate-fade-in-out flex items-center justify-between space-x-2">
      <span>{message}</span>
      <button onClick={onClose} className="text-lg font-bold leading-none">
        ×
      </button>
    </div>
  );
};

export default Toast;

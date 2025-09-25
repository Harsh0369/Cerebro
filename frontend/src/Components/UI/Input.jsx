import React from "react";

export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-200">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg bg-gray-900 text-gray-100 
          placeholder-gray-500
          border ${error ? "border-red-500" : "border-gray-700"} 
          focus:outline-none focus:ring-2 
          ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"} 
          transition-all duration-200 ease-in-out
          ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}

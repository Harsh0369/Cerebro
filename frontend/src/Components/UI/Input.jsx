import React from "react";

export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

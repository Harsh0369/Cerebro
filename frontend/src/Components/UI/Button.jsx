import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`relative inline-flex items-center justify-center px-5 py-2.5 
        rounded-lg font-medium tracking-wide text-white
        bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600
        hover:from-indigo-400 hover:via-indigo-500 hover:to-purple-500
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

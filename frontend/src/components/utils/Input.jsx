import React from 'react';

// Input Component
export const Input = ({ id, name, type, value, className = "", disabled = false, placeholder, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      className={`w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      } ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

// Textarea Component
export const Textarea = ({ id, name, value, className = "", placeholder, onChange }) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      className={`w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200 resize-none ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      rows="4"
    />
  );
};

// Default Export (Input)
export default Input;
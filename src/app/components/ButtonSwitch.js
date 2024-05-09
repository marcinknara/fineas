import React from 'react';

const ButtonSwitch = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <span className="text-white text-sm font-bold mr-4">{label}</span>
      <button
        className={`mr-2 px-4 py-2 rounded ${value === "Y" ? "bg-green-500" : "bg-gray-300"}`}
        onClick={() => onChange("Y")}
      >
        Yes
      </button>
      <button
        className={`px-4 py-2 rounded ${value === "N" ? "bg-red-500" : "bg-gray-300"}`}
        onClick={() => onChange("N")}
      >
        No
      </button>
    </div>
  );
};

export default ButtonSwitch;

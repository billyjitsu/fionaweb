import React from "react";

const Button = () => {
  return (
    <div className="flex space-x-2 justify-center">
      <div>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          Warning
        </button>
      </div>
    </div>
  );
};

export default Button;

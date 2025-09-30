import React, { useState, useEffect } from "react";

function App() {
  const [bgColor, setBgColor] = useState("white");

  const changeColor = () => {
    // Generate a random hex color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  // Apply background color to body
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <div className="flex flex-col justify-center items-center h-screen transition-colors duration-500">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
      </h1>
      <button
        onClick={changeColor}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 aligning-center"
      >
        Change Color
      </button>
    </div>
  );
}

export default App;

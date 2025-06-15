// src/components/BackgroundWrapper.jsx

import React from "react";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Lottie 
          animationData={homeBgAnimation} 
          loop={true} 
          className="w-full h-full object-cover opacity-20 blur-sm" 
        />

        {/* Optional Overlay for smoothness */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-blue-100/30 backdrop-blur-sm"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;

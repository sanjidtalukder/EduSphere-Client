import React from "react";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* 🔵 Background Animation */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Lottie
          animationData={homeBgAnimation}
          loop
          className="w-full h-full object-cover opacity-25 blur-[2px] md:blur-sm"
        />

        {/* 🌤 Overlay for soft readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-blue-200/40 backdrop-blur-[2px] md:backdrop-blur-sm"></div>
      </div>

      {/* 🔷 Foreground Content */}
      <main
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
      >
        {children}
      </main>
    </div>
  );
};

export default BackgroundWrapper;

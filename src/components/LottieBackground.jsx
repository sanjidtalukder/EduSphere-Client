// src/components/LottieBackground.jsx
import React from "react";
import Lottie from "lottie-react";

const LottieBackground = ({ animationData, className = "", loop = true, autoplay = true, opacity = 0.3 }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={`absolute inset-0 w-full h-full object-cover z-0 opacity-[${opacity}] ${className}`}
    />
  );
};

export default LottieBackground;

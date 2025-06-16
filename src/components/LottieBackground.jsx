// src/components/LottieBackground.jsx
import React from "react";
import Lottie from "lottie-react";

const LottieBackground = ({
  animationData,
  className = "",
  loop = true,
  autoplay = true,
  opacity = 0.3,
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full z-[-1] pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LottieBackground;

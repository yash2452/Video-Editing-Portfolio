import React, { useState } from "react";

const HeroSection = () => {
  const [bgAnimation, setBgAnimation] = useState("none"); // Example only

  return (
    <section className="relative">
      {/* Animation backgrounds */}
      {bgAnimation === "particles" && (
        <div className="absolute inset-0 z-0">
          {/* Render particles animation here */}
        </div>
      )}
      {bgAnimation === "waves" && (
        <div className="absolute inset-0 z-0">
          {/* Render waves animation here */}
        </div>
      )}
      {bgAnimation === "gradient" && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient" />
      )}
      {bgAnimation === "bubbles" && (
        <div className="absolute inset-0 z-0">
          {/* Render bubbles animation here */}
        </div>
      )}
      {bgAnimation === "stars" && (
        <div className="absolute inset-0 z-0">
          {/* Render stars animation here */}
        </div>
      )}
      <div className="relative z-10">
        {/* ...existing hero/showreel content... */}
      </div>
    </section>
  );
};

export default HeroSection;
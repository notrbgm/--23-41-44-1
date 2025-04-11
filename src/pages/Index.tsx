import React from "react";

const TopTenHeader = () => {
  return (
    <div className="group relative mb-6 flex items-center">
      {/* Main Title */}
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-white">Top</span>
        
        {/* Styled "10" with overlapping digits */}
        <div className="relative mx-2">
          {/* Digit "1" */}
          <span 
            className="text-[40px] font-black leading-none text-gray-800/80 transition-colors duration-300 
                       group-hover:text-red-600"
            style={{
              WebkitTextStroke: "2px #DC2626",
              textShadow: "0 0 8px #DC2626",
              position: "relative",
              zIndex: 10,
            }}
          >
            1
          </span>
          
          {/* Digit "0" - overlapped */}
          <span 
            className="text-[40px] font-black leading-none text-gray-800/80 transition-colors duration-300 
                       group-hover:text-red-600"
            style={{
              WebkitTextStroke: "2px #DC2626",
              textShadow: "0 0 8px #DC2626",
              position: "relative",
              left: "-0.35em", // Adjust this for perfect overlap
            }}
          >
            0
          </span>
        </div>

        <span className="text-3xl font-bold text-white">Today</span>
      </div>

      {/* Optional: Add the red glow effect on hover */}
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div 
          className="absolute inset-0 blur-sm"
          style={{
            background: "radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default TopTenHeader;

'use client';
import React, { useEffect, useState } from 'react';

const words = [
  'Transparency',
  'Equity',
  'Accountability',
  'Innovation',
  'Education',
  'Justice',
  'Real-Time Feedback'
];

const Jumbotron = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full h-[60vh] items-center justify-center bg-black">
      {/* Left Video Panel */}
      <div
        className="w-1/3 h-full transform -skew-y-[22.5deg] overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover skew-y-[22.5deg]"
        >
          <source src="/left.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Center Ticker Box */}
      <div className="w-1/3 h-full flex items-center justify-center bg-gradient-to-b from-gray-600 to-gray-800">
        <div className="text-center text-3xl font-bold text-gray-100 animate-pulse px-4">
          {words[currentIndex]}
        </div>
      </div>

      {/* Right Video Panel */}
      <div
        className="w-1/3 h-full transform skew-y-[22.5deg] overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover -skew-y-[22.5deg]"
        >
          <source src="/right.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Jumbotron;

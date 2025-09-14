import { useState, useEffect } from "react";

const HeroCarousel = () => {
  const slides = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "code", // slide spéciale avec bloc code
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {slide === "code" ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 p-6">
              <pre className="text-green-400 font-mono text-sm rounded-lg w-[80%] max-w-2xl">
{`import React from "react";

export default function App() {
  return (
    <div className="hero">
      <h1>Bienvenue sur mon site 🚀</h1>
    </div>
  );
}`}
              </pre>
            </div>
          ) : (
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {/* Navigation boutons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

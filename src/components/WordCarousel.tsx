import React from "react";

const WordCarousel: React.FC = () => {
  const words = [
    "1. WWDC",
    "2. Practical Magic",
    "3. EPP",
    "4. Dragon Boat Festival",
    "5. NBA",
    "6. Mavericks vs Celtics",
    "7. India vs Pakistan",
    "8. Carlos Alcaraz",
    "9. Black Ops 6",
    "10. Luka Doncic",
  ];

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Currently trending keywords</h2>
      <div className="carousel">
        <div className="carousel-inner">
          {words.map((word, index) => (
            <span key={index} className="carousel-word">
              {word}
            </span>
          ))}
          {words.map((word, index) => (
            <span key={`duplicate-${index}`} className="carousel-word">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCarousel;

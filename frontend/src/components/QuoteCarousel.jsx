import React, { useState, useEffect } from "react";


// List of quotes
const quotes = [
  {
    quote:
      "“The very existence of libraries affords the best evidence that we may yet have hope for the future of man”",
    author: "― T.S. Eliot",
  },
  {
    quote: "“Libraries are the true universities of the poor”",
    author: "―  Charles B. Fee",
  },
  {
    quote: "“Without libraries what have we? We have no past and no future.”",
    author: "―  Ray Bradbury",
  },
  {
    quote:
      "“A library card is the most important key a person can hold in a hand.”",
    author: "― Barbara Kingsolver",
  },
  {
    quote:
      "“Libraries store the energy that fuels the imagination. They open up windows to the world and inspire us to explore and achieve, and contribute to improving our quality of life.”",
    author: "― Sidney Sheldon",
  },
  {
    quote: "“A library is not a luxury but one of the necessities of life.”",
    author: "― Henry Ward Beecher",
  },
  {
    quote: "“I have always imagined that Paradise will be a kind of library.”",
    author: "― Jorge Luis Borges",
  },
  { quote: "“When in doubt go to the library.”", author: "― J.K. Rowling" },
  {
    quote:
      "“The only thing that you absolutely have to know, is the location of the library.”",
    author: "― Albert Einstein",
  },
  {
    quote:
      "“A library is the delivery room for the birth of ideas, a place where history comes to life.”",
    author: "― Norman Cousins",
  },
  // Add more quotes here
];


const QuoteCarousel = () => {
  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % quotes.length;
      setCurrentQuote(quotes[newIndex]);
      setCurrentIndex(newIndex);
    }, 5000); // Change interval (in milliseconds) to adjust speed

    return () => clearInterval(intervalId);
  }, [currentIndex, quotes.length]); // Update effect on quote or index change

  const handleDotClick = (index) => {
    setCurrentQuote(quotes[index]);
    setCurrentIndex(index);
  };

  return (
    <>
      <label className="text-[18px] animate-pulse">{currentQuote.quote}</label>
      <div className="flex flex-row justify-between w-full">
        {" "}
        {/* Flexbox for layout */}
        <div className="flex flex-grow">
          {" "}
          {/* Flexible space for quote */}
          {/* Replace with your quote content rendering logic */}
        </div>
        <label className="text-xl justify-end">{currentQuote.author}</label>{" "}
        {/* Author name at end */}
      </div>
      <div className="flex justify-center absolute bottom-4">
        {" "}
        {/* Dots at bottom */}
        {quotes.map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-full mx-1 ${
              currentIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default QuoteCarousel;

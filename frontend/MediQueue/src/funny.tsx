import React, { useState } from "react";

// Array of images and corresponding sounds
const assets = [
  { image: "/image2.jpg", sound: "/sound4.mp3" },
  { image: "/image1.webp", sound: "/sound7.mp3" },
  { image: "/image3.jpg", sound: "/sound8.mp3" },
  { image: "/image4.jpg", sound: "/sound10.mp3" },
  { image: "/image5.jpg", sound: "/sound11.mp3" },
  { image: "/image6.jpg", sound: "/sound4.mp3" }
];

const Funny: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    // Play the current sound
    const audio = new Audio(assets[currentIndex].sound);
    audio.play();

    // Move to the next image/sound, cycling back to the start
    setCurrentIndex((prevIndex) => (prevIndex + 1) % assets.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Click the Image</h1>
      <img
        src={assets[currentIndex].image}
        alt="Cycling visual"
        className="w-64 h-64 object-cover cursor-pointer rounded shadow-lg"
        onClick={handleClick}
      />
    </div>
  );
};

export default Funny;

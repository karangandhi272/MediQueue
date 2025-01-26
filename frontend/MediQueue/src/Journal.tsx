import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const prompts = [
  "What are you feeling in this moment?",
  "What's one small thing you wish for right now?",
  "Describe the last time someone showed you kindness.",
  "What's one thing you can do to make yourself comfortable here?",
  "Think of a loved one. What would they tell you now?",
  "Imagine you're writing a letter to your future self. What would it say?",
  "What is one thing you're proud of today?",
  "What's one thing you've learned about yourself recently?",
  "What's a memory that makes you feel safe?",
  "If you could hear the words you need most, what would they be?",
  "What's a small act of self-care you can practice while waiting?",
  "Think of a calming place. What sights, sounds, and smells are there?",
  "What's a comforting phrase you can repeat to yourself?",
  "What's something you've done that you didn't think you could?",
  "If you could give advice to someone in your position, what would it be?",
  "What's one positive thought you can hold onto right now?",
  "Describe a time when you overcame a challenge.",
  "What's one thing that makes you unique?",
  "Think of a favorite story or book. What do you love about it?",
  "What does it mean to you to be strong?",
];

export default function Journal() {
  const [prompt, setPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [response, setResponse] = useState("");
  const [animatedWords, setAnimatedWords] = useState<string[][]>([]);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);

  const stars = useMemo(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 3
    })), 
  []);

  const handleResponseSubmit = () => {
    if (!response.trim()) return;

    const words = response.trim().split(" ");
    setAnimatedWords([words]);
    setResponse("");
    setShowBlackHole(true);

    const absorptionDuration = words.length * 0.3 + 2;

    setTimeout(() => {
      setShowBlackHole(false);
      setShowComment(true);
      setTimeout(() => {
        setShowComment(false);
        setShowNextPrompt(true);
        setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
        setTimeout(() => setShowNextPrompt(false), 1000);
      }, 4000);
    }, absorptionDuration * 1000);
  };

  const calculateBlackHoleSize = () => {
    const totalWords = animatedWords.flat().length;
    return Math.min(100 + totalWords * 10, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {!showBlackHole ? (
        <div className="relative w-full max-w-4xl text-center z-10">
          <motion.h1
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Cosmic Contemplation
          </motion.h1>
          <motion.p
            className="text-xl text-purple-100 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {prompt}
          </motion.p>
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <textarea
              placeholder="Your thoughts are floating in space..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full bg-transparent text-white text-xl p-10 outline-none resize-none border-purple-100 focus:border-purple-500 placeholder-opacity-50 placeholder-purple-100"
              style={{ caretColor: "#ffffff" }}
            />
          </motion.div>
          <Button
            onClick={handleResponseSubmit}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div
            className="absolute bg-black rounded-full z-30"
            style={{
              width: `${calculateBlackHoleSize()}px`,
              height: `${calculateBlackHoleSize()}px`,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.5, 2], opacity: [1, 1, 1] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {animatedWords.map((wordGroup, groupIndex) =>
              wordGroup.map((word, wordIndex) => (
                <motion.span
                  key={`${groupIndex}-${wordIndex}`}
                  initial={{
                    opacity: 1,
                    scale: 1,
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    opacity: [1, 0.8, 0.6, 0],
                    scale: [1, 0.9, 0.7, 0.5],
                    top: "50%",
                    left: "50%",
                  }}
                  transition={{ duration: 1.5, delay: wordIndex * 0.3 }}
                  className="text-sm font-semibold text-white absolute"
                  style={{
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  {word}
                </motion.span>
              ))
            )}
          </motion.div>
          <motion.div
            className="absolute z-40"
            style={{
              width: `${calculateBlackHoleSize() * 1.5}px`,
              height: `${calculateBlackHoleSize() * 1.5}px`,
              background: "radial-gradient(circle, rgba(72,61,139,1) 0%, rgba(123,104,238,1) 50%, rgba(147,112,219,1) 100%)",
              borderRadius: "50%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.3],
              scale: [1, 4, 6],
            }}
            transition={{ duration: 6, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-12 text-center w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-xl font-medium text-gray-300">
              Take a deep breath, relax, and let your thoughts drift away into the abyss...
            </p>
          </motion.div>
        </div>
      )}

      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          ></motion.div>
        ))}
      </div>

      {showComment && (
        <motion.div
          className="absolute bottom-16 text-white p-4 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          "Your thoughts are now part of the cosmic tapestry."
        </motion.div>
      )}
    </div>
  );
}
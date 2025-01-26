import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

interface BreathworkType {
  name: string;
  inhaleDuration: number;
  exhaleDuration: number;
  holdDuration?: number;
  description: string;
}

const breathworkExercises: BreathworkType[] = [
  {
    name: "Box Breathing",
    inhaleDuration: 4,
    holdDuration: 4,
    exhaleDuration: 4,
    description: "Equal duration inhale, hold, exhale for stress relief"
  },
  {
    name: "4-7-8 Breathing",
    inhaleDuration: 4,
    holdDuration: 7,
    exhaleDuration: 8,
    description: "Calming breath pattern to reduce anxiety and aid sleep"
  },
  {
    name: "Resonant Breathing",
    inhaleDuration: 5,
    exhaleDuration: 5,
    description: "Balanced breathing at 6 breaths per minute"
  }
];

export default function Breathwork() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const waveVariants = (inhaleDuration: number) => ({
    animate: {
      d: [
        "M 0 50 Q 25 30, 50 50 T 100 50",
        "M 0 50 Q 25 70, 50 50 T 100 50", 
        "M 0 50 Q 25 30, 50 50 T 100 50"
      ],
      transition: {
        duration: inhaleDuration /2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-200 flex flex-col overflow-auto">
      <h1 className="text-4xl font-bold text-gray-800 p-8 text-center">Breathwork Exercises</h1>
      
      <div className="flex flex-wrap justify-center gap-6 p-8 overflow-y-auto">
      {breathworkExercises.map((exercise, index) => (
        <Card 
        key={index}
        onClick={() => {
          if (hoveredCard !== null) {
            navigate('/breath', { state: { exercise: breathworkExercises[hoveredCard] } });
          }
          }}
        className="p-6 relative overflow-hidden group hover:shadow-xl transition-shadow"
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        >
            <h2 className="text-xl font-semibold mb-3">{exercise.name}</h2>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            
            <svg
              viewBox="0 0 100 100"
              className="w-full h-24 mt-4"
            >
              <motion.path
                fill="none"
                stroke={hoveredCard === index ? "#4F46E5" : "#93C5FD"}
                strokeWidth="4"
                variants={waveVariants(exercise.inhaleDuration)}
                animate="animate"
              />
            </svg>

            <div className="mt-4 text-sm text-gray-500">
              <p>Inhale: {exercise.inhaleDuration}s</p>
              {exercise.holdDuration && <p>Hold: {exercise.holdDuration}s</p>}
              <p>Exhale: {exercise.exhaleDuration}s</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-8 text-center">
        <Button 
         
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Back
        </Button>
      </div>
    </div>
  );
}


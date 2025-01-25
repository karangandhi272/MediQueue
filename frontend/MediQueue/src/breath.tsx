import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

interface BreathworkType {
  name: string;
  inhaleDuration: number;
  exhaleDuration: number; 
  holdDuration?: number;
  description: string;
}

export default function Breath() {
  const navigate = useNavigate();
  const location = useLocation();
  const exercise = location.state?.exercise as BreathworkType;

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">No exercise selected</h1>
        <Button onClick={() => navigate('/breathwork')}>
          Return to Exercises
        </Button>
      </div>
    );
  }

  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(exercise.inhaleDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          if (phase === 'inhale') {
            setPhase(exercise.holdDuration ? 'hold' : 'exhale');
            return exercise.holdDuration || exercise.exhaleDuration;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return exercise.exhaleDuration;
          } else {
            setPhase('inhale');
            return exercise.inhaleDuration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, exercise]);

  const circleVariants: Variants = {
    inhale: {
      scale: [1, 1.5],
      opacity: [0.2, 1],
      transition: {
        duration: exercise.inhaleDuration,
        ease: "easeInOut"
      }
    },
    hold: {
      scale: 1.5,
      opacity: 1,
      transition: {
        duration: exercise.holdDuration || 0,
        ease: "linear"
      }
    },
    exhale: {
      scale: [1.5, 1],
      opacity: [1, 0.2],
      transition: {
        duration: exercise.exhaleDuration,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#543ab7] to-[#00acc1] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-white mb-12 relative z-10 font-lato tracking-wider">
        {phase}
      </h1>

      <div className="text-center mb-16 relative z-10">
        <div className="text-8xl font-bold text-white mb-4 font-lato">
          {timer}
        </div>
      </div>

      <div className="relative w-64 h-64">
        <motion.div
          className="w-full h-full rounded-full bg-white/30 absolute"
          initial={{ scale: 1, opacity: 0.2 }}
          animate={phase}
          variants={circleVariants}
        />
        <div className="w-full h-full rounded-full border-4 border-white/50 absolute" />
      </div>

      <Button 
        onClick={() => navigate('/breathwork')}
        className="absolute bottom-8 right-8 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 md:text-lg sm:text-base text-sm"
      >
        ← Back
      </Button>
    </div>
  );
}

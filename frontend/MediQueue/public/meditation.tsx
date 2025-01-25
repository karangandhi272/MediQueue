import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Waves } from "lucide-react"

interface Word {
  text: string
  timestamp: number
}

const meditationScript: Word[] = [
  { text: "Take", timestamp: 0 },
  { text: "a", timestamp: 0.5 },
  { text: "deep", timestamp: 1 },
  { text: "breath", timestamp: 1.5 },
  { text: "in", timestamp: 2 },
  { text: "through", timestamp: 2.5 },
  { text: "your", timestamp: 3 },
  { text: "nose", timestamp: 3.5 },
  { text: "and", timestamp: 4 },
  { text: "feel", timestamp: 4.5 },
  { text: "the", timestamp: 5 },
  { text: "ocean", timestamp: 5.5 },
  { text: "waves", timestamp: 6 },
  { text: "guide", timestamp: 6.5 },
  { text: "you", timestamp: 7 },
]

export default function Meditation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const totalDuration = 180 // 3 minutes in seconds

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    let interval: NodeJS.Timeout

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime
      const wordIndex = meditationScript.findIndex(
        (word, index) => {
          const nextWord = meditationScript[index + 1]
          return currentTime >= word.timestamp && 
                 (!nextWord || currentTime < nextWord.timestamp)
        }
      )
      setCurrentWordIndex(wordIndex)
      setProgress((currentTime / totalDuration) * 100)
    }

    if (isPlaying) {
      audio.play()
      interval = setInterval(handleTimeUpdate, 100)
    } else {
      audio.pause()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setProgress(100)
    })

    return () => {
      clearInterval(interval)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 flex flex-col items-center justify-center p-8">
      {/* Animated Wave Background */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center opacity-20">
        <Waves className="w-full h-full animate-pulse text-white" />
      </div>

      {/* Progress Ring */}
      <div className="relative w-64 h-64 mb-12 backdrop-blur-sm bg-white/10 rounded-full p-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 48}`}
            strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
            className="transition-all duration-200"
          />
        </svg>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center text-white text-6xl hover:scale-110 transition-transform"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      {/* Meditation Text */}
      <div className="max-w-2xl text-center space-y-4 backdrop-blur-sm bg-white/10 p-8 rounded-3xl">
        <p className="text-3xl text-white leading-relaxed">
          {meditationScript.map((word, index) => (
            <span
              key={index}
              className={cn(
                "mx-1 transition-all duration-300",
                currentWordIndex === index && "text-blue-200 scale-110 inline-block font-bold"
              )}
            >
              {word.text}
            </span>
          ))}
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/meditation.mp3"  // Note the leading slash
        className="hidden"
      />
    </div>
  )
}

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Wind, Users, ChevronLeft, ChevronRight, Headphones, LaughIcon, HelpCircle,Book, ImageIcon } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const audioRef = useRef(new Audio("/soundtrack.mp3"))
  const [isPlaying, setIsPlaying] = useState(false);

  const menuItems = [
    {
      title: "Queue",
      icon: Users,
      path: "/queue"
    },
    {
      title: "Breathwork",
      icon: Wind,
      path: "/breathwork"
    },
    {
      title: "FAQ",
      icon: HelpCircle,
      path: "/faq"
    },
    {
      title: "Journal",
      icon: Book,
      path: "/Journal"
    },
    {
      title: "Gallery",
      icon: ImageIcon,
      path : "/gallery"
    }
      
  ]

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={cn(
        "relative pb-12 min-h-screen transition-all duration-300 bg-gradient-to-b from-blue-400 to-blue-600 fixed -ml-1.5",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className={cn(
            "mb-6 px-4 text-lg font-semibold tracking-tight transition-all duration-300 text-white",
            isCollapsed && "opacity-0"
          )}>
            MediQueue
          </h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full text-white hover:bg-blue-500/50 rounded-xl",
                  isCollapsed ? "justify-center" : "justify-start",
                  location.pathname === item.path && "bg-blue-700/50"
                )}
                onClick={() => navigate(item.path)}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  !isCollapsed && "mr-2"
                )} />
                {!isCollapsed && item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg p-0"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMusic}
        className="absolute bottom-4 left-1/2 -translate-x-5 h-12 w-12  rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg p-0"
        >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </Button>
    </div>
  )
}

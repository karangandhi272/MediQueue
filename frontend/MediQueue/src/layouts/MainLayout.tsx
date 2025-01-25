import { Sidebar } from "@/sidebar"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar className="shrink-0 z-20" />
      <main className={cn("flex-1 transition-all duration-300 z-10", className)}>
        {children}
      </main>
    </div>
  )
} 
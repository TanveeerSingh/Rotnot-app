"use client"

import { Home, Bell, BarChart3, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onNavigate: (screen: string) => void
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "alerts", icon: Bell, label: "Alerts" },
    { id: "report", icon: BarChart3, label: "Analytics" },
    { id: "profile", icon: User, label: "Profile" },
  ]
  
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border px-4 py-2 pb-6">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

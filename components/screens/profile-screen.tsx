"use client"

import { motion } from "framer-motion"
import { User, Bell, HelpCircle, LogOut, ChevronRight, Wifi } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface ProfileScreenProps {
  onNavigate: (screen: string) => void
  userName?: string
}

const menuItems = [
  { icon: Bell, label: "Notifications", value: "On" },
  { icon: Wifi, label: "Connected Devices", value: "1" },
  { icon: HelpCircle, label: "Help & Support" },
]

export function ProfileScreen({ onNavigate, userName = "Tanveer" }: ProfileScreenProps) {
  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
      </div>
      
      <div className="flex-1 px-5 pb-20 overflow-y-auto">
        {/* User info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-semibold">{userName}</p>
            <p className="text-muted-foreground text-sm">{userName.toLowerCase().replace(/\s+/g, '')}@email.com</p>
          </div>
        </motion.div>
        
        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="w-full bg-card rounded-xl p-3 border border-border flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-foreground text-sm flex-1 text-left">{item.label}</span>
              {item.value && (
                <span className="text-muted-foreground text-xs">{item.value}</span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </motion.div>
        
        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log Out</span>
        </motion.button>
      </div>
      
      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  )
}

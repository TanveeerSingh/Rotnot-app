"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface AlertsScreenProps {
  onNavigate: (screen: string) => void
}

const alerts = [
  {
    id: 1,
    type: "danger",
    title: "Banana spoiled",
    message: "Item has spoiled - 0 days left",
    time: "1h ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Apple expiring soon",
    message: "About 2 days of freshness left",
    time: "3h ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Strawberries fresh",
    message: "Good for another 4 days",
    time: "Yesterday",
    read: true,
  },
]

function getAlertIcon(type: string) {
  switch (type) {
    case "warning": return AlertTriangle
    case "danger": return AlertTriangle
    case "success": return CheckCircle2
    default: return Clock
  }
}

function getAlertStyles(type: string) {
  switch (type) {
    case "warning": return "bg-yellow-500/10 text-yellow-500"
    case "danger": return "bg-red-500/10 text-red-500"
    case "success": return "bg-primary/10 text-primary"
    default: return "bg-muted text-muted-foreground"
  }
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const unreadCount = alerts.filter(a => !a.read).length
  
  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Alerts</h1>
          <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
        </div>
        <button className="text-primary text-xs font-medium">Mark all read</button>
      </div>
      
      <div className="flex-1 px-5 pb-20 overflow-y-auto">
        {/* New alerts */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2">New</h3>
            <div className="space-y-2">
              {alerts.filter(a => !a.read).map((alert, i) => {
                const Icon = getAlertIcon(alert.type)
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-card rounded-xl p-3 border border-border"
                  >
                    <div className="flex gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getAlertStyles(alert.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-0.5">
                          <p className="text-foreground font-medium text-sm truncate">{alert.title}</p>
                        </div>
                        <p className="text-muted-foreground text-xs">{alert.message}</p>
                        <p className="text-muted-foreground/60 text-[10px] mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
        
        
      </div>
      
      <BottomNav activeTab="alerts" onNavigate={onNavigate} />
    </div>
  )
}

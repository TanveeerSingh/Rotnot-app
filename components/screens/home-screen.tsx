"use client"

import { motion } from "framer-motion"
import { Droplets, Thermometer, Wind } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface HomeScreenProps {
  onNavigate: (screen: string) => void
  userName?: string
}

const foodItems = [
  { name: "Strawberries", status: "fresh", freshness: 92, daysLeft: 4 },
  { name: "Apple", status: "moderate", freshness: 55, daysLeft: 2 },
  { name: "Banana", status: "spoiled", freshness: 15, daysLeft: 0 },
]

function getStatusColor(status: string) {
  switch (status) {
    case "fresh": return "bg-primary text-primary-foreground"
    case "moderate": return "bg-yellow-500 text-white"
    case "spoiled": return "bg-red-500 text-white"
    default: return "bg-muted text-muted-foreground"
  }
}

function getProgressColor(status: string) {
  switch (status) {
    case "fresh": return "bg-primary"
    case "moderate": return "bg-yellow-500"
    case "spoiled": return "bg-red-500"
    default: return "bg-muted"
  }
}

export function HomeScreen({ onNavigate, userName = "Tanveer" }: HomeScreenProps) {
  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <p className="text-muted-foreground text-xs">Good morning,</p>
        <h1 className="text-xl font-semibold text-foreground">{userName}</h1>
      </div>
      
      <div className="flex-1 px-5 pb-20 overflow-y-auto">
        {/* Items tracked - full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl p-4 border border-border mb-3"
        >
          <p className="text-3xl font-bold text-foreground">4</p>
          <p className="text-muted-foreground text-xs">Items tracked</p>
        </motion.div>

        {/* Sensor cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid grid-cols-3 gap-2 mb-4"
        >
          <div className="bg-card rounded-xl p-3 border border-border">
            <div className="w-6 h-6 bg-foreground/10 rounded-lg flex items-center justify-center mb-1">
              <Thermometer className="w-3 h-3 text-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">4°C</p>
            <p className="text-muted-foreground text-[10px]">Temp</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border">
            <div className="w-6 h-6 bg-foreground/10 rounded-lg flex items-center justify-center mb-1">
              <Droplets className="w-3 h-3 text-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">62%</p>
            <p className="text-muted-foreground text-[10px]">Humidity</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border">
            <div className="w-6 h-6 bg-foreground/10 rounded-lg flex items-center justify-center mb-1">
              <Wind className="w-3 h-3 text-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">Good</p>
            <p className="text-muted-foreground text-[10px]">Air Quality/VOC</p>
          </div>
        </motion.div>
        
        {/* Food items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground font-semibold text-sm">Fruits & Vegetables</h2>
            <button className="text-primary text-xs font-medium">See all</button>
          </div>
          
          <div className="space-y-2">
            {foodItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="bg-card rounded-xl p-3 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-foreground font-medium text-sm">{item.name}</p>
                  <div className="flex flex-col items-end">
                    <span className="text-foreground font-semibold text-sm">{item.freshness}% freshness</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${getStatusColor(item.status)}`}>
                      {item.daysLeft} days left
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(item.status)}`}
                    style={{ width: `${item.freshness}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  )
}

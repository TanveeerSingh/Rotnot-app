"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { BottomNav } from "./bottom-nav"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"

interface ReportScreenProps {
  onNavigate: (screen: string) => void
}

const weeklyData = [
  { day: "M", value: 65 },
  { day: "T", value: 80 },
  { day: "W", value: 75 },
  { day: "T", value: 90 },
  { day: "F", value: 70 },
  { day: "S", value: 85 },
  { day: "S", value: 78 },
]

const stats = [
  { label: "Items Tracked", value: "4", trend: "+1", positive: true },
  { label: "Waste Reduced", value: "2.4kg", trend: "-0.8kg", positive: true },
]

export function ReportScreen({ onNavigate }: ReportScreenProps) {
  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        <p className="text-xs text-muted-foreground">This week&apos;s overview</p>
      </div>
      
      <div className="flex-1 px-5 pb-20 overflow-hidden">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 border border-border mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground font-semibold text-sm">Freshness Trend</h2>
            <div className="flex items-center gap-1 text-primary text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>78%</span>
            </div>
          </div>
          
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 5, fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="text-foreground font-semibold text-sm mb-2">Statistics</h2>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl p-3 border border-border flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg" />
                <span className="text-foreground text-sm">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-semibold text-sm">{stat.value}</span>
                <div className={`text-[10px] font-medium ${stat.positive ? "text-primary" : "text-destructive"}`}>
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-primary/10 rounded-xl p-4"
        >
          <p className="text-foreground text-sm font-medium">Great job this week!</p>
          <p className="text-muted-foreground text-xs mt-1">
            You&apos;ve reduced food waste by 25% compared to last week.
          </p>
        </motion.div>
      </div>
      
      <BottomNav activeTab="report" onNavigate={onNavigate} />
    </div>
  )
}

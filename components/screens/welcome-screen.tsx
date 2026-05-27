"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="w-full h-full bg-background flex flex-col px-6 pt-14 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground tracking-tight">RotNot</h2>
      </motion.div>
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center"
      >
        <h1 className="text-3xl font-semibold text-foreground leading-tight tracking-tight text-balance">
          Never waste food again
        </h1>
        <p className="mt-3 text-muted-foreground text-base leading-relaxed">
          Smart sensors that monitor freshness and alert you before your produce spoils.
        </p>
        
        {/* Features */}
        <div className="mt-8 space-y-3">
          {[
            { title: "Real-time monitoring", desc: "Track freshness 24/7" },
            { title: "Smart alerts", desc: "Get notified before spoilage" },
            { title: "Reduce waste", desc: "Save money & the planet" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{feature.title}</p>
                <p className="text-muted-foreground text-xs">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button 
          onClick={onContinue}
          className="w-full h-12 text-sm font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

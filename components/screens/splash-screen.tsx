"use client"

import { useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete()
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="splash-screen">
      <div className="content">
        <h1 className="logo">rotnot</h1>

        <p className="tagline">Freshness, simplified.</p>
      </div>
    </div>
  )
}
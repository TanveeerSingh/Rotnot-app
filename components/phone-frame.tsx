"use client"

import type { ReactNode } from "react"

interface PhoneFrameProps {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[320px] h-[640px] bg-card rounded-[2.5rem] shadow-2xl border-[6px] border-foreground/10 overflow-hidden">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-foreground rounded-full z-50" />
      
      {/* Screen content */}
      <div className="w-full h-full overflow-hidden">
        {children}
      </div>
      
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/20 rounded-full" />
    </div>
  )
}

"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PhoneFrame } from "@/components/phone-frame"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { AuthScreen } from "@/components/screens/auth-screen"
import { ConnectDeviceScreen } from "@/components/screens/connect-device-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { AlertsScreen } from "@/components/screens/alerts-screen"
import { ReportScreen } from "@/components/screens/report-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"

type Screen = "welcome" | "auth" | "connect" | "home" | "alerts" | "report" | "profile"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [userName, setUserName] = useState<string>("Tanveer")
  
  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen)
  }

  const handleAuthContinue = (name: string) => {
    setUserName(name)
    setCurrentScreen("connect")
  }
  
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onContinue={() => setCurrentScreen("auth")} />
      case "auth":
        return (
          <AuthScreen 
            onBack={() => setCurrentScreen("welcome")} 
            onContinue={handleAuthContinue} 
          />
        )
      case "connect":
        return (
          <ConnectDeviceScreen 
            onBack={() => setCurrentScreen("auth")} 
            onContinue={() => setCurrentScreen("home")} 
          />
        )
      case "home":
        return <HomeScreen onNavigate={handleNavigate} userName={userName} />
      case "alerts":
        return <AlertsScreen onNavigate={handleNavigate} />
      case "report":
        return <ReportScreen onNavigate={handleNavigate} />
      case "profile":
        return <ProfileScreen onNavigate={handleNavigate} userName={userName} />
      default:
        return <WelcomeScreen onContinue={() => setCurrentScreen("auth")} />
    }
  }
  
  return (
    <main className="min-h-screen bg-secondary/30 flex items-center justify-center p-4 gap-4 overflow-hidden">
      {/* Screen navigation for desktop */}
      <div className="fixed top-6 left-6 hidden lg:flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">Navigate screens</p>
        {(["welcome", "auth", "connect", "home", "alerts", "report", "profile"] as Screen[]).map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize text-left ${
              currentScreen === screen 
                ? "bg-primary text-primary-foreground" 
                : "bg-card text-foreground hover:bg-secondary border border-border"
            }`}
          >
            {screen === "connect" ? "Connect Device" : screen === "auth" ? "Sign In" : screen === "report" ? "Analytics" : screen}
          </button>
        ))}
      </div>
      
      <PhoneFrame>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>
    </main>
  )
}

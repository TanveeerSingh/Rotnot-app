"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Scan, Wifi, CheckCircle2, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ConnectDeviceScreenProps {
  onBack: () => void
  onContinue: () => void
}

export function ConnectDeviceScreen({ onBack, onContinue }: ConnectDeviceScreenProps) {
  const [mode, setMode] = useState<"select" | "qr" | "manual">("select")
  const [isScanning, setIsScanning] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [deviceId, setDeviceId] = useState("")
  
  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setIsConnected(true)
    }, 2000)
  }
  
  const handleManualConnect = (e: React.FormEvent) => {
    e.preventDefault()
    if (deviceId.trim()) {
      setIsConnected(true)
    }
  }
  
  if (isConnected) {
    return (
      <div className="w-full h-full bg-background flex flex-col">
        <div className="flex items-center gap-3 px-5 pt-12 pb-3">
          <button 
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h2 className="text-base font-semibold text-foreground">Connect Device</h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            
            <h3 className="mt-4 text-lg font-semibold text-foreground">Connected!</h3>
            <p className="mt-1 text-muted-foreground text-sm text-center max-w-[200px]">
              Your sensor is now paired
            </p>
            
            <div className="mt-6 w-full bg-secondary rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">RotNot Sensor</p>
                    <p className="text-muted-foreground text-xs">RN-2024-X1</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary text-xs font-medium">Online</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={onContinue}
              className="mt-6 w-full h-11 text-sm font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue to Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-3">
        <button 
          onClick={mode === "select" ? onBack : () => setMode("select")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h2 className="text-base font-semibold text-foreground">Connect Device</h2>
          <p className="text-xs text-muted-foreground">Pair your RotNot sensor</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {mode === "select" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-3"
          >
            <button
              onClick={() => setMode("qr")}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Scan className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-foreground font-medium text-sm">Scan QR Code</p>
                <p className="text-muted-foreground text-xs">Quick and easy setup</p>
              </div>
            </button>
            
            <button
              onClick={() => setMode("manual")}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <Hash className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="text-foreground font-medium text-sm">Enter Device ID</p>
                <p className="text-muted-foreground text-xs">Manual connection</p>
              </div>
            </button>
          </motion.div>
        ) : mode === "qr" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
              
              {isScanning ? (
                <motion.div
                  animate={{ y: [-60, 60] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                  className="absolute w-36 h-0.5 bg-primary shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Scan className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-muted-foreground text-xs">Position QR code</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleScan}
              disabled={isScanning}
              className="mt-6 h-11 px-6 text-sm font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isScanning ? (
                <>
                  <Wifi className="w-4 h-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleManualConnect}
            className="w-full"
          >
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Device ID</label>
              <Input
                type="text"
                placeholder="e.g., RN-2024-XXXX"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="h-11 rounded-xl bg-secondary border-0 text-sm"
              />
              <p className="mt-2 text-muted-foreground text-xs">
                Find the device ID on the back of your sensor
              </p>
            </div>
            
            <Button 
              type="submit"
              disabled={!deviceId.trim()}
              className="w-full h-11 text-sm font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              Connect Device
            </Button>
          </motion.form>
        )}
      </div>
      
      {/* Help text */}
      <div className="px-5 pb-6">
        <p className="text-center text-muted-foreground text-xs">
          {"Having trouble? "}
          <span className="text-primary font-medium">Get help</span>
        </p>
      </div>
    </div>
  )
}

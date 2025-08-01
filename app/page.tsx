"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import GeneralRound from "@/components/general-round"
import RapidFireRound from "@/components/rapid-fire-round"
import BuzzerRound from "@/components/buzzer-round"

type Round = "home" | "general" | "rapid-fire" | "buzzer"

export default function QuizCompetition() {
  const [currentRound, setCurrentRound] = useState<Round>("home")

  const renderRound = () => {
    switch (currentRound) {
      case "general":
        return <GeneralRound onBack={() => setCurrentRound("home")} />
      case "rapid-fire":
        return <RapidFireRound onBack={() => setCurrentRound("home")} />
      case "buzzer":
        return <BuzzerRound onBack={() => setCurrentRound("home")} />
      case "home":
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">Quiz Competition 2082</h1>
              <p className="text-2xl md:text-3xl font-bold text-gray-700">Bal Shiksha Sadan Pvt. Ltd.</p>{" "}
              {/* Changed text size and added font-bold */}
              <p className="text-lg md:text-xl text-gray-600 mt-2">Karjanha-02, Bandipur, Siraha, Nepal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <Button
                onClick={() => setCurrentRound("general")}
                className="h-32 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg transform transition-transform hover:scale-105"
              >
                General Round
              </Button>
              <Button
                onClick={() => setCurrentRound("rapid-fire")}
                className="h-32 text-2xl font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-lg transform transition-transform hover:scale-105"
              >
                Rapid Fire Round
              </Button>
              <Button
                onClick={() => setCurrentRound("buzzer")}
                className="h-32 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg transform transition-transform hover:scale-105"
              >
                Buzzer Round
              </Button>
            </div>

            <footer className="mt-16 py-6 text-center text-gray-600 text-lg font-semibold">
              Developed by Purna Rai
            </footer>
          </div>
        )
    }
  }

  return renderRound()
}

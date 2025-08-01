"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { rapidFireSets } from "@/lib/data"
import { ChevronDown, ChevronUp } from "lucide-react"

type SetName = keyof typeof rapidFireSets

export default function RapidFireRound({ onBack }: { onBack: () => void }) {
  const [selectedSet, setSelectedSet] = useState<SetName | null>(null)
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())

  const handleSetSelect = (set: SetName) => {
    setSelectedSet(set)
    setRevealedAnswers(new Set()) // Reset revealed answers when changing sets
  }

  const toggleAnswer = (id: number) => {
    setRevealedAnswers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleBackToSets = () => {
    setSelectedSet(null)
    setRevealedAnswers(new Set())
  }

  const questionsInSet = selectedSet ? rapidFireSets[selectedSet] : []

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {!selectedSet ? (
        <div className="w-full max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Rapid Fire Round</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(rapidFireSets).map((set) => (
              <Button
                key={set}
                onClick={() => handleSetSelect(set as SetName)}
                className="h-24 text-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white"
              >
                {set}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={onBack} className="px-6 py-3 text-lg bg-gray-500 hover:bg-gray-600 text-white">
              Back to Main Menu
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{selectedSet} Questions</h2>
          <div className="space-y-4">
            {questionsInSet.map((q) => (
              <Card key={q.id} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {q.id}. {q.question}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => toggleAnswer(q.id)}>
                    {revealedAnswers.has(q.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                    <span className="sr-only">Toggle answer</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  {revealedAnswers.has(q.id) && (
                    <div className="mt-2 space-y-1">
                      <p className="text-lg font-medium text-green-700">Answer: {q.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={handleBackToSets} className="px-6 py-3 text-lg bg-gray-500 hover:bg-gray-600 text-white">
              Back to Sets
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

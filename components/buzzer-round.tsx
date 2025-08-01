"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buzzerQuestions } from "@/lib/data"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function BuzzerRound({ onBack }: { onBack: () => void }) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())

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

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Buzzer Round</h2>
      <div className="w-full max-w-4xl space-y-4">
        {buzzerQuestions.map((q) => (
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
              <p className="text-base text-gray-600 mb-2">{q.nepaliQuestion}</p>
              {revealedAnswers.has(q.id) && (
                <div className="mt-2 space-y-1">
                  <p className="text-lg font-medium text-green-700">Answer: {q.answer}</p>
                  <p className="text-base text-green-600">उत्तर: {q.nepaliAnswer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={onBack} className="px-6 py-3 text-lg bg-gray-500 hover:bg-gray-600 text-white">
          Back to Main Menu
        </Button>
      </div>
    </div>
  )
}

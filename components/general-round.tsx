"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generalQuestions } from "@/lib/data"

export default function GeneralRound({ onBack }: { onBack: () => void }) {
  const [selectedQuestion, setSelectedQuestion] = useState<{
    id: number
    question: string
    answer: string
    nepaliQuestion: string
    nepaliAnswer: string
  } | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showAnswer, setShowAnswer] = useState(false) // New state to control answer visibility

  const handleQuestionClick = (question: {
    id: number
    question: string
    answer: string
    nepaliQuestion: string
    nepaliAnswer: string
  }) => {
    setSelectedQuestion(question)
    setAnsweredQuestions((prev) => new Set(prev).add(question.id))
    setShowAnswer(false) // Hide answer when a new question is selected
  }

  const handleBackToList = () => {
    setSelectedQuestion(null)
    setShowAnswer(false) // Reset answer visibility when going back to list
  }

  const handleCheckAnswer = () => {
    setShowAnswer(true) // Show answer when "Check Answer" is clicked
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {selectedQuestion ? (
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              {selectedQuestion.question}
            </CardTitle>
            <p className="text-lg md:text-xl text-gray-600 mt-2">{selectedQuestion.nepaliQuestion}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showAnswer && ( // Conditionally render "Check Answer" button
              <Button
                onClick={handleCheckAnswer}
                className="mt-4 px-6 py-3 text-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Check Answer
              </Button>
            )}
            {showAnswer && ( // Conditionally render the answer
              <>
                <div className="text-xl md:text-2xl font-semibold text-green-700">
                  Answer: {selectedQuestion.answer}
                </div>
                <div className="text-lg md:text-xl text-green-600">उत्तर: {selectedQuestion.nepaliAnswer}</div>
              </>
            )}
            <Button onClick={handleBackToList} className="mt-6 px-6 py-3 text-lg">
              Back to Questions
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">General Round</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {generalQuestions.map((q) => (
              <Button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                disabled={answeredQuestions.has(q.id)}
                className={`h-20 text-lg font-semibold ${
                  answeredQuestions.has(q.id)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {q.id}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={onBack} className="px-6 py-3 text-lg bg-gray-500 hover:bg-gray-600 text-white">
              Back to Main Menu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

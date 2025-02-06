import { useState } from 'react'

interface UseGuessGameProps {
  correctNames: string[]
}

export function useGuessGame({ correctNames }: UseGuessGameProps): {
  guesses: string[]
  setGuess: (index: number, value: string) => void
  setGuesses: (guesses: string[]) => void
  checkGuesses: () => boolean[]
  isCorrect: boolean[]
  setIsCorrect: (isCorrect: boolean[]) => void
  isComplete: boolean
  setIsComplete: (isComplete: boolean) => void
  usedNames: Set<string>
  attempts: number
  attemptsHistory: boolean[][]
  setAttemptsHistory: (history: boolean[][]) => void
  remainingAttempts: number
  MAX_ATTEMPTS: number
  hasValidGuessesToSubmit: boolean
} {
  const MAX_ATTEMPTS = 6
  const [guesses, setGuesses] = useState<string[]>(['', '', '', '', ''])
  const [isCorrect, setIsCorrect] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])
  const [usedNames] = useState<Set<string>>(new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [attemptsHistory, setAttemptsHistory] = useState<boolean[][]>([])

  const setGuess = (index: number, value: string) => {
    setGuesses((prev) => {
      const newGuesses = [...prev]
      newGuesses[index] = value
      return newGuesses
    })
  }

  const checkGuesses = () => {
    const correctNamesLower = correctNames.map((name) => name.toLowerCase())

    const newIsCorrect = guesses.map((guess) => {
      const guessLower = guess.toLowerCase()
      if (!guess) return false

      const index = correctNamesLower.indexOf(guessLower)
      if (index !== -1) {
        correctNamesLower[index] = ''
        return true
      }
      return false
    })

    setIsCorrect(newIsCorrect)
    setAttempts((prev) => prev + 1)
    setAttemptsHistory((prev) => [...prev, newIsCorrect])
    setIsComplete(newIsCorrect.every(Boolean))
    return newIsCorrect
  }

  const hasValidGuessesToSubmit = guesses.some(
    (guess, index) => guess.trim() !== '' && !isCorrect[index]
  )

  return {
    guesses,
    setGuess,
    checkGuesses,
    isCorrect,
    setGuesses,
    setIsCorrect,
    isComplete,
    setIsComplete,
    usedNames,
    attempts,
    attemptsHistory,
    setAttemptsHistory,
    remainingAttempts: MAX_ATTEMPTS - attempts,
    MAX_ATTEMPTS,
    hasValidGuessesToSubmit
  }
}

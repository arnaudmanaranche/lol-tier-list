import { useEffect, useState } from 'react'

interface UseGuessGameProps {
  correctNames: string[]
}

interface StoredGameState {
  date: string
  guesses: string[]
  isCorrect: boolean[]
  attempts: number
  attemptsHistory: boolean[][]
  isComplete: boolean
  submittedGuesses: string[]
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
  minimumNewGuesses: number
  newGuessesCount: number
  submittedGuesses: string[]
} {
  const MAX_ATTEMPTS = 6
  const MINIMUM_NEW_GUESSES = 2
  const [guesses, setGuesses] = useState<string[]>(['', '', '', '', ''])
  const [submittedGuesses, setSubmittedGuesses] = useState<string[]>([
    '',
    '',
    '',
    '',
    ''
  ])
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
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([
    '',
    '',
    '',
    '',
    ''
  ])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const savedState = localStorage.getItem('daily-guess-game-state')

    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as StoredGameState
        if (parsed.date === today) {
          setGuesses(parsed.guesses)
          setIsCorrect(parsed.isCorrect)
          setAttempts(parsed.attempts)
          setAttemptsHistory(parsed.attemptsHistory)
          setIsComplete(parsed.isComplete)
          setSubmittedGuesses(parsed.submittedGuesses || ['', '', '', '', ''])
        } else {
          localStorage.removeItem('daily-guess-game-state')
        }
      } catch (error) {
        console.error('Error loading saved game state:', error)
      }
    }
  }, [])

  useEffect(() => {
    const state: StoredGameState = {
      date: new Date().toISOString().split('T')[0],
      guesses,
      isCorrect,
      attempts,
      attemptsHistory,
      isComplete,
      submittedGuesses
    }
    localStorage.setItem('daily-guess-game-state', JSON.stringify(state))
  }, [
    guesses,
    isCorrect,
    attempts,
    attemptsHistory,
    isComplete,
    submittedGuesses
  ])

  const setGuess = (index: number, value: string) => {
    setGuesses((prev) => {
      const newGuesses = [...prev]
      newGuesses[index] = value
      return newGuesses
    })
  }

  const newGuessesCount = guesses.filter((guess, index) => {
    return (
      guess.trim() !== '' &&
      !isCorrect[index] &&
      guess !== previousGuesses[index]
    )
  }).length

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

    setPreviousGuesses([...guesses])
    setSubmittedGuesses([...guesses])
    setIsCorrect(newIsCorrect)
    setAttempts((prev) => prev + 1)
    setAttemptsHistory((prev) => [...prev, newIsCorrect])
    setIsComplete(newIsCorrect.every(Boolean))
    return newIsCorrect
  }

  const hasValidGuessesToSubmit =
    newGuessesCount >= MINIMUM_NEW_GUESSES &&
    guesses.some((guess, index) => guess.trim() !== '' && !isCorrect[index])

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
    hasValidGuessesToSubmit,
    minimumNewGuesses: MINIMUM_NEW_GUESSES,
    newGuessesCount,
    submittedGuesses
  }
}

import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { Platform, Share, Text, View } from 'react-native'

import { useGuessGame } from '../hooks/useDailyGuessGame'
import { CoffeeIcon } from '../icons/CoffeeIcon'
import { ShareIcon } from '../icons/ShareIcon'
import type { Storage } from '../storage/types'

import { Button } from './Button'
import { GameInput } from './GameInput'
import { Modal } from './Modal'

const DAILY_GUESS_GAME_ONBOARDING_KEY = 'daily-guess-game-onboarding'
const WEBSITE_URL = 'https://lol-tierlist.com'

interface DailyGuessProps {
  roster: {
    team: {
      id: number
      name: string
    }
    players: {
      name: string
    }[]
  }
  tournamentName: string
  storage: Storage
  onSupportPress?: () => void
  onTrack?: (event: string) => void
}

export function DailyGuess({
  roster,
  tournamentName,
  storage,
  onSupportPress,
  onTrack
}: DailyGuessProps): ReactNode {
  const [isModalOpen, setModalOpen] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const {
    guesses,
    setGuess,
    checkGuesses,
    isCorrect,
    isComplete,
    usedNames,
    attemptsHistory,
    remainingAttempts,
    MAX_ATTEMPTS,
    hasValidGuessesToSubmit,
    minimumNewGuesses,
    newGuessesCount,
    submittedGuesses,
    isLoading
  } = useGuessGame({
    correctNames: roster.players.map((player) => player.name),
    storage
  })

  const generateShareText = useCallback(() => {
    const gameDate = new Date().toISOString().split('T')[0]
    const emojis = attemptsHistory
      .map((attempt) =>
        attempt.map((correct) => (correct ? '🟩' : '🟥')).join('')
      )
      .join('\n')

    return `League Daily Guess ${gameDate}\n${roster.team.name} - ${tournamentName}\n\n${emojis}\n\n${isComplete ? `Completed in ${attemptsHistory.length}/${MAX_ATTEMPTS} attempts!` : 'Failed!'}\n\n${WEBSITE_URL}/daily-guess`
  }, [
    attemptsHistory,
    roster.team.name,
    tournamentName,
    isComplete,
    MAX_ATTEMPTS
  ])

  const handleShare = async () => {
    const shareText = generateShareText()

    if (Platform.OS === 'web') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({ text: shareText })
        } catch {
          await navigator.clipboard.writeText(shareText)
        }
      } else if (typeof navigator !== 'undefined') {
        await navigator.clipboard.writeText(shareText)
      }
    } else {
      try {
        await Share.share({ message: shareText })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  const handleToggleModal = () => setModalOpen((prev) => !prev)

  const handleSubmit = useCallback(() => {
    if (remainingAttempts === 0 || !hasValidGuessesToSubmit) return
    onTrack?.('DailyGuessGameSubmit')

    const results = checkGuesses()
    setHasSubmitted(true)

    if (results.every(Boolean) || remainingAttempts === 1) {
      setShowCompletionModal(true)
      onTrack?.('DailyGuessGameComplete')
    }
  }, [checkGuesses, remainingAttempts, hasValidGuessesToSubmit, onTrack])

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await storage.getItem(
        DAILY_GUESS_GAME_ONBOARDING_KEY
      )

      if (!hasSeenOnboarding) {
        setModalOpen(true)
        await storage.setItem(DAILY_GUESS_GAME_ONBOARDING_KEY, 'true')
      }

      if (isComplete || remainingAttempts === 0) {
        setShowCompletionModal(true)
      }
    }

    if (!isLoading) {
      checkOnboarding()
    }
  }, [isComplete, remainingAttempts, storage, isLoading])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="mx-auto w-full max-w-xl space-y-8 px-4 py-8">
        {/* Title */}
        <View className="items-center">
          <Text className="text-center text-3xl font-bold text-white">
            Find{' '}
            <Text className="rounded bg-[#6036a2] px-2">
              {roster.team.name}
            </Text>
            {"'s"} roster during{' '}
            <Text className="rounded bg-[#6036a2] px-2">{tournamentName}</Text>
          </Text>
        </View>

        {/* Attempts counter */}
        <View className="items-center">
          <Text className="text-white">
            Remaining attempts: {remainingAttempts}/{MAX_ATTEMPTS}
          </Text>
        </View>

        {/* Input fields */}
        <View>
          {guesses.map((guess, index) => (
            <GameInput
              key={index}
              index={index}
              value={guess}
              isCorrect={isCorrect[index]}
              hasError={
                hasSubmitted &&
                !!submittedGuesses[index] &&
                !isCorrect[index] &&
                usedNames.has(submittedGuesses[index].toLowerCase())
              }
              errorMessage="Wrong answer. Try again!"
              onChangeText={(value) => {
                setGuess(index, value)
              }}
              onBlur={() => onTrack?.('DailyGuessGameInput')}
            />
          ))}
        </View>

        {/* Validation message */}
        {!hasValidGuessesToSubmit && newGuessesCount > 0 && (
          <Text className="text-sm text-yellow-500">
            You must submit at least {minimumNewGuesses} new names for each
            submission. Currently: {newGuessesCount}/{minimumNewGuesses}
          </Text>
        )}

        {/* Submit button */}
        <View className="items-end">
          <Button
            onPress={handleSubmit}
            isDisabled={isComplete || !hasValidGuessesToSubmit}
          >
            Check
          </Button>
        </View>
      </View>

      {/* Onboarding Modal */}
      <Modal
        title="Welcome to DailyGuess"
        toggleModal={handleToggleModal}
        isOpen={isModalOpen}
      >
        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-xl text-white">About</Text>
            <Text className="text-white">
              Each day, guess the complete roster of a League of Legends team
              from a past tournament.
            </Text>
          </View>
          <View className="space-y-2">
            <Text className="text-xl text-white">How to play</Text>
            <Text className="text-white">
              • Enter the names of the players in the roster.
            </Text>
            <Text className="text-white">
              • Order doesn't matter - you can enter any role in any field.
            </Text>
            <Text className="text-white">
              • You have {MAX_ATTEMPTS} attempts to guess the players.
            </Text>
            <Text className="text-white">
              • Names are not case sensitive, but pay attention to player
              nicknames.
            </Text>
          </View>
          <Button onPress={handleToggleModal} className="w-full">
            Got it!
          </Button>
        </View>
      </Modal>

      {/* Completion Modal */}
      <Modal
        title={isComplete ? 'Congratulations!' : 'Game Over!'}
        toggleModal={() => setShowCompletionModal(false)}
        isOpen={showCompletionModal}
      >
        <View className="space-y-4">
          <Text className="text-lg text-white">
            {isComplete
              ? `You found all players in ${attemptsHistory.length} attempts!`
              : "You've used all your attempts. Better luck next time!"}
          </Text>

          <View className="space-y-2">
            <Text className="text-xl text-white">The roster:</Text>
            {roster.players.map((player) => (
              <Text key={player.name} className="text-white">
                • {player.name}
              </Text>
            ))}
          </View>

          <View className="space-y-2">
            <Text className="text-xl text-white">Your attempts:</Text>
            <View className="items-center space-y-1">
              {attemptsHistory.map((attempt, idx) => (
                <View key={idx} className="flex-row gap-1">
                  {attempt.map((correct, squareIdx) => (
                    <View
                      key={squareIdx}
                      className={`h-6 w-6 ${correct ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View className="space-y-3">
            <Button onPress={handleShare} className="w-full">
              <View className="flex-row items-center justify-center">
                <ShareIcon />
                <Text className="ml-2 text-white">Share your result</Text>
              </View>
            </Button>
            {onSupportPress && (
              <Button onPress={onSupportPress} className="w-full">
                <View className="flex-row items-center justify-center">
                  <CoffeeIcon />
                  <Text className="ml-2 text-white">Support the project</Text>
                </View>
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

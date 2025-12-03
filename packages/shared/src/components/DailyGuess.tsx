import { type ReactNode, useCallback, useEffect, useState } from 'react'

import { Platform, Share, Text, View } from '../primitives'

import { useGuessGame } from '../hooks/useDailyGuessGame'
import { getRoleByIndex, RoleIcon } from '../icons/RoleIcons'
import type { Storage } from '../storage/types'

import { Button } from './Button'
import { GameInput } from './GameInput'
import { Modal } from './Modal'

const DAILY_GUESS_GAME_ONBOARDING_KEY = 'daily-guess-game-onboarding'
const WEBSITE_URL = 'https://lol-tier-list.com'

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

function AttemptsGrid({
  attemptsHistory,
  maxAttempts
}: {
  attemptsHistory: boolean[][]
  maxAttempts: number
}) {
  const emptyAttempts = maxAttempts - attemptsHistory.length

  return (
    <View className="flex flex-col items-center gap-1">
      {attemptsHistory.map((attempt, idx) => (
        <View key={idx} className="flex flex-row gap-1">
          {attempt.map((correct, squareIdx) => (
            <View
              key={squareIdx}
              className={`h-4 w-4 rounded-sm ${correct ? 'bg-green-500' : 'bg-red-500'}`}
            />
          ))}
        </View>
      ))}
      {Array.from({ length: emptyAttempts }).map((_, idx) => (
        <View key={`empty-${idx}`} className="flex flex-row gap-1">
          {Array.from({ length: 5 }).map((_, squareIdx) => (
            <View
              key={squareIdx}
              className="h-4 w-4 rounded-sm border border-white/20 bg-white/5"
            />
          ))}
        </View>
      ))}
    </View>
  )
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

  const correctCount = isCorrect.filter(Boolean).length
  const progressPercentage = (correctCount / 5) * 100

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
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-white/60">Loading game...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="mx-auto w-full max-w-2xl px-4 py-8">
        {/* Main Game Card */}
        <View className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {/* Header */}
          <View className="border-b border-white/10 bg-white/5 px-6 py-5">
            <Text className="mb-2 block text-center text-xs font-medium uppercase tracking-widest text-white/40">
              Daily Challenge
            </Text>
            <Text className="block text-center text-2xl font-bold text-white">
              Find{' '}
              <Text className="rounded bg-purple-500/40 px-2 py-1 text-purple-200">
                {roster.team.name}
              </Text>
              {"'s"} roster
            </Text>
            <Text className="mt-2 block text-center text-lg text-white/70">
              during{' '}
              <Text className="font-semibold text-amber-400">
                {tournamentName}
              </Text>
            </Text>
          </View>

          {/* Stats Bar */}
          <View className="flex flex-row border-b border-white/10 bg-black/20">
            <View className="flex flex-1 flex-col items-center border-r border-white/10 py-4">
              <Text className="block text-3xl font-bold text-white">
                {remainingAttempts}
              </Text>
              <Text className="block text-xs text-white/50">Attempts left</Text>
            </View>
            <View className="flex flex-1 flex-col items-center border-r border-white/10 py-4">
              <Text className="block text-3xl font-bold text-green-400">
                {correctCount}
              </Text>
              <Text className="block text-xs text-white/50">Found</Text>
            </View>
            <View className="flex flex-1 flex-col items-center justify-center py-4">
              <AttemptsGrid
                attemptsHistory={attemptsHistory}
                maxAttempts={MAX_ATTEMPTS}
              />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="px-6 py-4">
            <View className="mb-2 flex flex-row justify-between">
              <Text className="text-xs text-white/50">Progress</Text>
              <Text className="text-xs font-medium text-white/70">
                {correctCount}/5 found
              </Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-white/10">
              <View
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                style={{ width: `${progressPercentage}%` }}
              />
            </View>
          </View>

          {/* Input Fields */}
          <View className="px-4 pb-2">
            {guesses.map((guess, index) => (
              <GameInput
                key={index}
                index={index}
                value={guess}
                isCorrect={isCorrect[index]}
                hasError={
                  hasSubmitted && !!submittedGuesses[index] && !isCorrect[index]
                }
                errorMessage="Not in the roster"
                onChangeText={(value) => {
                  setGuess(index, value)
                }}
                onBlur={() => onTrack?.('DailyGuessGameInput')}
              />
            ))}
          </View>

          {/* Validation message */}
          {!hasValidGuessesToSubmit && newGuessesCount > 0 && (
            <View className="mx-4 mb-4 rounded-lg bg-amber-500/20 px-4 py-3">
              <Text className="block text-center text-sm text-amber-300">
                Enter at least {minimumNewGuesses} new names ({newGuessesCount}/
                {minimumNewGuesses})
              </Text>
            </View>
          )}

          {/* Submit Button */}
          <View className="border-t border-white/10 bg-white/5 p-4">
            <Button
              onPress={handleSubmit}
              isDisabled={isComplete || !hasValidGuessesToSubmit}
              className="w-full"
            >
              <Text className="block text-center text-lg font-semibold text-white">
                {isComplete ? '✓ Completed!' : 'Check Answers'}
              </Text>
            </Button>
          </View>
        </View>

        {/* Help Button */}
        <View className="mt-6 flex items-center justify-center">
          <Button onPress={handleToggleModal} className="bg-white/10 px-6 py-2">
            <Text className="text-sm text-white/70">❓ How to play</Text>
          </Button>
        </View>
      </View>

      {/* Onboarding Modal */}
      <Modal
        title="🎮 Daily Guess"
        toggleModal={handleToggleModal}
        isOpen={isModalOpen}
      >
        <View className="flex flex-col gap-5">
          <View className="rounded-xl bg-white/5 p-4">
            <Text className="mb-2 block text-lg font-semibold text-purple-300">
              About
            </Text>
            <Text className="block leading-relaxed text-white/80">
              Each day, guess the complete roster of a League of Legends team
              from a past tournament. Test your esports knowledge!
            </Text>
          </View>

          <View className="rounded-xl bg-white/5 p-4">
            <Text className="mb-3 block text-lg font-semibold text-purple-300">
              How to play
            </Text>
            <View className="flex flex-col gap-3">
              <View className="flex flex-row items-center gap-3">
                <Text className="text-xl">⌨️</Text>
                <Text className="flex-1 text-white/80">
                  Enter player names in any order
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-xl">🔄</Text>
                <Text className="flex-1 text-white/80">
                  Order doesn't matter - fill any role first
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-xl">🎯</Text>
                <Text className="flex-1 text-white/80">
                  You have {MAX_ATTEMPTS} attempts total
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-xl">📝</Text>
                <Text className="flex-1 text-white/80">
                  Names aren't case sensitive
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-xl bg-green-500/10 p-4">
            <View className="flex flex-row items-start gap-3">
              <Text className="text-2xl">💡</Text>
              <Text className="flex-1 text-sm text-white/70">
                Pro tip: Pay attention to player nicknames - some pros change
                their IGN between seasons!
              </Text>
            </View>
          </View>

          <Button onPress={handleToggleModal} className="w-full">
            <Text className="block text-center text-lg font-semibold text-white">
              Let's Play!
            </Text>
          </Button>
        </View>
      </Modal>

      {/* Completion Modal */}
      <Modal
        title={isComplete ? '🎉 Victory!' : '💔 Game Over'}
        toggleModal={() => setShowCompletionModal(false)}
        isOpen={showCompletionModal}
      >
        <View className="flex flex-col gap-5">
          {/* Result message */}
          <View
            className={`rounded-xl p-4 ${isComplete ? 'bg-green-500/20' : 'bg-red-500/20'}`}
          >
            <Text
              className={`block text-center text-lg ${isComplete ? 'text-green-300' : 'text-red-300'}`}
            >
              {isComplete
                ? `Amazing! You found all players in ${attemptsHistory.length} attempt${attemptsHistory.length > 1 ? 's' : ''}!`
                : "Better luck next time! Here's the roster:"}
            </Text>
          </View>

          {/* Roster reveal */}
          <View className="rounded-xl bg-white/5 p-4">
            <Text className="mb-3 block text-center text-xs font-medium uppercase tracking-widest text-white/50">
              The Roster
            </Text>
            <View className="flex flex-col gap-2">
              {roster.players.map((player, idx) => (
                <View
                  key={player.name}
                  className="flex flex-row items-center gap-3 rounded-lg bg-white/5 px-3 py-2"
                >
                  <View className="text-white/80">
                    <RoleIcon role={getRoleByIndex(idx)} size={20} />
                  </View>
                  <Text className="font-medium text-white">{player.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Attempts visualization */}
          <View className="rounded-xl bg-white/5 p-4">
            <Text className="mb-3 block text-center text-xs font-medium uppercase tracking-widest text-white/50">
              Your Attempts
            </Text>
            <View className="flex flex-col items-center gap-1">
              {attemptsHistory.map((attempt, idx) => (
                <View key={idx} className="flex flex-row gap-1">
                  {attempt.map((correct, squareIdx) => (
                    <View
                      key={squareIdx}
                      className={`h-7 w-7 rounded ${correct ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Action buttons */}
          <View className="flex flex-col gap-3">
            <Button onPress={handleShare} className="w-full">
              <Text className="block text-center font-semibold text-white">
                📤 Share Result
              </Text>
            </Button>
            {onSupportPress && (
              <Button
                onPress={onSupportPress}
                className="w-full bg-amber-500/20"
              >
                <Text className="block text-center font-semibold text-amber-300">
                  ☕ Support the Project
                </Text>
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

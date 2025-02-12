import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import clsx from 'clsx'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import type { PandaScoreTournamentWithExpectedRosters } from 'providers/pandascore/types'
import { type ReactNode, useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Modal } from '@/components/Modal'
import { useGuessGame } from '@/hooks/useDailyGuessGame'
import { WEBSITE_URL } from '@/utils/constants'

interface PageProps {
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
}

const DAILY_GUESS_GAME_ONBOARDING_LOCALE_STORAGE_KEY =
  'daily-guess-game-onboarding'

const LAST_SUBMISSION_LOCALE_STORAGE_KEY = 'last-submission'

const Page = ({
  roster,
  tournamentName
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {
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
    remainingAttempts,
    MAX_ATTEMPTS,
    setAttemptsHistory,
    hasValidGuessesToSubmit
  } = useGuessGame({
    correctNames: roster.players.map((player) => player.name)
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

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('Result copied to clipboard!')
    }
  }

  const handleToggleModal = () => setModalOpen((prev) => !prev)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (remainingAttempts === 0 || !hasValidGuessesToSubmit) return

      const results = checkGuesses()
      setHasSubmitted(true)

      localStorage.setItem(
        LAST_SUBMISSION_LOCALE_STORAGE_KEY,
        JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          result: JSON.stringify(guesses),
          attemptsHistory: [...attemptsHistory, results],
          attempts: attempts + 1
        })
      )

      if (results.every(Boolean) || remainingAttempts === 1) {
        setShowCompletionModal(true)
      }
    },
    [
      checkGuesses,
      guesses,
      attemptsHistory,
      attempts,
      remainingAttempts,
      hasValidGuessesToSubmit
    ]
  )

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    const hasSeenOnboarding = localStorage.getItem(
      DAILY_GUESS_GAME_ONBOARDING_LOCALE_STORAGE_KEY
    )

    if (!hasSeenOnboarding) {
      setModalOpen(true)
      localStorage.setItem(
        DAILY_GUESS_GAME_ONBOARDING_LOCALE_STORAGE_KEY,
        'true'
      )
    }

    const lastSubmissionRaw = localStorage.getItem(
      LAST_SUBMISSION_LOCALE_STORAGE_KEY
    )
    if (lastSubmissionRaw) {
      try {
        const lastSubmission = JSON.parse(lastSubmissionRaw)
        if (lastSubmission && today === lastSubmission?.date) {
          const previousGuesses = JSON.parse(lastSubmission.result) || []
          const previousHistory = lastSubmission.attemptsHistory || []
          const previousAttempts = lastSubmission.attempts || 0

          const updatedGuesses = Array(5)
            .fill('')
            .map((_, index) => previousGuesses[index] || '')

          const correctNamesLower = roster.players.map((player) =>
            player.name.toLowerCase()
          )
          const updatedIsCorrect = updatedGuesses.map((guess) =>
            correctNamesLower.includes(guess.toLowerCase())
          )

          setGuesses(updatedGuesses)
          setIsCorrect(updatedIsCorrect)
          if (previousHistory.length) {
            setAttemptsHistory(previousHistory)
          }

          if (
            previousAttempts >= MAX_ATTEMPTS ||
            updatedIsCorrect.every(Boolean)
          ) {
            setShowCompletionModal(true)
            setIsCorrect(updatedIsCorrect)
            if (updatedIsCorrect.every(Boolean)) {
              setIsComplete(true)
            }
          }
        } else {
          localStorage.setItem(
            LAST_SUBMISSION_LOCALE_STORAGE_KEY,
            JSON.stringify({
              date: new Date().toISOString().split('T')[0],
              result: []
            })
          )
        }
      } catch (error) {
        console.error('Error parsing last submission:', error)
      }
    }
  }, [
    roster.players,
    setGuesses,
    setIsCorrect,
    setAttemptsHistory,
    setIsComplete,
    MAX_ATTEMPTS
  ])

  return (
    <>
      <Head>
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
      </Head>
      <div>
        <div>
          <Header user={null} />
          <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-16 md:px-6">
          <h1 className="text-center text-5xl font-bold text-white lg:text-8xl">
            Find the roster of{' '}
            <span className="rounded-md bg-[#6036a2] px-4 font-sans leading-relaxed">
              {roster.team.name}
            </span>{' '}
            during the{' '}
            <span className="rounded-md bg-[#6036a2] px-4 font-sans leading-relaxed">
              {tournamentName}
            </span>
          </h1>
          <div className="text-center text-white">
            <p>
              Attempts remaining: {remainingAttempts}/{MAX_ATTEMPTS}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
            {guesses.map((guess, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={guess}
                  disabled={isCorrect[index]}
                  onChange={(e) => {
                    const value = e.target.value
                    setGuess(index, value)
                  }}
                  className={clsx(
                    'w-full rounded-md p-2',
                    isCorrect[index] &&
                      'ring-4 ring-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-white disabled:opacity-80',
                    hasSubmitted &&
                      usedNames.has(guess.toLowerCase()) &&
                      !isCorrect[index] &&
                      'ring-4 ring-red-800',
                    hasSubmitted && guess && !isCorrect[index] && 'bg-red-100'
                  )}
                  placeholder={`Player ${index + 1}`}
                />
                {hasSubmitted && guess && !isCorrect[index] && (
                  <p className="mt-1 text-sm text-red-500">
                    Incorrect guess. Try again!
                  </p>
                )}
              </div>
            ))}
            <div className="mt-6 flex justify-end gap-2">
              <Button isDisabled={isComplete || !hasValidGuessesToSubmit}>
                Check Guesses
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Modal
        title="Welcome to DailyGuess"
        toggleModal={handleToggleModal}
        isOpen={isModalOpen}
      >
        <div className="space-y-4 text-white">
          <div className="space-y-2">
            <h2 className="text-xl">About</h2>
            <p>
              Every day, guess the full roster of a League of Legends team
              during a previous tournament.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl">How to play</h2>
            <ul>
              <li>Enter the names of the players in the roster. </li>
              <li>
                The order doesn&apos;t matter—you can enter any role in any
                input field.
              </li>
              <li>You have {MAX_ATTEMPTS} attempts to guess the players.</li>
              <li>
                Names are not case-sensitive, but be mindful of player nicknames
                (e.g., <code>Jiizuke</code>).
              </li>
            </ul>
          </div>
          <Button className="w-full" onClick={handleToggleModal}>
            Got it!
          </Button>
        </div>
      </Modal>
      <Modal
        title={isComplete ? 'Congratulations!' : 'Game Over!'}
        toggleModal={() => setShowCompletionModal(false)}
        isOpen={showCompletionModal}
      >
        <div className="space-y-4 text-white">
          <p className="text-lg">
            {isComplete
              ? `You successfully found all players in ${attemptsHistory.length} attempts!`
              : "You've used all your attempts. Better luck next time!"}
          </p>
          <div className="space-y-2">
            <h2 className="text-xl">The roster:</h2>
            <ul className="list-disc pl-4">
              {roster.players.map((player) => (
                <li key={player.name}>{player.name}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl">Your attempts:</h2>
            <div className="space-y-1">
              {attemptsHistory.map((attempt, idx) => (
                <div key={idx} className="flex justify-center gap-1">
                  {attempt.map((correct, squareIdx) => (
                    <div
                      key={squareIdx}
                      className={`h-6 w-6 ${correct ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Button className="w-full" onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const supabaseClient = createServerPropsClient(context)

  const { data, error } = await supabaseClient
    .from('daily-guess')
    .select('*')
    .lte('created_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    return {
      notFound: true
    }
  }

  const response = await fetch(
    `https://api.pandascore.co/tournaments/${data[0]?.tournament_id}?token=${process.env.PANDASCORE_TOKEN}`
  )

  const { expected_roster, league, begin_at } =
    (await response.json()) as PandaScoreTournamentWithExpectedRosters

  const roster = expected_roster.find((r) => r.team.id === data[0]?.team_id)

  if (!roster) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      roster,
      tournamentName: `${new Date(begin_at).getFullYear()} ${league.name}`
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page

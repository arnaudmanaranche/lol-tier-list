import { DailyGuess } from '@lol-tier-list/shared/components'
import { storage } from '@lol-tier-list/shared/storage'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

interface RosterData {
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

// Use local dev server in development, production URL otherwise
const getApiUrl = () => {
  if (__DEV__) {
    // Get the local IP from Expo's manifest
    const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0]
    if (debuggerHost) {
      return `http://${debuggerHost}:3000/api/daily-guess`
    }
    // Fallback for simulator
    return 'http://localhost:3000/api/daily-guess'
  }
  return 'https://lol-tierlist.com/api/daily-guess'
}

const API_URL = getApiUrl()

export default function DailyGuessScreen() {
  const [data, setData] = useState<RosterData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch daily guess data')
        }
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSupportPress = () => {
    Linking.openURL('https://buymeacoffee.com/arnaudmanaranche')
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121212]">
        <ActivityIndicator size="large" color="#6036a2" />
        <Text className="mt-4 text-white">Loading today's challenge...</Text>
      </View>
    )
  }

  if (error || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121212] px-4">
        <Text className="text-center text-lg text-red-500">
          {error || 'Failed to load daily guess'}
        </Text>
        <Text className="mt-2 text-center text-white">
          Please check your connection and try again.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-[#121212]">
      <DailyGuess
        roster={data.roster}
        tournamentName={data.tournamentName}
        storage={storage}
        onSupportPress={handleSupportPress}
      />
    </View>
  )
}

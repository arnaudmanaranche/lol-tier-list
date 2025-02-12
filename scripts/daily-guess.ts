/* eslint-disable no-console */

import process from 'process'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { SupabaseClient } = require('@supabase/supabase-js')

interface PandaScoreTournament {
  id: number
}

interface TournamentWithRoster {
  tournament: {
    id: number
  }
  acronym: string
  id: number
  name: string
  players: {
    id: number
    role: 'top' | 'jun' | 'mid' | 'adc' | 'sup'
    name: string
  }[]
}

const REGIONS: string[] = [
  'lta-north',
  'lec',
  'league-of-legends-lpl-china',
  'lcs',
  'league-of-legends-lck-champions-korea',
  'world-championship',
  'msi'
]

const PAST_TOURNAMENTS_URL = 'https://api.pandascore.co/lol/tournaments/past'
const TOURNAMENT_ROSTERS_URL = 'https://api.pandascore.co/tournaments'

const supabase = new SupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function pickRandomInList<T>(list: T[]): T {
  const index = Math.floor(Math.random() * list.length)
  return list[index]!
}

async function fetchTournamentsForRegion(region: string) {
  try {
    const url = `${PAST_TOURNAMENTS_URL}?token=${process.env.PANDASCORE_TOKEN}&search[slug]=${region}`
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Failed to fetch tournaments: ${response.statusText}`)
    const data = await response.json()
    return data as PandaScoreTournament[]
  } catch (error) {
    console.error(`Error fetching tournaments for region ${region}:`, error)
    return []
  }
}

async function fetchRostersForTournament(tournamentId: number) {
  try {
    const url = `${TOURNAMENT_ROSTERS_URL}/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Failed to fetch rosters: ${response.statusText}`)
    const data = await response.json()
    return data.rosters as TournamentWithRoster[]
  } catch (error) {
    console.error(
      `Error fetching rosters for tournament ${tournamentId}:`,
      error
    )
    return []
  }
}

async function insertRosterInDatabase({
  teamId,
  tournamentId
}: {
  teamId: number
  tournamentId: number
}) {
  const { error } = await supabase.from('daily-guess').insert({
    team_id: teamId,
    tournament_id: tournamentId
  })

  if (error) {
    console.error('Error inserting roster in database:', error)
    throw error
  }
}

async function getLatestDailyGuess() {
  const { data, error } = await supabase
    .from('daily-guess')
    .select()
    .rangeLte('created_at', new Date().toLocaleTimeString())
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching latest daily guess:', error)
    throw error
  }

  return { data }
}

async function getTournamentRoster() {
  // const spinner = ora()

  try {
    const region = pickRandomInList(REGIONS)

    // spinner.start(`Fetching the past tournaments list for the region ${region}`)
    const tournaments = await fetchTournamentsForRegion(region)

    if (!tournaments.length) {
      // spinner.fail('No tournament found')
      throw new Error(`No tournament found for the region ${region}`)
    }

    // spinner.succeed('Fetched the past tournament list')
    const tournament = pickRandomInList(tournaments)
    console.info(`Selected tournament ${tournament.id}`)

    // spinner.start(`Fetching rosters for tournament ID ${tournament.id}`)
    const rosters = await fetchRostersForTournament(tournament.id)

    if (!rosters.length) {
      // spinner.fail('No rosters found')
      throw new Error(`No rosters found for the tournament ID ${tournament.id}`)
    }

    // spinner.succeed('Fetched rosters')
    const roster = pickRandomInList(rosters)
    console.info(`Selected roster ${roster.acronym}`)

    const latestDailyGuess = await getLatestDailyGuess()

    if (
      latestDailyGuess.data?.team_id === roster.id &&
      latestDailyGuess.data.tournament_id === tournament.id
    ) {
      console.warn(
        'Selected roster is the same as the latest daily guess. Retrying...'
      )
      return getTournamentRoster() // Recursively re-run to pick a different roster
    }

    await insertRosterInDatabase({
      tournamentId: tournament.id,
      teamId: roster.id
    })
  } catch (err) {
    console.error('Error in getTournamentRoster:', err)
  }
}

getTournamentRoster()

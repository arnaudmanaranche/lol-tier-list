/* eslint-disable no-console */
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
    .lte('created_at', new Date().toISOString())
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching latest daily guess:', error)
    throw error
  }

  return { data }
}

async function postTweet(text: string) {
  try {
    const response = await fetch(`${process.env.N8N_WEBHOOK_URL}`, {
      method: 'POST',
      headers: {
        N8N_API_KEY: process.env.N8N_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })

    if (!response.ok) {
      throw new Error(`Failed to post tweet: ${response.statusText}`)
    }

    console.info('Successfully posted tweet!')
    return await response.json()
  } catch (error) {
    console.error('Error posting tweet:', error)
  }
}

async function getTournamentRoster() {
  try {
    const region = pickRandomInList(REGIONS)
    const tournaments = await fetchTournamentsForRegion(region)

    if (!tournaments.length) {
      throw new Error(`No tournament found for the region ${region}`)
    }

    const tournament = pickRandomInList(tournaments)
    console.info(`Selected tournament ${tournament.id}`)

    const rosters = await fetchRostersForTournament(tournament.id)

    if (!rosters.length) {
      throw new Error(`No rosters found for the tournament ID ${tournament.id}`)
    }

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
      return getTournamentRoster()
    }

    await insertRosterInDatabase({
      tournamentId: tournament.id,
      teamId: roster.id
    })

    const tournamentResponse = await fetch(
      `${TOURNAMENT_ROSTERS_URL}/${tournament.id}?token=${process.env.PANDASCORE_TOKEN}`
    )
    const tournamentData = await tournamentResponse.json()

    await postTweet(
      `🎮 New Daily Guess available!\n\n🕵️ You have 6 tries to guess a roster from a past tournament.\n\nToday's challenge: Can you name the ${roster.acronym} roster from the ${new Date(tournamentData.begin_at).getFullYear()} ${tournamentData.league.name}?\n\n👉 https://lol-tier-list.com/daily-guess\n\n#LeagueOfLegends`
    )
  } catch (err) {
    console.error('Error in getTournamentRoster:', err)
  }
}

getTournamentRoster()

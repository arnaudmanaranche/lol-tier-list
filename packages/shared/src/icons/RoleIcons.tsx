import type { ReactNode } from 'react'
import { Text } from 'react-native'

export const ROLE_ORDER = ['top', 'jun', 'mid', 'adc', 'sup'] as const
export type RoleName = (typeof ROLE_ORDER)[number]

export const ROLE_LABELS: Record<RoleName, string> = {
  top: 'Top',
  jun: 'Jungle',
  mid: 'Mid',
  adc: 'ADC',
  sup: 'Support'
}

// Emoji fallback for mobile
const ROLE_EMOJIS: Record<RoleName, string> = {
  top: '⚔️',
  jun: '🌿',
  mid: '✨',
  adc: '🎯',
  sup: '🛡️'
}

interface RoleIconProps {
  size?: number
}

export function TopIcon({ size = 24 }: RoleIconProps): ReactNode {
  return <Text style={{ fontSize: size }}>⚔️</Text>
}

export function JungleIcon({ size = 24 }: RoleIconProps): ReactNode {
  return <Text style={{ fontSize: size }}>🌿</Text>
}

export function MidIcon({ size = 24 }: RoleIconProps): ReactNode {
  return <Text style={{ fontSize: size }}>✨</Text>
}

export function AdcIcon({ size = 24 }: RoleIconProps): ReactNode {
  return <Text style={{ fontSize: size }}>🎯</Text>
}

export function SupportIcon({ size = 24 }: RoleIconProps): ReactNode {
  return <Text style={{ fontSize: size }}>🛡️</Text>
}

export function RoleIcon({ role, size = 24 }: { role: RoleName; size?: number }): ReactNode {
  const emoji = ROLE_EMOJIS[role]
  return <Text style={{ fontSize: size }}>{emoji}</Text>
}

export function getRoleByIndex(index: number): RoleName {
  return ROLE_ORDER[index] || 'top'
}


import type { ReactNode } from 'react'

interface CoffeeIconProps {
  size?: number
  color?: string
}

export function CoffeeIcon({
  size = 20,
  color = 'white'
}: CoffeeIconProps): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Steam lines */}
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      {/* Cup */}
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
    </svg>
  )
}

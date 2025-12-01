import { MotiView } from 'moti'
import type { ReactNode } from 'react'
import { Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface CoffeeIconProps {
  size?: number
  color?: string
}

export function CoffeeIcon({
  size = 20,
  color = 'currentColor'
}: CoffeeIconProps): ReactNode {
  return (
    <Pressable className="items-center justify-center rounded-md p-2">
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Steam lines with animation */}
        <MotiView
          from={{ opacity: 0.5, translateY: 0 }}
          animate={{ opacity: 1, translateY: -3 }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true
          }}
        >
          <Path d="M6 2v2" stroke={color} strokeWidth={2} />
        </MotiView>
        <MotiView
          from={{ opacity: 0.5, translateY: 0 }}
          animate={{ opacity: 1, translateY: -3 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 200,
            loop: true
          }}
        >
          <Path d="M10 2v2" stroke={color} strokeWidth={2} />
        </MotiView>
        <MotiView
          from={{ opacity: 0.5, translateY: 0 }}
          animate={{ opacity: 1, translateY: -3 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 400,
            loop: true
          }}
        >
          <Path d="M14 2v2" stroke={color} strokeWidth={2} />
        </MotiView>
        {/* Cup */}
        <Path
          d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"
          stroke={color}
          strokeWidth={2}
        />
      </Svg>
    </Pressable>
  )
}

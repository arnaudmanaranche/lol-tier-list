import { MotiView } from 'moti'
import type { ReactNode } from 'react'
import { Pressable } from 'react-native'
import Svg, { Line, Path, Polyline } from 'react-native-svg'

interface ShareIconProps {
  size?: number
  color?: string
}

export function ShareIcon({
  size = 20,
  color = 'currentColor'
}: ShareIconProps): ReactNode {
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
        <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: -2 }}
          transition={{
            type: 'timing',
            duration: 300,
            loop: false
          }}
        >
          <Polyline points="17 8 12 3 7 8" stroke={color} strokeWidth={2} />
          <Line x1={12} y1={3} x2={12} y2={15} stroke={color} strokeWidth={2} />
        </MotiView>
      </Svg>
    </Pressable>
  )
}

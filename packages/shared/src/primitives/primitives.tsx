// Native implementation - uses React Native components with NativeWind
import type { ComponentProps } from 'react'
import {
  View as RNView,
  Text as RNText,
  TextInput as RNTextInput,
  Pressable as RNPressable,
  Platform,
  Share
} from 'react-native'

// Re-export Platform and Share directly
export { Platform, Share }

// Wrapper types that include className
export type ViewProps = ComponentProps<typeof RNView> & { className?: string }
export type TextProps = ComponentProps<typeof RNText> & { className?: string }
export type TextInputProps = ComponentProps<typeof RNTextInput> & {
  className?: string
}
export type PressableProps = ComponentProps<typeof RNPressable> & {
  className?: string
}

// Cast components to include className (NativeWind handles this at runtime)
// Use unknown intermediate cast for class components
export const View = RNView as unknown as React.ComponentType<ViewProps>
export const Text = RNText as unknown as React.ComponentType<TextProps>
export const TextInput =
  RNTextInput as unknown as React.ComponentType<TextInputProps>
export const Pressable =
  RNPressable as unknown as React.ComponentType<PressableProps>

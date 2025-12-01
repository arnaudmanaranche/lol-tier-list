import type { ReactNode } from 'react'

import { Text, TextInput, View } from '../primitives'

interface GameInputProps {
  value?: string
  onChangeText?: (text: string) => void
  onBlur?: () => void
  isCorrect?: boolean
  hasError?: boolean
  errorMessage?: string
  index: number
}

export function GameInput({
  isCorrect,
  hasError,
  errorMessage,
  index,
  className = '',
  ...props
}: GameInputProps): ReactNode {
  const baseStyles = 'w-full rounded-md p-3 text-base bg-white'
  const correctStyles = isCorrect ? 'border-4 border-green-600 opacity-80' : ''
  const errorStyles = hasError ? 'border-4 border-red-600 bg-red-100' : ''

  return (
    <View className="mb-4">
      <TextInput
        className={`${baseStyles} ${correctStyles} ${errorStyles} ${className}`}
        placeholder={`Player ${index + 1}`}
        placeholderTextColor="#9ca3af"
        editable={!isCorrect}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
      {hasError && errorMessage && (
        <Text className="mt-1 text-sm text-red-500">{errorMessage}</Text>
      )}
    </View>
  )
}

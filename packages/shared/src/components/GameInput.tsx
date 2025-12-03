import type { ReactNode } from 'react'

import { Text, TextInput, View } from '../primitives'
import { getRoleByIndex, RoleIcon, ROLE_LABELS } from '../icons/RoleIcons'

interface GameInputProps {
  value?: string
  onChangeText?: (text: string) => void
  onBlur?: () => void
  isCorrect?: boolean
  hasError?: boolean
  errorMessage?: string
  index: number
  className?: string
}

export function GameInput({
  isCorrect,
  hasError,
  errorMessage,
  index,
  className = '',
  ...props
}: GameInputProps): ReactNode {
  const role = getRoleByIndex(index)
  const roleLabel = ROLE_LABELS[role]
  
  const getContainerStyles = () => {
    if (isCorrect) return 'border-2 border-green-500 bg-green-500/10'
    if (hasError) return 'border-2 border-red-500 bg-red-500/10'
    return 'border border-white/20 bg-white/5'
  }

  const getInputStyles = () => {
    if (isCorrect) return 'bg-green-900/30 text-green-100'
    if (hasError) return 'bg-red-900/30 text-red-100'
    return 'bg-white/10 text-white'
  }

  return (
    <View className={`mb-3 flex overflow-hidden rounded-xl ${getContainerStyles()}`}>
      <View className="flex flex-row items-center">
        {/* Role indicator */}
        <View className="flex w-20 flex-col items-center justify-center bg-white/5 py-4">
          <View className="text-white/80">
            <RoleIcon role={role} size={24} />
          </View>
          <Text className="mt-1 text-xs font-medium text-white/70">{roleLabel}</Text>
        </View>
        
        {/* Input field */}
        <View className="flex flex-1 flex-col px-3 py-2">
          <TextInput
            className={`w-full rounded-lg px-4 py-3 text-base outline-none ${getInputStyles()} ${className}`}
            placeholder={`Enter ${roleLabel} player...`}
            placeholderTextColor="rgba(255,255,255,0.4)"
            editable={!isCorrect}
            autoCapitalize="none"
            autoCorrect={false}
            {...props}
          />
          {hasError && errorMessage && (
            <Text className="mt-1 block px-1 text-xs text-red-400">{errorMessage}</Text>
          )}
          {isCorrect && (
            <Text className="mt-1 block px-1 text-xs text-green-400">✓ Correct!</Text>
          )}
        </View>
      </View>
    </View>
  )
}

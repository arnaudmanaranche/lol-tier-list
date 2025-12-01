import type { ReactNode } from 'react'
import { Pressable, Text, type PressableProps } from 'react-native'

type ButtonType = 'default' | 'danger'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: ReactNode
  onPress?: () => void
  isDisabled?: boolean
  type?: ButtonType
  className?: string
}

export function Button({
  children,
  onPress,
  isDisabled,
  type = 'default',
  className = '',
  ...props
}: ButtonProps): ReactNode {
  const baseStyles = 'flex-row items-center justify-center rounded-md px-6 py-3'
  const typeStyles =
    type === 'danger' ? 'bg-red-500' : 'bg-[#6036a2] active:bg-[#472878]'
  const disabledStyles = isDisabled ? 'opacity-50' : ''

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`${baseStyles} ${typeStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-center text-base font-medium text-white">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

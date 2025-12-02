import type {
  ReactNode,
  HTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes
} from 'react'
import { forwardRef } from 'react'

// Platform constant for web
export const Platform = {
  OS: 'web' as const,
  select: <T,>(options: { web?: T; default?: T; ios?: T; android?: T }): T =>
    (options.web ?? options.default) as T
}

// Share API for web
export const Share = {
  share: async ({ message }: { message: string }) => {
    if (navigator.share) {
      await navigator.share({ text: message })
    } else {
      await navigator.clipboard.writeText(message)
    }
  }
}

// View component - renders as div with Tailwind classes
interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
)
View.displayName = 'View'

// Text component - renders as span with Tailwind classes
interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string
  children?: ReactNode
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={className} {...props}>
      {children}
    </span>
  )
)
Text.displayName = 'Text'

// TextInput component - renders as input with Tailwind classes
interface TextInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'autoCorrect'
  > {
  className?: string
  onChangeText?: (text: string) => void
  editable?: boolean
  // React Native specific props to ignore
  placeholderTextColor?: string
  autoCapitalize?: string
  autoCorrect?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      onChangeText,
      editable = true,
      // Destructure RN-specific props to prevent them from being passed to DOM
      placeholderTextColor: _placeholderTextColor,
      autoCapitalize: _autoCapitalize,
      autoCorrect: _autoCorrect,
      ...props
    },
    ref
  ) => (
    <input
      ref={ref}
      className={className}
      disabled={!editable}
      onChange={(e) => onChangeText?.(e.target.value)}
      {...props}
    />
  )
)
TextInput.displayName = 'TextInput'

// Pressable component - renders as button with Tailwind classes
interface PressableProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
}

export const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  ({ className, children, onPress, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={onPress}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
)
Pressable.displayName = 'Pressable'

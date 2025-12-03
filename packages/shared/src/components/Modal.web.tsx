import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { Pressable, Text, View } from '../primitives'

interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  title: ReactNode
  children: ReactNode
}

export function Modal({
  isOpen,
  toggleModal,
  title,
  children
}: ModalProps): ReactNode {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, toggleModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={toggleModal} />
      {/* Modal content */}
      <View className="relative z-10 flex max-h-[85vh] w-full max-w-[450px] flex-col rounded-xl bg-[#1a1a2e] shadow-2xl">
        {/* Header - fixed */}
        <View className="flex flex-row items-center justify-between border-b border-white/10 px-6 py-4">
          <Text className="text-xl font-semibold text-white">{title}</Text>
          <Pressable
            onPress={toggleModal}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <Text className="text-lg text-white/70">✕</Text>
          </Pressable>
        </View>
        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </View>
    </div>
  )
}

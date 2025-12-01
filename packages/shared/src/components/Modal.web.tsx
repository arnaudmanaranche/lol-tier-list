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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={toggleModal} />
      {/* Modal content */}
      <View className="relative z-10 m-5 max-w-[450px] rounded-lg bg-[#121212] p-6 shadow-lg">
        <View className="mb-6 flex flex-row items-center justify-between">
          <Text className="text-2xl font-medium text-white">{title}</Text>
          <Pressable
            onPress={toggleModal}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
          >
            <Text className="text-xl text-white">✕</Text>
          </Pressable>
        </View>
        {children}
      </View>
    </div>
  )
}

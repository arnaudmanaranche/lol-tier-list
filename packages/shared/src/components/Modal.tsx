import type { ReactNode } from 'react'
import { Modal as RNModal, ScrollView } from 'react-native'

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
  if (!isOpen) return null

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <View className="flex-1 items-center justify-center bg-black/60 p-4">
        <View className="max-h-[85%] w-full max-w-[450px] rounded-xl bg-[#1a1a2e] shadow-2xl">
          {/* Header - fixed */}
          <View className="flex-row items-center justify-between border-b border-white/10 px-6 py-4">
            <Text className="text-xl font-semibold text-white">
              {typeof title === 'string' ? title : title}
            </Text>
            <Pressable
              onPress={toggleModal}
              className="h-8 w-8 items-center justify-center rounded-full"
            >
              <Text className="text-lg text-white/70">✕</Text>
            </Pressable>
          </View>
          {/* Content - scrollable */}
          <ScrollView 
            className="px-6 py-5"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  )
}

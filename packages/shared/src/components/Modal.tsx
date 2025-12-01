import type { ReactNode } from 'react'
import {
  Modal as RNModal,
  Pressable,
  Text,
  View,
  type ModalProps as RNModalProps
} from 'react-native'

interface ModalProps extends Omit<RNModalProps, 'visible'> {
  isOpen: boolean
  toggleModal: () => void
  title: ReactNode
  children: ReactNode
}

export function Modal({
  isOpen,
  toggleModal,
  title,
  children,
  ...props
}: ModalProps): ReactNode {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={toggleModal}
      {...props}
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="m-5 max-w-[450px] rounded-lg bg-[#121212] p-6 shadow-lg">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-medium text-white">
              {typeof title === 'string' ? title : title}
            </Text>
            <Pressable
              onPress={toggleModal}
              className="h-8 w-8 items-center justify-center rounded-full"
              accessibilityLabel="Close"
            >
              <Text className="text-xl text-white">✕</Text>
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  )
}

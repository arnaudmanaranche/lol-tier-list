import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  title: ReactNode
  children: ReactNode
}

export const Modal = ({
  isOpen,
  toggleModal,
  title,
  children
}: ModalProps): ReactNode => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-dark p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="mb-6 font-sans text-2xl font-medium leading-6 text-white">
            {title}
          </Dialog.Title>
          <Dialog.Description>{children}</Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-white"
              aria-label="Close"
              onClick={toggleModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

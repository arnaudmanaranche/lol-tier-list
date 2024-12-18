import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

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
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-dark bg-opacity-75"
        static
        open={isOpen}
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog onClose={toggleModal} className="fixed inset-0" />
          </TransitionChild>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-gunmetalDark p-6 text-left align-middle transition-all">
              <DialogTitle
                as="h3"
                className="mb-6 text-lg font-medium leading-6 text-white"
              >
                {title}
              </DialogTitle>
              {children}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

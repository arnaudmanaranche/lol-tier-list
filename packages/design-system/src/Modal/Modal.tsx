import { Dialog, Transition } from '@headlessui/react'
import type { ReactElement, ReactNode } from 'react'
import { Fragment } from 'react'

export interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  title: ReactNode
  children: ReactNode
}

export const Modal = ({ isOpen, toggleModal, title, children }: ModalProps): ReactElement => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-opacity-75 bg-dark"
        static
        open={isOpen}
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetalDark rounded-2xl">
              <Dialog.Title as="h3" className="mb-6 text-lg font-medium leading-6 text-white">
                {title}
              </Dialog.Title>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

import { expect } from '@storybook/jest'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { useState } from 'react'

import { Button } from '../Button'
import { Modal } from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {}
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleModal = () => setModalOpen((value) => !value)

  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Open modal
      </Button>
      <Modal title="Modal title" isOpen={isModalOpen} toggleModal={toggleModal}>
        Hello world
      </Modal>
      {/* Useful for @storybook/testing-library  */}
      <div id="headlessui-portal-root"></div>
    </>
  )
}

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByText('Open modal'))

  await waitFor(() => expect(canvas.getByText('Modal title')).toBeInTheDocument())
}

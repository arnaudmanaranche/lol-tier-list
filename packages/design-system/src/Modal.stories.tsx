import { expect } from '@storybook/jest'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { useState } from 'react'

import { Button } from './Button'
import { Modal } from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {}
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = () => {
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
        <p className="text-white">Hello world</p>
      </Modal>
      {/* Workaround for https://github.com/tailwindlabs/headlessui/discussions/666 */}
      <div id="headlessui-portal-root">
        {/* It needs at least one child, so that HeadlessUI doesn't remove this portal root workaround
        ( https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-react/src/components/portal/portal.tsx#L84 ) */}
        <div />
      </div>
    </>
  )
}

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByText('Open modal'))

  await waitFor(() => expect(canvas.getByText('Modal title')).toBeInTheDocument())
}

import type { Meta, StoryObj } from '@storybook/react'

import { Title } from './Title'

const meta = {
  title: 'Components/Title',
  component: Title
} satisfies Meta<typeof Title>

export default meta

type Story = StoryObj<typeof Title>

export const Primary = {
  args: {
    children: 'Hello world'
  }
} satisfies Story

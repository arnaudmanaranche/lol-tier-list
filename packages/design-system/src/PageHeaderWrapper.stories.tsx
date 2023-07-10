import type { Meta, StoryObj } from '@storybook/react'

import { PageHeaderWrapper } from './PageHeaderWrapper'

export default {
  title: 'Components/PageHeaderWrapper',
  component: PageHeaderWrapper
} satisfies Meta<typeof PageHeaderWrapper>

type Story = StoryObj<typeof PageHeaderWrapper>

export const Default = {
  args: {
    children: 'Hello world'
  }
} satisfies Story

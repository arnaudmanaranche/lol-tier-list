import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { RANKING_VALUES } from '@prodigy/types'

import { Select } from './Select'

export default {
  title: 'Components/Select',
  component: Select
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const WithoutValue = {
  args: {
    id: 1,
    name: 'Name',
    role: 'top'
  },
  play: async ({ canvasElement, args }) => {
    await userEvent.selectOptions(await within(canvasElement).findByTestId(`${args.id}_value`), [
      RANKING_VALUES.g
    ])
  }
} satisfies Story

export const WithValue = {
  args: {
    id: 1,
    name: 'Name',
    role: 'top',
    value: RANKING_VALUES.g,
    disabled: true
  }
} satisfies Story

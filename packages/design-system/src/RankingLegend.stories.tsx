import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { RankingLegend } from './RankingLegend'
import { legend } from './RankingLegend.helper'

export default {
  title: 'Components/RankingLegend',
  component: RankingLegend
} satisfies Meta<typeof RankingLegend>

type Story = StoryObj<typeof RankingLegend>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByTitle('Open ranking legend'))

    await waitFor(() =>
      legend.map(({ description }) => expect(canvas.getByText(description)).toBeInTheDocument())
    )
  }
} satisfies Story

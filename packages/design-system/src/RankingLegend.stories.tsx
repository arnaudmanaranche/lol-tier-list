import { expect } from '@storybook/jest'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { RankingLegend } from '../RankingLegend'
import { legend } from './RankingLegend.helper'

export default {
  title: 'Components/RankingLegend',
  component: RankingLegend,
  argTypes: {}
} as ComponentMeta<typeof RankingLegend>

const Template: ComponentStory<typeof RankingLegend> = () => <RankingLegend />

export const Default = Template.bind({})
Default.args = {}

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByTitle('Open ranking legend'))

  await waitFor(() =>
    legend.map(({ description }) => expect(canvas.getByText(description)).toBeInTheDocument())
  )
}

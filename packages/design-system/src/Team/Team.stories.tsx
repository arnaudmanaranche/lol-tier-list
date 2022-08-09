import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { RANKING_VALUES } from '@lpr/types'

import { Team } from './Team'

export default {
  title: 'Components/Team',
  component: Team,
  argTypes: {}
} as ComponentMeta<typeof Team>

const Template: ComponentStory<typeof Team> = (args) => <Team {...args} />

const args = {
  base64: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  logo: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  name: 'Team Name',
  players: [
    {
      id: 1,
      name: 'Zeus',
      role: 'top'
    },
    {
      id: 2,
      name: 'Jankos',
      role: 'jun'
    },
    {
      id: 3,
      name: 'Betsy',
      role: 'mid'
    },
    {
      id: 4,
      name: 'Rekkles',
      role: 'adc'
    },
    {
      id: 5,
      name: 'LIMIT',
      role: 'sup'
    }
  ],
  onUpdate: () => {}
}

export const Default = Template.bind({})
Default.args = {
  ...args
}
Default.play = async ({ canvasElement }) => {
  const players = args.players

  players.map(async (player) => {
    const pickRandom = Math.floor(Math.random() * Object.keys(RANKING_VALUES).length)

    const randomRankingValue =
      RANKING_VALUES[Object.keys(RANKING_VALUES)[pickRandom] as keyof typeof RANKING_VALUES]

    await userEvent.selectOptions(
      await within(canvasElement).findByTestId(`${player.name}_value`),
      [randomRankingValue]
    )
  })
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...args,
  disabled: true
}

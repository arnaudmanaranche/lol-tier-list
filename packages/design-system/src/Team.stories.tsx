import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { RANKING_VALUES } from '@lpr/types'

import { Team } from './Team'

export default {
  title: 'Components/Team',
  component: Team,
  args: {
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
    onUpdate: () => null
  }
} as ComponentMeta<typeof Team>

const Template: ComponentStory<typeof Team> = (args) => <Team {...args} />

export const Default = Template.bind({})

Default.play = async ({ canvasElement, args }) => {
  const randomRankingValue = (index: number) =>
    RANKING_VALUES[Object.keys(RANKING_VALUES)[index] as keyof typeof RANKING_VALUES]

  const players = args.players

  players.map(async (player, index) => {
    await userEvent.selectOptions(await within(canvasElement).findByTestId(`${player.id}_value`), [
      randomRankingValue(index)
    ])
  })

  await userEvent.selectOptions(await within(canvasElement).findByTestId(`${args.id}_value`), [
    randomRankingValue(0)
  ])
}

const TemplateDisable: ComponentStory<typeof Team> = (args) => <Team {...args} disabled />
export const Disabled = TemplateDisable.bind({})

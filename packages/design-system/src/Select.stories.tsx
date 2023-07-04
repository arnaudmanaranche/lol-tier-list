import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { RANKING_VALUES } from '@prodigy/types'

import { Select } from './Select'

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {}
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

const args = {
  id: 1,
  name: 'Name',
  role: 'top'
}

export const Default = Template.bind({})
Default.args = {
  ...args
}
Default.play = async ({ canvasElement }) => {
  await userEvent.selectOptions(await within(canvasElement).findByTestId(`${args.id}_value`), [
    RANKING_VALUES.g
  ])
}

export const WithValue = Template.bind({})
WithValue.args = {
  ...args,
  value: RANKING_VALUES.g,
  disabled: true
}

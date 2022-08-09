import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Error } from './Error'

export default {
  title: 'Components/Error',
  component: Error,
  argTypes: {}
} as ComponentMeta<typeof Error>

const Template: ComponentStory<typeof Error> = (args) => (
  <Error {...args}>Error when fetching API</Error>
)

export const Default = Template.bind({})

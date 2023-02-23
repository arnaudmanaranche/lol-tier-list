import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { PageHeaderWrapper } from './PageHeaderWrapper'

export default {
  title: 'Components/PageHeaderWrapper',
  component: PageHeaderWrapper,
  argTypes: {}
} as ComponentMeta<typeof PageHeaderWrapper>

const Template: ComponentStory<typeof PageHeaderWrapper> = (args) => (
  <PageHeaderWrapper {...args}>Hello world</PageHeaderWrapper>
)

export const Default = Template.bind({})

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tournament } from './Tournament'

export default {
  title: 'Components/Tournament',
  component: Tournament,
  argTypes: {}
} as ComponentMeta<typeof Tournament>

const Template: ComponentStory<typeof Tournament> = (args) => <Tournament {...args} />

export const Default = Template.bind({})
Default.args = {
  id: '1',
  logo: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  name: `LEC - summer (${new Date().getFullYear()})`,
  status: true,
  base64: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  year: new Date().getFullYear(),
  pandascoreId: 1
}

export const Soon = Template.bind({})
Soon.args = {
  id: '1',
  logo: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  name: `LEC - summer (${new Date().getFullYear()})`,
  status: false,
  base64: 'https://fakeimg.pl/440x320/282828/eae0d0/',
  year: new Date().getFullYear(),
  pandascoreId: 1
}

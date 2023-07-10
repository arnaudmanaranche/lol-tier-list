import type { ComponentMeta, ComponentStory, Meta, StoryObj } from '@storybook/react'

import { Tournament } from './Tournament'

export default {
  title: 'Components/Tournament',
  component: Tournament
} satisfies Meta<typeof Tournament>

type Story = StoryObj<typeof Tournament>

export const Default = {
  args: {
    id: '1',
    logo: 'https://fakeimg.pl/440x320/282828/eae0d0/',
    region: 'LEC',
    event: 'summer',
    active: true,
    logo_base64: 'https://fakeimg.pl/440x320/282828/eae0d0/',
    year: new Date().getFullYear()
  }
} satisfies Story

export const Disabled = {
  args: {
    id: '1',
    logo: 'https://fakeimg.pl/440x320/282828/eae0d0/',
    region: 'LEC',
    event: 'summer',
    active: false,
    logo_base64: 'https://fakeimg.pl/440x320/282828/eae0d0/',
    year: new Date().getFullYear()
  }
} satisfies Story

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RANKING_VALUES } from "@lpr/types";

import { Team } from "./Team";

export default {
  title: "Components/Team",
  component: Team,
  argTypes: {},
} as ComponentMeta<typeof Team>;

const Template: ComponentStory<typeof Team> = (args) => <Team {...args} />;

export const Default = Template.bind({});
Default.args = {
  base64: "https://fakeimg.pl/440x320/282828/eae0d0/",
  logo: "https://fakeimg.pl/440x320/282828/eae0d0/",
  name: "Team Name",
  players: [
    {
      id: 1,
      name: "Name",
      role: "top",
    },
    {
      id: 2,
      name: "Name",
      role: "jun",
    },
    {
      id: 3,
      name: "Name",
      role: "mid",
    },
    {
      id: 4,
      name: "Name",
      role: "adc",
    },
    {
      id: 5,
      name: "Name",
      role: "sup",
    },
  ],
  onUpdate: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  base64: "https://fakeimg.pl/440x320/282828/eae0d0/",
  logo: "https://fakeimg.pl/440x320/282828/eae0d0/",
  name: "Team Name",
  players: [
    {
      id: 1,
      name: "Name",
      role: "top",
      value: RANKING_VALUES.a,
    },
    {
      id: 2,
      name: "Name",
      role: "jun",
      value: RANKING_VALUES.b,
    },
    {
      id: 3,
      name: "Name",
      role: "mid",
      value: RANKING_VALUES.c,
    },
    {
      id: 4,
      name: "Name",
      role: "adc",
      value: RANKING_VALUES.d,
    },
    {
      id: 5,
      name: "Name",
      role: "sup",
      value: RANKING_VALUES.g,
    },
  ],
  onUpdate: () => {},
  disabled: true,
};

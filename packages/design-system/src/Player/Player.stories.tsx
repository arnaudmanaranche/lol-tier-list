import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RANKING_VALUES } from "@lpr/types";

import { Player } from "./Player";

export default {
  title: "Components/Player",
  component: Player,
  argTypes: {},
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: "Name",
  role: "top",
};

export const WithValue = Template.bind({});
WithValue.args = {
  id: 1,
  name: "Name",
  role: "top",
  value: RANKING_VALUES.g,
  disabled: true,
};

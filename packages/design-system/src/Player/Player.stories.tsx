import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { RANKING_VALUES } from "@lpr/types";

import { Player } from "./Player";

export default {
  title: "Components/Player",
  component: Player,
  argTypes: {},
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => <Player {...args} />;

const args = {
  id: 1,
  name: "Name",
  role: "top",
};

export const Default = Template.bind({});
Default.args = {
  ...args,
};
Default.play = async ({ canvasElement }) => {
  await userEvent.selectOptions(
    await within(canvasElement).findByTestId(`${args.name}_value`),
    [RANKING_VALUES.g]
  );
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...args,
  value: RANKING_VALUES.g,
  disabled: true,
};

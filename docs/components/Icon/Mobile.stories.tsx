import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Icon } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/Icon/Mobile",
  component: Icon,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof Icon>;

const BasicTemplate: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "gift",
};
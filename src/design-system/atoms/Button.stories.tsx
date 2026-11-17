import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { Icon } from "./Icon";

const meta = {
  title: "Design System/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "About",
    appearance: "plain",
    variant: "neutral",
    size: "small",
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["accent", "filled", "outlined", "filled-outlined", "plain"],
    },
    variant: {
      control: "select",
      options: ["neutral", "brand", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["xs", "s", "m", "l", "xl", "small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

export const FilledBrand: Story = {
  args: {
    appearance: "filled",
    variant: "brand",
    children: "Primary action",
  },
};

export const WithHref: Story = {
  args: {
    href: "/experience",
    children: "Experience",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Icon slot="start" name="arrow-left" />
      Go Back
    </Button>
  ),
};

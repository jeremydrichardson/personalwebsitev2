import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BackButton } from "./BackButton";

const meta = {
  title: "Design System/Molecules/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  args: {
    href: "/",
    label: "Go Back",
  },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: {
    label: "Back to posts",
    href: "/#posts",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Design System/Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: {
    name: "react",
    family: "brands",
    label: "React",
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: "2rem", color: "var(--text)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};

export const Classic: Story = {
  args: {
    name: "briefcase",
    family: "classic",
    label: "Briefcase",
  },
};

export const Row: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", fontSize: "2rem" }}>
      <Icon name="react" family="brands" label="React" />
      <Icon name="js" family="brands" label="JavaScript" />
      <Icon name="node-js" family="brands" label="Node" />
      <Icon name="git-alt" family="brands" label="Git" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionRule } from "./SectionRule";

const meta = {
  title: "Design System/Atoms/SectionRule",
  component: SectionRule,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
} satisfies Meta<typeof SectionRule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

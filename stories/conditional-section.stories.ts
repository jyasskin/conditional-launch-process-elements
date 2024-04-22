import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";

export default {
  component: "conditional-section",
} satisfies Meta;

type Story = StoryObj;

export const DefaultsToDontKnow: Story = {
  render: () => html`
    <launch-process>
      <conditional-section>Section content</conditional-section>
    </launch-process>
  `,
};

export const ShowsWhenSettingIsYes: Story = {
  render: () => html`
    <launch-process>
      <launch-setting name="setting" label="Should the section show?" default="yes"></launch-setting>
      <conditional-section condition="setting=yes"
        >Section content</conditional-section
      >
    </launch-process>
  `,
};

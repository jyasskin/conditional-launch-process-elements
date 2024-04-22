import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";

export default {
  component: "launch-setting",
} satisfies Meta;

type Story = StoryObj;

export const ShowsYesNoIDontKnow: Story = {
  render: ({ label }) => html`
    <launch-process>
      <launch-setting name="setting" label=${label}></launch-setting>
    </launch-process>
  `,
  args: {
    label: "Label",
  },
};

export const ShowsExplanationWithDontKnow: Story = {
  render: ({ label }) => html`
    <launch-process>
      <template slot="dontKnowMessage"
        >To figure this out, talk to your
        <a href="https://www.chromium.org/blink/spec-mentors/">spec mentor</a
        >.</template
      >
      <launch-setting name="setting" label=${label}></launch-setting>
    </launch-process>
  `,
  args: {
    label: "Label",
  },
};

export const CanOverrideOptions: Story = {
  render: () => html`
    <launch-process>
      <launch-setting name="type" label="Label">
        <option value="add">A new feature in the web platform</option>
        <option value="nochange">No change</option>
        <option value="remove">
          That a feature has been removed from the web platform
        </option>
      </launch-setting>
    </launch-process>
  `,
};

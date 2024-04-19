import { expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import "../src/conditional-section.js";
import { LaunchProcess } from "../src/launch-process.js";

it("doesn't know by default", async () => {
  const el = await fixture<LaunchProcess>(html`
    <launch-process>
      <conditional-section>Content</conditional-section>
    </launch-process>
  `);

  expect(el.querySelector("conditional-section")).shadowDom.to.equal(
    "<div class='dontknow'><slot></div>"
  );
});

import { StoreController } from "@nanostores/lit";
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { settings } from "./launch-settings.js";

@customElement("conditional-section")
export class ConditionalSection extends LitElement {
  static styles = css`
    .dontknow {
      background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='290'><text transform='rotate(-45)' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='50' y='120' opacity='.1'>Maybe</text></svg>");
      background-repeat: repeat;
      border: thin dashed red;
    }
    .hidden {
      display: none;
    }
  `;

  /**
   * Simple language of `setting=value`. This could get more complicated as we need more.
   *
   * If the setting has a value of "dontknow", the section will be shown with a "maybe" background
   * and dashed red border.
   */
  @property()
  condition: string | null = null;

  @state()
  settingName: string | null = null;

  @state()
  valueForShowing: string | null = null;

  private settingsController = new StoreController(this, settings);

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("condition")) {
      if (this.condition) {
        const pieces = this.condition.split("=");
        if (pieces.length === 2) {
          [this.settingName, this.valueForShowing] = pieces;
          return;
        }
      }
      this.settingName = null;
      this.valueForShowing = null;
    }
  }

  getPresentation(): "" | "dontknow" | "hidden" {
    let className: "" | "dontknow" | "hidden" = "dontknow";
    if (this.settingName && this.valueForShowing) {
      const settingValue = this.settingsController.value[this.settingName];
      if (settingValue === "dontknow") {
        className = "dontknow";
      } else if (settingValue === this.valueForShowing) {
        className = "";
      } else {
        className = "hidden";
      }
    }
    return className;
  }

  render() {
    return html`<div class=${this.getPresentation()}><slot></slot></div>`;
  }
}

import { consume } from "@lit/context";
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LaunchSettings, launchSettings } from "./launch-settings.js";

@customElement("conditional-section")
export class ConditionalSection extends LitElement {
  static styles = css`
    .dontknow {
      .unstable {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='290'><text transform='rotate(-45)' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='70' y='210' opacity='.1'>Maybe</text></svg>");
        background-repeat: repeat;
      }
    }
    .hidden {
      display: none;
    }
  `;

  @property()
  name: string | null = null;

  /**
   * Simple language of `setting=value`. This could get more complicated as we need more.
   *
   * If the setting has a value of "dontknow", the section will be shown with a
   */
  @property()
  condition: string | null = null;

  @consume({ context: launchSettings })
  @property({ attribute: false })
  private settings?: LaunchSettings;

  @state()
  settingName: string | null = null;

  @state()
  valueForShowing: string | null = null;

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

  render() {
    let className = "dontknow";
    if (this.name && this.settingName && this.valueForShowing) {
      const settingValue = this.settings?.setting(this.settingName);
      if (
        settingValue !== "dontknow" &&
        settingValue !== this.valueForShowing
      ) {
        className = "hidden";
      }
    }

    return html`<div class=${className}><slot></slot></div>`;
  }
}

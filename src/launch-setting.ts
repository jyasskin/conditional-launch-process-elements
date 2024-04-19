import { consume } from "@lit/context";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.js";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { LaunchSettings, launchSettings } from "./launch-settings.js";

@customElement("launch-setting")
export class LaunchSetting extends LitElement {
  static styles = css`
    :host {
      display: content;
    }
  `;

  @property()
  name: string | null = null;

  @property()
  label: string | null = null;

  @property()
  default: string = "dontknow";

  @consume({ context: launchSettings })
  @property({ attribute: false })
  private settings?: LaunchSettings;

  onSelected(e: Event & { target: SlSelect }) {
    if (this.name && this.settings) {
      this.settings.setSetting(this.name, e.target.value as string);
    }
  }

  render() {
    return html`<sl-select
      label=${ifDefined(this.label)}
      value=${this.default}
      @sl-input=${this.onSelected}
    >
      <slot>
        <sl-option value="yes">Yes</sl-option>
        <sl-option value="dontknow">I don't know yet</sl-option>
        <sl-option value="no">No</sl-option>
      </slot>
    </sl-select>`;
  }
}

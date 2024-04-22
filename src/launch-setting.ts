import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { LaunchSettings, launchSettings } from "./launch-settings.js";

@customElement("launch-setting")
export class LaunchSetting extends LitElement {
  static styles = css``;

  @property()
  name: string | null = null;

  @property()
  label: string | null = null;

  @property()
  default: string = "dontknow";

  @consume({ context: launchSettings })
  @property({ attribute: false })
  private settings?: LaunchSettings;

  onSelected(e: Event & { target: HTMLSelectElement }) {
    if (this.name && this.settings) {
      this.settings.setSetting(this.name, e.target.value as string);
    }
  }

  selectChanged(elem: Element | undefined): void {
    if (elem instanceof HTMLSelectElement && this.name) {
      const currentValue = this.settings?.setting(this.name) ?? this.default;
      for (const option of Array.from(elem.options)) {
        if (option.value === currentValue) {
          option.selected = true;
        }
      }
    }
  }

  render() {
    return html`
      <label
        >${this.label}
        <select
          value=${this.default}
          @input=${this.onSelected}
          ${ref(this.selectChanged)}
        >
          <slot>
            <option value="yes">Yes</option>
            <option value="dontknow">I don't know yet</option>
            <option value="no">No</option>
          </slot>
        </select></label
      >
    `;
  }
}

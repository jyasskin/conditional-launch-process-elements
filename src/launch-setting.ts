import { StoreController } from "@nanostores/lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { dontKnowMessage, settings } from "./launch-settings.js";

@customElement("launch-setting")
export class LaunchSetting extends LitElement {
  static styles = css``;

  @property()
  name: string | null = null;

  @property()
  label: string | null = null;

  @property()
  default: string = "dontknow";

  private dontKnowMessageController = new StoreController(
    this,
    dontKnowMessage,
  );

  @state()
  private value: string = this.default;

  onSelected(e: Event & { target: HTMLSelectElement }) {
    this.value = e.target.value;
    if (this.name) {
      settings.setKey(this.name, this.value);
    }
  }

  selectChanged(elem: Element | undefined): void {
    if (elem instanceof HTMLSelectElement && this.name) {
      const currentValue = settings.get()[this.name] ?? this.default;
      for (const option of Array.from(elem.options)) {
        if (option.value === currentValue) {
          option.selected = true;
        }
      }
    }
  }

  render() {
    if (!this.name) {
      console.error(this, "is missing its name attribute");
      return html``;
    }
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
      ${this.value === "dontknow" && this.dontKnowMessageController.value
        ? this.dontKnowMessageController.value.content.cloneNode(true)
        : nothing}
    `;
  }
}

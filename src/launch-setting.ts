import { StoreController } from "@nanostores/lit";
import { LitElement, css, html, nothing } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { dontKnowMessage, settings } from "./launch-settings.js";

@customElement("launch-setting")
export class LaunchSetting extends LitElement {
  static styles = css`
    .hidden {
      display: none;
    }
  `;

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

  @queryAssignedElements({ selector: "option", flatten: true })
  private slottedOptions!: HTMLOptionElement[];

  @state()
  private options: { value: string; text: string }[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    if (this.name) {
      settings.setKey(this.name, this.default);
    }
    this.updateOptions();
  }

  updateOptions(): void {
    const slottedOptions = this.slottedOptions;
    if (slottedOptions.length > 0) {
      this.options = slottedOptions
        .map(({ value, textContent }) => ({
          value,
          text: textContent ?? "",
        }))
        .filter(({ text }) => text !== "");
    } else {
      this.options = [
        { value: "yes", text: "Yes" },
        { value: "no", text: "No" },
      ];
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
        <select value=${this.default} @input=${this.onSelected}>
          <option value="dontknow" ?selected=${this.default === "dontknow"}>
            I don't know yet
          </option>
          ${this.options.map(
            ({ value, text }) =>
              html`<option value=${value} ?selected=${value === this.default}>
                ${text}
              </option>`,
          )}
        </select></label
      >
      ${this.value === "dontknow" && this.dontKnowMessageController.value
        ? this.dontKnowMessageController.value.content.cloneNode(true)
        : nothing}
      <div class="hidden">
        <slot @slotchange=${this.updateOptions}></slot>
      </div>
    `;
  }
}

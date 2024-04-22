import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { dontKnowMessage } from "./launch-settings.js";

@customElement("launch-process")
export class LaunchProcess extends LitElement {
  static styles = css`
    :host {
      display: content;
    }
  `;

  static updateDontKnowMessage(e: Event & { target: HTMLSlotElement }) {
    const templates = e.target.assignedElements({ flatten: true });
    if (templates[0] instanceof HTMLTemplateElement) {
      dontKnowMessage.set(templates[0]);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    dontKnowMessage.set(undefined);
  }

  render() {
    return html`<slot></slot
      ><slot
        name="dontKnowMessage"
        @slotchange=${LaunchProcess.updateDontKnowMessage}
      ></slot>`;
  }
}

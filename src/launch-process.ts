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

  connectedCallback() {
    super.connectedCallback();
    const message = this.querySelector(
      ":host > template[slot=dontKnowMessage]",
    );
    if (message instanceof HTMLTemplateElement) {
      dontKnowMessage.set(message);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    dontKnowMessage.set(undefined);
  }

  render() {
    return html`<slot></slot>`;
  }
}

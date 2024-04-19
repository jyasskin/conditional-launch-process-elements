import { provide } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LaunchSettings, launchSettings } from "./launch-settings.js";

@customElement("launch-process")
export class LaunchProcess extends LitElement {
  static styles = css`
    :host {
      display: content;
    }
  `;

  @provide({ context: launchSettings })
  private settings = new LaunchSettings();

  connectedCallback() {
    super.connectedCallback();
    this.settings.dontKnowMessage = this.querySelector(
      ":host > template[slot=dontKnowMessage]"
    );
  }

  render() {
    return html`<slot></slot>`;
  }
}

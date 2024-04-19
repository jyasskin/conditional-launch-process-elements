import { createContext } from "@lit/context";

export class LaunchSettings {
  private settings: Record<string, string>;

  constructor() {
    this.settings = {};
  }

  dontKnowMessage: HTMLTemplateElement | null = null;

  setting(name: string): string {
    return this.settings[name];
  }

  setSetting(name: string, value: string) {
    this.settings[name] = value;
  }
}

export const launchSettings = createContext<LaunchSettings>("launch-settings");

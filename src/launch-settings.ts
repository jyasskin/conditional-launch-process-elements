import { atom, map } from 'nanostores';

export const settings = map<Record<string, string>>({});

export const dontKnowMessage = atom<HTMLTemplateElement|undefined>(undefined);

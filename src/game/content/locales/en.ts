import type {hu} from './hu.ts';
/** Only extracted messages are translated; this is not full English gameplay. */
export const en:Record<keyof typeof hu,string> = {
  "save.unknownVersion": "unknown game version",
  "save.format": " (format: {format})",
  "save.versions": "Save: {saved}{format}. Current game: {current}.",
  "save.newer": "{versions} This save uses a newer, unsupported format or story version. Continue with a compatible game version. The save has not been modified.",
  "save.incompatible": "{versions} An incompatible update means this save can no longer be used. Start a new semester. The save has not been modified.",
  "save.invalid": "The save is corrupt or incomplete; it has not been loaded or modified. You can start a new semester.",
  "save.unavailable": "Browser save storage is unavailable. Check storage permissions; the save has not been modified.",
  "save.missing": "No save is available to continue."
};

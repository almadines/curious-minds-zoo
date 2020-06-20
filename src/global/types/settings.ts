import { SettingsEditorTemplate } from "./editor-template";
import { EnumerationInputOption } from "./enum-input-element";
import { BaseType } from "./baseType";
export enum FontFamilies {
  SegoeUI = "Segoe UI",
  Arial = "Arial",
  Georgia = "Georgia",
  Courier = "Courier",
  Times = "Times",
  Impact = "Impact",
  ComicSans = "Comic Sans MS",
}

export const fontFamilyEnumOptions = Object.values(FontFamilies).map(
  (fontFamilyValue: string): EnumerationInputOption =>
    new EnumerationInputOption(fontFamilyValue, fontFamilyValue)
);

export class Settings extends BaseType {
  constructor(
    id: string,
    public fontFamily: FontFamilies = FontFamilies.SegoeUI
  ) {
    super(id);
  }

  public static clone(json: Settings): Settings {
    return new Settings(json.id, json.fontFamily);
  }

  public static getNewEditorTemplate(): SettingsEditorTemplate {
    return new SettingsEditorTemplate();
  }

  public getEditorTemplate(): SettingsEditorTemplate {
    return new SettingsEditorTemplate(this);
  }
}

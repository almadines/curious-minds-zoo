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

export enum BooleanEnum {
  true = "true",
  false = "false",
}

export const booleanEnumOptions = Object.values(BooleanEnum).map(
  (booleanEnumValue: string): EnumerationInputOption =>
    new EnumerationInputOption(booleanEnumValue, booleanEnumValue)
);

export enum EditorButtonLocation {
  top = "top",
  bottom = "bottom",
}

export const EditorButtonLocationOptions = Object.values(
  EditorButtonLocation
).map(
  (buttonLocation: string): EnumerationInputOption =>
    new EnumerationInputOption(buttonLocation, buttonLocation)
);

export enum ColourEnum {
  black = "black",
  white = "white",
  purple = "purple",
  green = "green",
  blue = "blue",
  aqua = "aqua",
  pink = "pink",
}

export const ColourEnumOptions = Object.values(ColourEnum).map(
  (colour: string): EnumerationInputOption =>
    new EnumerationInputOption(colour, colour)
);

export class Settings extends BaseType {
  constructor(
    id: string,
    public fontFamily: FontFamilies = FontFamilies.SegoeUI,
    public editorButtonsAtTop: EditorButtonLocation = EditorButtonLocation.bottom,
    public expandableSideMenu: BooleanEnum = BooleanEnum.false,
    public backgroundColour: ColourEnum = ColourEnum.white,
    public textColour: ColourEnum = ColourEnum.black,
    public columnView: BooleanEnum = BooleanEnum.false
  ) {
    super(id);
  }

  public static clone(json: Settings): Settings {
    return new Settings(
      json.id,
      json.fontFamily,
      json.editorButtonsAtTop,
      json.expandableSideMenu,
      json.backgroundColour,
      json.textColour,
      json.columnView
    );
  }

  public static getNewEditorTemplate(): SettingsEditorTemplate {
    return new SettingsEditorTemplate();
  }

  public getEditorTemplate(): SettingsEditorTemplate {
    return new SettingsEditorTemplate(this);
  }
}

import { EditorElement } from "./create-element";
import { BaseType } from "./baseType";

export abstract class EditorTemplate {
  abstract fromData: (data: any) => BaseType | undefined;
  abstract dataTypeName: string;

  private cachedEditorElements: EditorElement[];

  constructor(EditorElements: EditorElement[]) {
    this.cachedEditorElements = EditorElements;
  }

  public getEditorElements(): EditorElement[] {
    return this.cachedEditorElements;
  }

  public reset(): void {
    this.cachedEditorElements.forEach((elem: EditorElement): void =>
      elem.reset()
    );
  }
}

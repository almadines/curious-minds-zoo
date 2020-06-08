import { CreateElement } from "./create-element";
import { BaseType } from "./baseType";

export abstract class EditorTemplate {
  abstract fromData: (data: any) => BaseType | undefined;
  abstract dataTypeName: string;

  private cachedEditorElements: CreateElement[];

  constructor(createElements: CreateElement[]) {
    this.cachedEditorElements = createElements;
  }

  public getEditorElements(): CreateElement[] {
    return this.cachedEditorElements;
  }

  public reset(): void {
    this.cachedEditorElements.forEach((elem: CreateElement): void =>
      elem.reset()
    );
  }
}

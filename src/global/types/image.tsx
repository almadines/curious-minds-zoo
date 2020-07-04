import * as React from "react";
import { AnimalType } from "./animals";
import { BaseType } from "./baseType";
import { ImageListElement } from "./list-element";
export abstract class Image extends BaseType {
  constructor(
    id: string,
    public img: string,
    public name: string,
    public type: string
  ) {
    super(id);
  }

  public render(): JSX.Element {
    return <img src={this.img} className="image" />;
  }

  public getListElement(onClickCallback?: () => void): ImageListElement {
    return new ImageListElement(this, onClickCallback);
  }
}

export class AnimalImage extends Image {
  constructor(
    id: string,
    public img: string,
    public name: string,
    public type: AnimalType
  ) {
    super(id, img, name, type);
  }

  public static clone(json: AnimalImage): AnimalImage {
    return new AnimalImage(json.id, json.img, json.name, json.type);
  }
}

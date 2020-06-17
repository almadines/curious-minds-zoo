import * as React from "react";
import { AppState } from "global/state/state";
import { connect } from "react-redux";
import { Image } from "global/types/image";
import memoizeOne from "memoize-one";
import "./image-input-field.scss";
import ListDisplay from "components/lists/list-display";
import { ImageListWrapper, ImageListElement } from "global/types/list-element";

interface ImageInputFieldProps {
  identifier: string;
  onChange: (newValue: string, identifier: string) => void;
  editMode: boolean;
  className?: string;
  initialValue?: string;
  required?: boolean;
  // from redux:
  allImagesMap?: Map<string, Image>;
}

interface ImageInputFieldState {
  selectedImage: string;
  optionsMenuExpanded: boolean;
}

class ImageInputField extends React.PureComponent<
  ImageInputFieldProps,
  ImageInputFieldState
> {
  private windowClickListener: () => void;
  // public static imageMemoiseGetter = memoizeOne(
  //   (imageMap: Map<string, Image>): Image[] => {
  //     return Array.from(imageMap.values());
  //   }
  // );

  constructor(props: ImageInputFieldProps) {
    super(props);
    this.state = {
      selectedImage: props.initialValue || "",
      optionsMenuExpanded: false,
    };
    this.props.onChange(this.props.initialValue || "", this.props.identifier);
    this.windowClickListener = (): void => {
      this.setOptionsMenuState(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("click", this.windowClickListener);
    }
  }

  public componentWillUnmount(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.windowClickListener);
    }
  }

  public static mapStateToProps(
    state: AppState,
    ownProps: ImageInputFieldProps
  ): any {
    return { allImagesMap: state.images };
  }

  public inputChanged(id: string): void {
    if (!this.props.editMode) {
      return;
    }

    this.setState({ selectedImage: id });
    this.props.onChange(id, this.props.identifier);
  }

  public setOptionsMenuState(newValue: boolean) {
    this.setState({ optionsMenuExpanded: newValue });
  }

  public toggleOptionsMenuState(event: Event): void {
    event.stopPropagation();
    this.setOptionsMenuState(!this.state.optionsMenuExpanded);
  }

  public render(): JSX.Element {
    const allImages = Array.from(this.props.allImagesMap.values());
    const wrappedImageList = new ImageListWrapper(
      allImages.map(
        (image: Image): ImageListElement =>
          image.getListElement(this.inputChanged.bind(this, image.id))
      )
    );
    const selectedImage = this.props.allImagesMap.get(this.state.selectedImage);

    const menuExpandedCss = this.state.optionsMenuExpanded ? "" : "hidden";
    const addButtonDisabled = allImages.length === 0;
    const inputSelector = this.props.editMode ? (
      <div className="image-input-selector">
        <button
          className={`btn ${
            addButtonDisabled ? "btd-secondary" : "btn-success"
          }`}
          onClick={this.toggleOptionsMenuState.bind(this)}
        >
          Add
        </button>
        <div className={`image-input-selector-contents ${menuExpandedCss}`}>
          <ListDisplay listElementWrapper={wrappedImageList} />
        </div>
      </div>
    ) : null;
    const imgage = !!selectedImage ? selectedImage.render() : null;

    return (
      <div className={`image-input-wrapper ${this.props.className}`}>
        <div className="image-input-header">{inputSelector}</div>
        <div className="image-input-display">{imgage}</div>
      </div>
    );
  }
}

const ConnectedImageInputField = connect(ImageInputField.mapStateToProps)(
  ImageInputField
);

export default ConnectedImageInputField;

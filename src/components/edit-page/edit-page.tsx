import * as React from "react";
import { connect } from "react-redux";
import { EditorElement } from "global/types/editor-element";
import { AppState } from "global/state/state";
import { ActionType } from "global/store/dispatchActions";
import { EditorTemplate } from "global/types/editor-template";
import "./edit-page.scss";

interface EditorPageProps {
  editorTemplate: EditorTemplate;
  dispatchFunction?: Function;
  editMode: boolean;
  onCancelCallback?: () => void;
  onSuccessCallback?: () => void;
  title?: string;
}

interface EditorPageState {
  currentData: any;
}

class EditPage extends React.PureComponent<EditorPageProps, EditorPageState> {
  public constructor(props: EditorPageProps) {
    super(props);

    this.state = { currentData: this.getInitialState(props) };
  }

  public getInitialState(props: EditorPageProps): any {
    const currentData: any = {};
    props.editorTemplate
      .getEditorElements()
      .forEach((elem: EditorElement): void => {
        if (!!elem.initialValue) {
          currentData[elem.identifier] = elem.initialValue;
        }
      });
    return currentData;
  }

  public onInputChange(newValue: string, identifier: string): void {
    const newData = { ...this.state.currentData };
    newData[identifier] = newValue;
    this.setState({ currentData: newData });
    console.log("edit page on input change set with data: ", newData);
  }

  public createObject(event: Event): void {
    event.stopPropagation();

    const newObject = this.props.editorTemplate.fromData(
      this.state.currentData
    );
    if (!!newObject && this.props.dispatchFunction) {
      this.props.editorTemplate.reset(); // replace later with callback function!
      this.props.dispatchFunction({
        type: ActionType.add,
        values: [newObject],
        names: [this.props.editorTemplate.dataTypeName],
      });
      this.setState({ currentData: this.getInitialState(this.props) });

      if (this.props.onSuccessCallback) {
        this.props.onSuccessCallback();
      }
    } else {
      console.warn("Unable to create object!, Invalid  or incomplete data!");
    }
  }

  public cancel(event: Event): void {
    event.stopPropagation();
    this.props.editorTemplate.reset(); // replace later with callback function!
    this.setState({ currentData: this.getInitialState(this.props) });
    if (!!this.props.onCancelCallback) {
      this.props.onCancelCallback();
    }
  }

  public static mapStateToProps(state: AppState): any {
    return {};
  }

  public static mapDispatchToProps(dispatch: any): any {
    return {
      dispatchFunction: dispatch,
    };
  }

  public render(): JSX.Element {
    const submitButton = this.props.editMode ? (
      <button
        className="btn btn-success edit-page-button"
        onClick={this.createObject.bind(this)}
      >
        Submit
      </button>
    ) : null;

    const cancelButton = this.props.editMode ? (
      <button
        className="btn btn-danger edit-page-button"
        onClick={this.cancel.bind(this)}
      >
        Cancel
      </button>
    ) : null;

    const title = this.props.title ? (
      <h3 className="display-8">{this.props.title}</h3>
    ) : null;

    return (
      <div className="edit-wrapper">
        {title}
        <div className="edit-page-contents">
          {this.props.editorTemplate
            .getEditorElements()
            .map(
              (EditorElement: EditorElement): JSX.Element =>
                EditorElement.render(
                  this.props.editMode,
                  this.onInputChange.bind(this)
                )
            )}
        </div>
        <div className="edit-page-buttons-wrapper">
          {cancelButton}
          {submitButton}
        </div>
      </div>
    );
  }
}

const ConnectedEditPage = connect(
  EditPage.mapStateToProps,
  EditPage.mapDispatchToProps
)(EditPage);

export default ConnectedEditPage;

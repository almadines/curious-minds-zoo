import * as React from "react";
import { connect } from "react-redux";
import { EditorElement } from "global/types/editor-element";
import { AppState } from "global/state/state";
import { ActionType } from "global/store/dispatchActions";
import { EditorTemplate } from "global/types/editor-template";
import "./edit-page.scss";
import { ErrorObject } from "global/types/error-object";
import { BaseType } from "global/types/baseType";
import { isEqual } from "lodash";

interface EditorPageProps {
  editorTemplate: EditorTemplate;
  editMode: boolean;
  onCancelCallback?: () => void;
  onSuccessCallback?: () => void;
  title?: string;
  autoUpdateOnChange?: boolean; // NOTE: hides the submit and cancel buttons and causes the success and cancel callbacks to be ignored.
  // from redux
  dispatchFunction?: Function;
}

interface EditorPageState {
  currentData: any;
  errors: ErrorObject[];
}

class EditPage extends React.PureComponent<EditorPageProps, EditorPageState> {
  public constructor(props: EditorPageProps) {
    super(props);

    const dryRunResult = this.props.editorTemplate.convertDataToObject(
      this.getInitialState(props)
    );
    const initialErrors = !(dryRunResult instanceof BaseType)
      ? dryRunResult
      : [];

    this.state = {
      currentData: this.getInitialState(props),
      errors: initialErrors,
    };
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
    if (!isEqual(newData, this.state.currentData)) {
      const dryRunResult = this.props.editorTemplate.convertDataToObject(
        newData
      );
      const errors = !(dryRunResult instanceof BaseType) ? dryRunResult : [];

      this.setState({ currentData: newData, errors });
    }
  }

  public createObject(event: Event): void {
    event.stopPropagation();

    const result = this.props.editorTemplate.convertDataToObject(
      this.state.currentData
    );

    if (result instanceof BaseType) {
      if (!!result && this.props.dispatchFunction) {
        this.props.editorTemplate.reset(); // replace later with callback function!
        this.props.dispatchFunction({
          type: ActionType.add,
          values: [result],
          names: [this.props.editorTemplate.dataTypeName],
        });
        this.setState({ currentData: this.getInitialState(this.props) });

        if (this.props.onSuccessCallback) {
          this.props.onSuccessCallback();
        }
      } else {
        console.warn("Unable to create object!, Invalid  or incomplete data!");
      }
    } else {
      this.setState({ errors: result });
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
        <i className="material-icons layout-link-icon">add</i>Submit
      </button>
    ) : null;

    const cancelButton = this.props.editMode ? (
      <button
        className="btn btn-danger edit-page-button"
        onClick={this.cancel.bind(this)}
      >
        <i className="material-icons layout-link-icon">close</i>Cancel
      </button>
    ) : null;

    const title = this.props.title ? (
      <h3 className="display-8">{this.props.title}</h3>
    ) : null;

    return (
      <div className="edit-wrapper">
        {title}
        <div className="edit-page-contents">
          {this.props.editorTemplate.getEditorElements().map(
            (editorElement: EditorElement): JSX.Element => {
              const error = this.state.errors.find(
                (error: ErrorObject): boolean =>
                  error.inputIdentifier === editorElement.identifier
              );

              return editorElement.render(
                this.props.editMode,
                this.onInputChange.bind(this),
                error
              );
            }
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

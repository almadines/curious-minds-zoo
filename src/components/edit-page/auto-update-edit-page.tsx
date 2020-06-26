import * as React from "react";
import { connect } from "react-redux";
import { EditorElement } from "global/types/editor-element";
import { AppState } from "global/state/state";
import { ActionType } from "global/store/dispatchActions";
import { EditorTemplate } from "global/types/editor-template";
import { ErrorObject } from "global/types/error-object";
import { BaseType } from "global/types/baseType";
import { isEqual } from "lodash";
import "./edit-page.scss";

interface AutoUpdateEditorPageProps {
  editorTemplate: EditorTemplate;
  editMode: boolean;
  title?: string;
  // from redux
  dispatchFunction?: Function;
}

interface AutoUpdateEditorPageState {
  currentData: any;
  errors: ErrorObject[];
}

class AutoUpdateEditPage extends React.PureComponent<
  AutoUpdateEditorPageProps,
  AutoUpdateEditorPageState
> {
  public constructor(props: AutoUpdateEditorPageProps) {
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

  public getInitialState(props: AutoUpdateEditorPageProps): any {
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
      this.createObject(newData);
    }
  }

  public createObject(currentData: any): void {
    const result = this.props.editorTemplate.convertDataToObject(currentData);

    if (result instanceof BaseType) {
      if (!!result && this.props.dispatchFunction) {
        this.props.editorTemplate.reset(); // replace later with callback function!
        this.props.dispatchFunction({
          type: ActionType.add,
          values: [result],
          names: [this.props.editorTemplate.dataTypeName],
        });
        this.setState({ currentData: this.getInitialState(this.props) });
      } else {
        console.warn("Unable to create object!, Invalid  or incomplete data!");
      }
    } else {
      this.setState({ errors: result });
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
    const title = this.props.title ? (
      <h3 className="display-8">{this.props.title}</h3>
    ) : null;

    return (
      <div className="edit-page-wrapper">
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
      </div>
    );
  }
}

const ConnectedAutoUpdateEditPage = connect(
  AutoUpdateEditPage.mapStateToProps,
  AutoUpdateEditPage.mapDispatchToProps
)(AutoUpdateEditPage);

export default ConnectedAutoUpdateEditPage;

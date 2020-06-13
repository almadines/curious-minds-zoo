import * as React from "react";
import { connect } from "react-redux";
import { EditorElement } from "global/types/editor-element";
import { AppState } from "global/state/state";
import { ActionType } from "global/store/dispatchActions";
import { EditorTemplate } from "global/types/editor-template";

interface EditorPageProps {
  editorTemplate: EditorTemplate;
  dispatchFunction?: Function;
  editMode: boolean;
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
    } else {
      console.warn("Unable to create object!, Invalid  or incomplete data!");
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
      <button onClick={this.createObject.bind(this)}>Submit</button>
    ) : null;

    return (
      <div className="edit-wrapper">
        {this.props.editorTemplate
          .getEditorElements()
          .map(
            (EditorElement: EditorElement): JSX.Element =>
              EditorElement.render(
                this.props.editMode,
                this.onInputChange.bind(this)
              )
          )}
        {submitButton}
      </div>
    );
  }
}

const ConnectedEditPage = connect(
  EditPage.mapStateToProps,
  EditPage.mapDispatchToProps
)(EditPage);

export default ConnectedEditPage;

import * as React from "react";
import { connect } from "react-redux";
import { CreateElement } from "global/types/create-element";
import { AppState } from "global/state/state";
import { ActionType } from "global/store/dispatchActions";

interface CreatePageProps {
  createElements: CreateElement[];
  dataConstructionFunction: (data: any) => any;
  dataTypeName: string;
  dispatchFunction?: Function;
}

interface CreatePageState {
  currentData: any;
}

class CreatePage extends React.PureComponent<CreatePageProps, CreatePageState> {
  public constructor(props: any) {
    super(props);

    this.state = { currentData: {} };
  }

  public onInputChange(newValue: string, identifier: string): void {
    const newData = { ...this.state.currentData };
    newData[identifier] = newValue;
    this.setState({ currentData: newData });
  }

  public createObject(event: Event): void {
    event.stopPropagation();

    const newObject = this.props.dataConstructionFunction(
      this.state.currentData
    );
    if (!!newObject && this.props.dispatchFunction) {
      this.props.createElements.forEach((createElement: CreateElement): void =>
        createElement.reset()
      );
      this.props.dispatchFunction({
        type: ActionType.add,
        values: [newObject],
        names: [this.props.dataTypeName],
      });
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
    return (
      <div className="create-wrapper">
        {this.props.createElements.map(
          (createElement: CreateElement): JSX.Element =>
            createElement.render(this.onInputChange.bind(this))
        )}
        <button onClick={this.createObject.bind(this)}>Submit</button>
      </div>
    );
  }
}

const ConnectedCreatePage = connect(
  CreatePage.mapStateToProps,
  CreatePage.mapDispatchToProps
)(CreatePage);

export default ConnectedCreatePage;

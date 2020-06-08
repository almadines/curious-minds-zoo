import * as React from "react";
import { connect } from "react-redux";
import { CreateElement } from "global/types/create-element";
import { AppState } from "global/state/state";
import { Layout } from "components/layout/layout";
import { ActionType } from "global/store/dispatchActions";

interface CreatePageProps {
  createElements: CreateElement[];
  dataConstructionFunction: (data: any) => any;
  dataTypeName: string;
  dispatchFunction?: Function;
}

interface CreatePageState {
  newObject?: any;
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
    const newObject = this.props.dataConstructionFunction(newData);

    this.setState({ currentData: newData, newObject: newObject });
  }

  public createObject(event: Event): void {
    event.stopPropagation();
    if (!!this.state.newObject && this.props.dispatchFunction) {
      this.props.dispatchFunction({
        type: ActionType.add,
        values: [this.state.newObject],
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

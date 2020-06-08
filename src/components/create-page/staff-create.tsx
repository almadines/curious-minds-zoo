import * as React from "react";
import { TextInputFieldType } from "components/input-fields/text-input-field";
import {
  CreateElement,
  TextInputCreateElement,
} from "global/types/create-element";
import ConnectedCreatePage from "components/create-page/create-page";
import { Staff } from "global/types/staff";

interface StaffCreateProps {}

interface StaffCreateState {
  createElements: CreateElement[];
}

class StaffCreate extends React.PureComponent<
  StaffCreateProps,
  StaffCreateState
> {
  public constructor(props: any) {
    super(props);

    this.state = {
      createElements: [
        new TextInputCreateElement(
          "name",
          TextInputFieldType.input,
          true,
          "Name"
        ),
        new TextInputCreateElement(
          "salary",
          TextInputFieldType.input,
          true,
          "Salary"
        ),
        new TextInputCreateElement(
          "description",
          TextInputFieldType.textarea,
          false,
          "Description"
        ),
      ],
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1 className="display-1">Register Staff:</h1>
        <ConnectedCreatePage
          createElements={this.state.createElements}
          dataConstructionFunction={Staff.fromData}
          dataTypeName={Staff.name}
        />
      </div>
    );
  }
}

export default StaffCreate;

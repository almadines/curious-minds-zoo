// import * as React from "react";
// import { TextInputFieldType } from "components/input-fields/text-input-field";
// import {
//   CreateElement,
//   TextInputCreateElement,
// } from "global/types/create-element";
// import ConnectedCreatePage from "components/create-page/create-page";
// import { Exhibit } from "global/types/exhibit";

// interface ExhibitCreateProps {}

// interface ExhibitCreateState {
//   createElements: CreateElement[];
// }

// class ExhibitCreate extends React.PureComponent<
//   ExhibitCreateProps,
//   ExhibitCreateState
// > {
//   public constructor(props: any) {
//     super(props);

//     this.state = {
//       createElements: [
//         new TextInputCreateElement("name", TextInputFieldType.input, true),
//         new TextInputCreateElement(
//           "description",
//           TextInputFieldType.textarea,
//           false
//         ),
//       ],
//     };
//   }

//   public render(): JSX.Element {
//     return (
//       <div>
//         <h1 className="display-1">Create Exhibit:</h1>
//         <ConnectedCreatePage
//           createElements={this.state.createElements}
//           dataConstructionFunction={Exhibit.fromData}
//           dataTypeName={Exhibit.name}
//         />
//       </div>
//     );
//   }
// }

// export default ExhibitCreate;

// import * as React from "react";
// import { Animal } from "global/types/animals";
// import { TextInputFieldType } from "components/input-fields/text-input-field";
// import {
//   CreateElement,
//   TextInputCreateElement,
// } from "global/types/create-element";
// import ConnectedCreatePage from "components/create-page/create-page";

// interface AnimalCreateProps {}

// interface AnimalCreateState {
//   createElements: CreateElement[];
// }

// class AnimalCreate extends React.PureComponent<
//   AnimalCreateProps,
//   AnimalCreateState
// > {
//   public constructor(props: any) {
//     super(props);

//     this.state = {
//       createElements: Animal.createElements(),
//     };
//   }

//   public render(): JSX.Element {
//     return (
//       <div>
//         <h1 className="display-1">Create Animal:</h1>
//         <ConnectedCreatePage
//           createElements={this.state.createElements}
//           dataConstructionFunction={Animal.fromData}
//           dataTypeName={Animal.name}
//         />
//       </div>
//     );
//   }
// }

// export default AnimalCreate;

import * as React from "react";
import { Layout } from "../components/layout/layout";
import { Animal } from "../global/types/animals";
import { TextInputFieldType } from "components/input-fields/text-input-field";
import memoize from "memoize-one";
import {
  CreateElement,
  TextInputCreateElement,
} from "global/types/create-element";
import ConnectedCreatePage from "components/create-page/create-page";

interface AnimalCreatePageProps {}

interface AnimalCreatePageState {
  createElements: CreateElement[];
}

class AnimalCreatePage extends React.PureComponent<
  AnimalCreatePageProps,
  AnimalCreatePageState
> {
  public constructor(props: any) {
    super(props);

    this.state = {
      createElements: [
        new TextInputCreateElement("type", TextInputFieldType.input, true),
        new TextInputCreateElement("name", TextInputFieldType.input, true),
        new TextInputCreateElement("gender", TextInputFieldType.input, true),
        new TextInputCreateElement(
          "description",
          TextInputFieldType.textarea,
          false
        ),
      ],
    };
  }

  public render(): JSX.Element {
    const dataConstructionFunction = memoize((): ((
      data: any
    ) => any) => (data: any): any => {
      if (!!data["type"] && !!data["name"] && !!data["gender"]) {
        return new Animal(
          data["type"],
          data["name"],
          data["gender"],
          data["description"]
        );
      } else {
        console.warn(
          "invalid or incomplete data when attempting to create an animal!"
        );

        return undefined;
      }
    });

    return (
      <Layout>
        <h1 className="display-1">Create Animal:</h1>
        <ConnectedCreatePage
          createElements={this.state.createElements}
          dataConstructionFunction={dataConstructionFunction}
          dataTypeName={Animal.name}
        />
      </Layout>
    );
  }
}

export default AnimalCreatePage;

import * as React from "react";
import ConnectedViewEditorPage from "components/detail-page/view-editor-page";
import styled from "styled-components";

const CenteringDiv = styled.div`
  display: flex;
  justify-content: center;
`;

class MainPageContent extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <div>
        <h6>View Mode:</h6>
        <CenteringDiv>
          <ConnectedViewEditorPage />
        </CenteringDiv>
        <h6 className=" text-block">Letter from the director:</h6>
        <p className="preserve-white-space">
          {`Dear Staff,

In order to boost our zoo attendance this season, we’re looking into diversifying our animal enclosures. By mix-and-matching our animal combinations, we’re hoping to draw visitors in with the promise of unique animal interactions, whilst allowing them to learn about the symbiotic relations between different species in the same environment.

I’m hoping you can help me out by organising some of the animals into new enclosures and giving these enclosures new and exciting names. 

A few things to consider:
`}
        </p>
        <ul>
          <li>
            Do not mix predator and prey animals. We don’t need a repeat of the
            2017 emu incident...
          </li>
          <li>
            Be mindful of natural habitats. Baboons will not fare well in
            Antarctic tundra, nor will penguins be happy in the treetops.{" "}
          </li>
          <li>
            Also consider the animals that are not so happy to be in each
            other's company (elephants and mice, for example).
          </li>
          <li>
            Test the limits for new and interesting interactions. Everyone has
            seen the old lion and tiger combo… we want to spice things up!{" "}
          </li>
        </ul>
        <p className="preserve-white-space">
          {`(We’re also organising an animal transfer with Sydney Zoo shortly, so if you can think of any new species to have in the enclosures, feel free to add them with a new name in the Animals section of the webpage.)

Jane from IT has been kind enough to set up this platform to arrange the new animals. Let me know if you have any issues with it!


Thanks,
Mr J. Catsby`}
        </p>
      </div>
    );
  }
}

export default MainPageContent;

import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { useState } from "react";
import { MeetingInformations } from "./MeetingInformations";
import { MeetingButton } from "./MeetingButton";

export function	MeetingSettings({ setGenerate, currQuestion, setCurrQuestion }) {
	const	[context, setContext] = useState({
		administrations: [],
		themes: [],
	});
	
	return <GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<MeetingInformations
				setCurrQuestion={setCurrQuestion}
				setContext={setContext}
			/>
			<MeetingButton
				isDisable={currQuestion.length === 0}
				currQuestion={currQuestion}
				setGenerate={setGenerate}
				context={context}
			/>
		</GlobalDiv>
	</GlobalRowContainer>
}
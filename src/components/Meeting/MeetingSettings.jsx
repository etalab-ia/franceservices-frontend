import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingInformations } from "./MeetingInformations";
import { MeetingButton } from "./MeetingButton";

export function	MeetingSettings({ setGenerate, currQuestion, setCurrQuestion, context, setContext }) {	
	return <GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<MeetingInformations
				currQuestion={currQuestion}
				setCurrQuestion={setCurrQuestion}
				context={context}
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
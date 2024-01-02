import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingInformations } from "./MeetingInformations";
import { MeetingButton } from "./MeetingButton";

/*****************************************************************************************************
	
	VARIABLES:

	**	generate: to determine whether the user is in the description or stream phase
			true: user entered prompt informations & click on generate button
			false:
				- user has just arrived on the meeting page
				- OR clicked on the modify button. If so, emitCloseStream is called
	
	**	currQuestion: description provided by the user
	**	context: additional informations provided by the user: administrations and themes tags

	-------------------------------------------------------------------------------------------------

	COMPONENTS:

	**	MeetingInformations: set current question & context (administrations / themes) from user input

	**	MeetingInformations: set current question & context (administrations / themes) from user input
			! Meeting generation button is disable when current question is empty

 *****************************************************************************************************/

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
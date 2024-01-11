import { GlobalDiv } from "../Global/GlobalDiv"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { MeetingInformations } from "./MeetingInformations"
import { MeetingButton } from "./MeetingButton"

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

	**	MeetingButton: setGenerate to true to switch to meeting stream page onClick
			! Meeting generation button is disable when current question is empty

 *****************************************************************************************************/

export function MeetingSettings({ setGenerate, context, setContext }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<GlobalDiv>
				<MeetingInformations context={context} setContext={setContext} />
				<MeetingButton setGenerate={setGenerate} context={context} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}

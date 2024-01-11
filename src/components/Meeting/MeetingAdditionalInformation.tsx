import { GlobalColContainer } from "../Global/GlobalColContainer"
import { GlobalSubtitle } from "../Global/GlobalSubtitle"
import { meetingInformations } from "../../constants/meeting"
import { MeetingAdditionalInput } from "./MeetingAdditionalInput"
import { MeetingDefaultQuestions } from "./MeetingDefaultQuestions"

/**********************************************************************************************
	
	COMPONENTS:
	
	**	MeetingAdditionalInput: set context from user input
	
	**	MeetingDefaultQuestions: proposes default questions to user and set context onClick()

 **********************************************************************************************/

export function MeetingAdditionalInformations({ context, setContext }) {
	return (
		<GlobalColContainer>
			<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
			<MeetingAdditionalInput context={context} setContext={setContext} />
			<MeetingDefaultQuestions setContext={setContext} />
		</GlobalColContainer>
	)
}

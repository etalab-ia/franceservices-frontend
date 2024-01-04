import { meetingTitle } from "../../constants/meeting";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingAdditionalInformations } from "./MeetingAdditionalInformation";
import { MeetingMainInformations } from "./MeetingMainInformations";
import { GlobalTitle } from "../Global/GlobalTitle";

/******************************************************************************
	
	COMPONENTS:
	
	**	MeetingMainInformations: set current question / user description

	**	MeetingAdditionalInformations: set context / administrations & themes

 ******************************************************************************/

export function MeetingInformations({ currQuestion, setCurrQuestion, context, setContext }) {
	return <>
		<GlobalTitle>{meetingTitle}</GlobalTitle>
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			<MeetingMainInformations
				currQuestion={currQuestion}
				setCurrQuestion={setCurrQuestion}
			/>
			<MeetingAdditionalInformations
				context={context}
				setCurrQuestion={setCurrQuestion}
				setContext={setContext}
			/>
		</GlobalRowContainer>
	</>
}
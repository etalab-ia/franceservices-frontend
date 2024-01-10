import { meetingTitle } from "../../constants/meeting"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { MeetingAdditionalInformations } from "./MeetingAdditionalInformation"
import { MeetingMainInformations } from "./MeetingMainInformations"
import { GlobalTitle } from "../Global/GlobalTitle"

/******************************************************************************
	
	COMPONENTS:
	
	**	MeetingMainInformations: set current question / user description

	**	MeetingAdditionalInformations: set context / administrations & themes

 ******************************************************************************/

export function MeetingInformations({ context, setContext }) {
	return (
		<>
			<GlobalTitle>{meetingTitle}</GlobalTitle>
			<GlobalRowContainer extraClass="fr-grid-row--center">
				<MeetingMainInformations />
				<MeetingAdditionalInformations context={context} setContext={setContext} />
			</GlobalRowContainer>
		</>
	)
}

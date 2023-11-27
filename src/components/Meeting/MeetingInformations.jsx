import { meetingTitle } from "../../constants/meeting";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingAdditionalInformations } from "./MeetingAdditionalInformation";
import { MeetingMainInformations } from "./MeetingMainInformations";
import { GlobalTitle } from "../Global/GlobalTitle";

export function MeetingInformations({ setCurrQuestion }) {
	return <>
		<GlobalTitle>{meetingTitle}</GlobalTitle>
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			<MeetingMainInformations setCurrQuestion={setCurrQuestion}/>
			<MeetingAdditionalInformations />
		</GlobalRowContainer>
	</>
}
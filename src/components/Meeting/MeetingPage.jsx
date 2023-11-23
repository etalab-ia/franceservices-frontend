import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingAppointmentInformations } from "../../constants/meeting";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { MeetingSeparator } from "./MeetingSeparator";
import { MeetingResponse } from "./MeetingResponse";

export function MeetingPage({ currQuestion }) {
	return <GlobalRowContainer>
		<GlobalDiv>
			<GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
			<div className="fr-pb-3w"><GlobalParagraph>{currQuestion}</GlobalParagraph></div>
			<MeetingResponse currQuestion={currQuestion}/>
		</GlobalDiv>
	</GlobalRowContainer>
}
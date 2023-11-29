import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingAppointmentInformations } from "../../constants/meeting";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { MeetingResponse } from "./MeetingResponse";
import { MeetingEditQuestion } from "./MeetingEditQuestion";

export function MeetingPage({ currQuestion, setGenerate }) {
	return <GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
			<GlobalParagraph>{currQuestion}</GlobalParagraph>
			<MeetingEditQuestion setGenerate={setGenerate}/>
			<MeetingResponse currQuestion={currQuestion}/>
		</GlobalDiv>
	</GlobalRowContainer>
}
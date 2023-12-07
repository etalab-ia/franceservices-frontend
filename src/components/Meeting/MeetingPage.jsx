import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingAppointmentInformations } from "../../constants/meeting";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { MeetingResponse } from "./MeetingResponse";
import { MeetingEditQuestion } from "./MeetingEditQuestion";

export function MeetingPage({ currQuestion, setGenerate, archive }) {
	return <GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
			<GlobalParagraph>{currQuestion}</GlobalParagraph>
			{!archive && <MeetingEditQuestion setGenerate={setGenerate}/>}
			{archive && <div className="fr-pt-2w"></div>}
			<MeetingResponse currQuestion={currQuestion} archive={archive}/>
		</GlobalDiv>
	</GlobalRowContainer>
}
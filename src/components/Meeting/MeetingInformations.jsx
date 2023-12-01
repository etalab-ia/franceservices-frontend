import { meetingTitle } from "../../constants/meeting";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingAdditionalInformations } from "./MeetingAdditionalInformation";
import { MeetingMainInformations } from "./MeetingMainInformations";
import { GlobalTitle } from "../Global/GlobalTitle";

export function MeetingInformations({ currQuestion, setCurrQuestion, context, setContext }) {
	return <>
		<GlobalTitle>{meetingTitle}</GlobalTitle>
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			<MeetingMain	Informations
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
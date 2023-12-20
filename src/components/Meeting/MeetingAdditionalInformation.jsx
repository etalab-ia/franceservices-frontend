import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingInformations } from "../../constants/meeting";
import { MeetingAdditionalInput } from "./MeetingAdditionalInput";
import { MeetingDefaultQuestions } from "./MeetingDefaultQuestions";

export function MeetingAdditionalInformations({ setCurrQuestion, context, setContext }) {
	return <GlobalColContainer>
		<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
		<MeetingAdditionalInput
			context={context}
		/>
		<MeetingDefaultQuestions
			setCurrQuestion={setCurrQuestion}
			setContext={setContext}
		/>
	</GlobalColContainer>
}
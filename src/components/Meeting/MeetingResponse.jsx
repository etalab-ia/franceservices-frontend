import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingMainResponse } from "./MeetingMainResponse";
import { MeetingAdditionalResponse } from "./MeetingAdditionalResponse";

export function MeetingResponse() {
	return <GlobalRowContainer>
		<MeetingMainResponse/>
		<MeetingAdditionalResponse/>
	</GlobalRowContainer>
}
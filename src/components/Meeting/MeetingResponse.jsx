import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { MeetingMainResponse } from "./MeetingMainResponse";
import { MeetingAdditionalResponse } from "./MeetingAdditionalResponse";

export function MeetingResponse({ currQuestion }) {
	return <GlobalRowContainer>
		<MeetingMainResponse/>
		<MeetingAdditionalResponse currQuestion={currQuestion}/>
	</GlobalRowContainer>
}
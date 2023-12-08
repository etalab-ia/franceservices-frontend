import { GlobalColContainer } from "../Global/GlobalColContainer";
import { MeetingStream } from "./MeetingStream";
import { MeetingQR } from "./MeetingQR";

export function MeetingMainResponse({ archive }) {
	return <GlobalColContainer>
		<MeetingStream
			archive={archive}
		/>
		<MeetingQR 
			archive={archive}
		/>
	</GlobalColContainer>
}
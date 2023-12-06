import { GlobalColContainer } from "../Global/GlobalColContainer";
import { MeetingStream } from "./MeetingStream";
import { MeetingQR } from "./MeetingQR";

export function MeetingMainResponse() {
	return <GlobalColContainer>
		<MeetingStream />
		<MeetingQR />
	</GlobalColContainer>
}
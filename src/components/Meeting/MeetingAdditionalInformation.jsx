import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingInformations } from "../../constants/meeting";
import { MeetingAdditionalInput } from "./MeetingAdditionalInput";

export function MeetingAdditionalInformations({ setContext }) {

	return <GlobalColContainer>
		<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
		<MeetingAdditionalInput setContext={setContext}/>
	</GlobalColContainer>
}
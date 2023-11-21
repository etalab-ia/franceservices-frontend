import { meetingInformations, meetingSubtitle } from "../../constants/meeting";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";

export function	MeetingSettingsTitles() {
    return <GlobalRowContainer>
		<GlobalColContainer>
			<GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
		</GlobalColContainer>
		<GlobalColContainer>
			<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
		</GlobalColContainer>
	</GlobalRowContainer>
}
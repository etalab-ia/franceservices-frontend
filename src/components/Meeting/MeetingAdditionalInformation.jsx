import Input from "@codegouvfr/react-dsfr/Input";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingInformations } from "../../constants/meeting";

export function MeetingAdditionalInformations() {
	return <GlobalColContainer>
		<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
		<Input
			className="fr-mb-3w"
			label="Thèmes associés"
		/>
		<Input className="fr-mb-3w" label="Administrations concernées"/>
	</GlobalColContainer>
}
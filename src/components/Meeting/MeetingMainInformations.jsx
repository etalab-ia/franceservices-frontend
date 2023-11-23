import Input from "@codegouvfr/react-dsfr/Input";
import { meetingParagraph, meetingSubtitle } from "../../constants/meeting";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { handleTextareaResize } from "../../utils/manageEffects";

export function	MeetingMainInformations({ setCurrQuestion }) {
	
	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value);
	}

    return <GlobalColContainer>
		<GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
		<GlobalParagraph>{meetingParagraph}</GlobalParagraph>
		<Input
			id="text-area"
			textArea
			className="fr-mt-2w"
			nativeTextAreaProps={{
				onChange: handleChange,
				onInputCapture: handleTextareaResize,
				style: { minHeight: 300 }
			}}
		/>
	</GlobalColContainer>
}
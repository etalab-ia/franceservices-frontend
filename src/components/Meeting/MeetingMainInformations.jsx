import Input from "@codegouvfr/react-dsfr/Input";
import { meetingParagraph, meetingSubtitle } from "../../constants/meeting";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { handleTextareaResize } from "../../utils/manageEffects";
import { MeetingPromptAdvice } from "./MeetingPromptAdvice";

export function	MeetingMainInformations({ currQuestion, setCurrQuestion }) {
	
	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value);
	}

    return <GlobalColContainer>
		<GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
		<MeetingPromptAdvice/>
		<Input
			id="text-area"
			textArea
			className="fr-mt-2w"
			nativeTextAreaProps={{
				onChange: handleChange,
				onInputCapture: handleTextareaResize,
				value: currQuestion,
				style: { minHeight: 300 }
			}}
		/>
	</GlobalColContainer>
}
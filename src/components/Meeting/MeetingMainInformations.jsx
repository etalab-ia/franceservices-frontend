import Input from "@codegouvfr/react-dsfr/Input"
import { meetingParagraph, meetingSubtitle } from "../../constants/meeting"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { GlobalSubtitle } from "../Global/GlobalSubtitle"
import { handleTextareaResize } from "../../utils/manageEffects"
import { MeetingPromptAdvice } from "./MeetingPromptAdvice"
import { CurrQuestionContext } from "../../utils/context/questionContext"
import { useContext } from "react"

export function MeetingMainInformations() {
	const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

	const handleChange = (e) => {
		e.preventDefault()

		updateCurrQuestion({
			...currQuestion,
			query: e.target.value,
		})
	}

	return (
		<GlobalColContainer>
			<GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
			<MeetingPromptAdvice />
			<Input
				id="text-area"
				textArea
				className="fr-mt-2w"
				nativeTextAreaProps={{
					onChange: handleChange,
					onInputCapture: handleTextareaResize,
					value: currQuestion.query,
					style: { minHeight: 300 },
				}}
			/>
		</GlobalColContainer>
	)
}

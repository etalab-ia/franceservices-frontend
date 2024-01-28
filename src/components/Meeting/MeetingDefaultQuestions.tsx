import { useContext } from "react"
import { defaultButtonChoice } from "../../constants/chatbotProps"
import { defaultInputFields, meetingDefaultQuestionsIntroduction } from "../../constants/meeting"
import { CurrQuestionContext } from "../../utils/context/questionContext"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { Button } from "@codegouvfr/react-dsfr/Button"

export function MeetingDefaultQuestions({ setContext }) {
	const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

	const handleClick = (field) => {
		updateCurrQuestion({
			...currQuestion,
			query: field.question,
		})
		setContext({ themes: field.themes, administrations: field.administrations })
	}

	return (
		<GlobalRowContainer>
			<span className="fr-p-2w" style={{ background: "var(--background-alt-blue-france)" }}>
				{meetingDefaultQuestionsIntroduction}
				{defaultInputFields.map((field, index) => {
					return (
						<Button
							key={index}
							priority="secondary"
							// @ts-expect-error TS(2322): Type '{ children: string; key: number; priority: "... Remove this comment to see the full error message
							role={defaultButtonChoice(field.title)}
							onClick={() => handleClick(field)}
							className="w-full fr-my-3v justify-center"
						>
							{field.title}
						</Button>
					)
				})}
			</span>
		</GlobalRowContainer>
	)
}

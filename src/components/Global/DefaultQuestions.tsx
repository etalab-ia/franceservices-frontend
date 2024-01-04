import { useDispatch, useSelector } from "react-redux"
import { defaultButtonChoice, defaultQuestions } from "../../constants/chatbotProps"
import { setNewQuestion } from "../../utils/newQuestion"
import { DefaultQuestionsContainer } from "./DefaultQuestionsContainer"
import { RootState } from "types"

export const DefaultQuestions = () => {
	const dispatch = useDispatch()
	const stream = useSelector((state: RootState) => state.stream)

	const handleClick = (question) => {
		setNewQuestion(dispatch, question, stream.historyStream, true)
	}

	return (
		<DefaultQuestionsContainer>
			{defaultQuestions.map((question, index) => {
				return (
					<button
						key={index}
						role={defaultButtonChoice(question)}
						onClick={() => handleClick(question)}
						className="user-feedback-buttons max-h-fit fr-text--xs"
					>
						{question}
					</button>
				)
			})}
		</DefaultQuestionsContainer>
	)
}

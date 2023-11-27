import { useDispatch, useSelector } from "react-redux";
import { defaultQuestions } from "../../constants/chatbotProps"
import { GlobalRowContainer } from "./GlobalRowContainer";
export const    DefaultQuestionsContainer = ({ children }) => {
	const   stream = useSelector((state) => state.stream);

	return (
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			{!stream.isStreaming ? 
				<div className="fr-mb-3v flex justify-center w-5/6">
					{children}
				</div>
				:
				<></>
			}
		</GlobalRowContainer>
	)
}
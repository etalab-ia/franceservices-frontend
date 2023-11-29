import { defaultButtonChoice } from "../../constants/chatbotProps";
import { defaultInputFields } from "../../constants/meeting";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function MeetingDefaultQuestions({ setCurrQuestion, setContext }) {
    
    const   handleClick = (field) => {
        setCurrQuestion(field.question);
        setContext({ themes: field.themes, administrations: field.administrations });
    }

	return <GlobalRowContainer>
        {defaultInputFields.map((field, index) => {
			return <button
				key={index}
				role={defaultButtonChoice(field.title)}
				onClick={() => handleClick(field)}
				className="user-feedback-buttons max-h-fit fr-text--xs"
			>
				{field.title}
			</button>
		})}
	</GlobalRowContainer>
}
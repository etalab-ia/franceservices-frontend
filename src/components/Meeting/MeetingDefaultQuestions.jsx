import { defaultButtonChoice } from "../../constants/chatbotProps";
import { defaultInputFields, meetingDefaultQuestionsIntroduction } from "../../constants/meeting";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { Button } from "@codegouvfr/react-dsfr/Button";

export function MeetingDefaultQuestions({ setCurrQuestion, setContext }) {
    
    const   handleClick = (field) => {
        setCurrQuestion(field.question);
        setContext({ themes: field.themes, administrations: field.administrations });
    }

	return <GlobalRowContainer>
		<span className="fr-p-2w" style={{ background: 'var(--background-alt-blue-france)'}}>
			{meetingDefaultQuestionsIntroduction}
			{defaultInputFields.map((field, index) => {
				return <Button
					key={index}
					priority="secondary"
					role={defaultButtonChoice(field.title)}
					onClick={() => handleClick(field)}
					className="w-full fr-my-3v justify-center"
				>
					{field.title}
				</Button>
			})}
		</span>
	</GlobalRowContainer>
}
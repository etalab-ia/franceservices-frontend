import { ModifyButton } from "../Global/ModifyButton";

export function MeetingEditQuestion({ setGenerate }) {

	const   handleClick = async() => {
		setGenerate(false);
	}

	return <ModifyButton handleClick={handleClick} text="Modifier" extraClass="underline"/>
}
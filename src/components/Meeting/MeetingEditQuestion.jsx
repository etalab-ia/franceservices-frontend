import { useDispatch } from "react-redux";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function MeetingEditQuestion({ setGenerate }) {
	const	dispatch = useDispatch();

	const   handleClick = async() => {
		dispatch({ type: 'SET_INITIAL_STREAM'});
		setGenerate(false);
	}

	return <GlobalRowContainer>
		<p
			className="fr-pt-1w fr-text--xs underline cursor-pointer"
			onClick={handleClick}
		>
			Modifier
		</p>
	</GlobalRowContainer>
}
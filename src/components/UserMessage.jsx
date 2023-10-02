import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { usePost } from "../utils/hooks";

export function UserMessage(props) {

	const { state, dispatch } = props;

	const	handleChange = (e) => {
		e.preventDefault();

		dispatch({ type: 'SET_USER_TEXT', nextUserText: e.target.value})
	}

	const	handleClick = () => {
		usePost(state, dispatch);
	}

	return (
		<SearchBar
			className="user-chat"
			label="Poser votre question"
			onButtonClick={handleClick}
			onChange={handleChange}
		/>
	);
}
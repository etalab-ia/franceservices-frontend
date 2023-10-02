import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { usePost } from "../utils/hooks";
import { useState } from "react";

export function UserMessage(props) {

	const { state, dispatch } = props;
	const	[currQuestion, setCurrQuestion] = useState('');

	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value)
	}

	const	handleClick = () => {
		dispatch({ type: 'SET_USER_TEXT', nextUserText: currQuestion});
		state.messages.push(currQuestion);
		usePost(state, dispatch);
	}

	return (
		<SearchBar
			className="user-question"
			label="Poser votre question"
			onButtonClick={handleClick}
			onChange={handleChange}
		/>
	);
}
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { usePost } from "../utils/hooks";
import { useState } from "react";
import { useEffect } from "react";
export function UserMessage(props) {

	const	{ state, dispatch } = props;
	const	[currQuestion, setCurrQuestion] = useState('');
	
	useEffect(() => {}, [state])

	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value)
	}

	const	handleClick = () => {
		const joinedRes = state.response.slice(1).join('');

		dispatch({ type: 'SET_USER_TEXT', nextUserText: currQuestion});
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: joinedRes, sender: 'agent'} })
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: currQuestion, sender: 'user'} })

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
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

			
		const joinedRes = state.response.join('');
		const newAgentMessage = {
			text: joinedRes,
			sender: 'agent'
		}
		dispatch({ type: 'SET_MESSAGES', nextMessage: newAgentMessage })
		const newUserMessage = {
			text: currQuestion,
			sender: 'user'
		}
		dispatch({ type: 'SET_MESSAGES', nextMessage: newUserMessage })

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
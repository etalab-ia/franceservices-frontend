import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { usePost } from "../../utils/hooks";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSheets } from "../../utils/setData";

export function UserMessage() {
	const	auth = useSelector((state) => state.auth);
	const	question = useSelector((state) => state.user.question);
	const	ressources = useSelector((state) => state.ressources);
	const	history = useSelector((state) => state.history);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	const	[currQuestion, setCurrQuestion] = useState('');
	
	useEffect(() => {}, [stream]);

	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value)
	}

	const	handleClick = () => {
		dispatch({ type: 'SET_USER_TEXT', nextUserText: currQuestion});
		
		if (stream.historyStream.length)
			dispatch({ type: 'SET_MESSAGES', nextMessage: { text: stream.historyStream, sender: 'agent' } });
		dispatch({ type: 'RESET_STREAM_HISTORY' });
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: currQuestion, sender: 'user'} })
	}

	useEffect(() => {
		if (!question.user_text.length || !ressources.isConfirmed)
			return ;
		usePost(auth, user, dispatch);
		getSheets(question, auth, dispatch);
		dispatch({ type: 'RESET_QUESTION_FIELDS' });
	  }, [question, ressources.isConfirmed]);

	return (
		<SearchBar
			className="user-question"
			label="Poser votre question"
			onButtonClick={handleClick}
			onChange={handleChange}
		/>
	);
}

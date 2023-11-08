import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NOT_SET } from "../../constants/status";
import { postNewQuestion, setNewQuestion } from "../../utils/newQuestion";

export function UserMessage() {
	const	auth = useSelector((state) => state.auth);
	const	ressources = useSelector((state) => state.ressources);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	const	[currQuestion, setCurrQuestion] = useState('');
	
	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value);
	}

	const	handleClick = () => {
		setNewQuestion(dispatch, currQuestion, stream.historyStream);
	}

	useEffect(() => {
		if (!user.question.query.length || ressources.isConfirmed === NOT_SET)
			return ;
		postNewQuestion(dispatch, auth, user.question);
	  }, [user.question, ressources.isConfirmed]);

	return (
		<SearchBar
			className={`user-question ${user.inputVisibility}`}
			label="Poser votre question"
			onButtonClick={handleClick}
			onChange={handleChange}
		/>
	);
}

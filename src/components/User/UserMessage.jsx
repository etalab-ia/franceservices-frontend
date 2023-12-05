import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postNewQuestion, setNewQuestion } from "../../utils/newQuestion";

export function UserMessage() {
	const	auth = useSelector((state) => state.auth);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	const	[currQuestion, setCurrQuestion] = useState('');
	
	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value);
	}

	const	handleClick = () => {
		setNewQuestion(dispatch, currQuestion, stream.historyStream, true);
	}

	useEffect(() => {
		if (!user.question.query.length)
			return ;
		postNewQuestion(dispatch, auth, user.question, user.choices.newQuestion);
	}, [user.question]);

	const	handleRenderInput = (params) => {
		const	newParams = { maxLength: 800 };
		const	updatedParams = { ...params, ...newParams };

  		return <input {...updatedParams} />;
	};

	return (
		<div className="flex justify-center">
			<SearchBar
				label="Poser votre question"
				className='w-5/6'
				onButtonClick={handleClick}
				onChange={handleChange}
				renderInput={handleRenderInput}
			/>
		</div>
	);
}

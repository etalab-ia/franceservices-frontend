import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewQuestion } from "../../utils/newQuestion";

export function MeetingPage() {
	const	user = useSelector((state) => state.user);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	
	useEffect(() => {
		if (!user.question.query.length || user.isChat)
			return ;
		postNewQuestion(dispatch, auth, user.question, user.choices.newQuestion);
	}, [user.question]);

	return <div>cocuou</div>
}
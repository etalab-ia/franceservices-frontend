import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setArchive } from "../../utils/archive";

export function NotifyArchiving() {
	const	archive = useSelector((state) => state.archive);
	const   history = useSelector((state) => state.history);
	const   user = useSelector((state) => state.user);
	const	lastIndex = archive.length - 1;
	const	dispatch = useDispatch();

	useEffect(() => {
		if (user.choices.oldQuestion === user.choices.newQuestion)
			return ;

		setArchive(dispatch, history, user.choices.newQuestion, user.choices);	
	}, [user.choices.newQuestion])

	return (
		<div>
			{notifyArchiving(`« ${archive[lastIndex].question.query} »`)}
			<div className="archive-separation"></div>
		</div>
	);
}
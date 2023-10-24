import { useEffect, useState } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NOT_SET } from "../../constants/status";
import { tags } from "../../constants/tags";

export function NotifyArchiving() {

	const	archive = useSelector((state) => state.archive);
	const   history = useSelector((state) => state.history);
	const   stream = useSelector((state) => state.stream);
	const   ressources = useSelector((state) => state.ressources);
	const   user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	const	[index, setIndex] = useState(NOT_SET);
	// TODO: change with new parameters receive from getSheets()

	useEffect(() => {
		if (user.choices.oldQuestion === user.choices.newQuestion)
			return ;

		const	shuffled = tags.sort(() => 0.5 - Math.random());
		const	selected = shuffled.slice(0, 3);

		dispatch({ 
			type: 'SET_ARCHIVE',
			nextDate: new Date().toLocaleDateString('fr'), 
			nextThemes: selected,
			nextSource: ressources.choices.length !== 0 ? true : false,
			nextMessages: { history: history.messages[0], stream: { text: stream.historyStream[0], sender: 'agent' } }
		});
		dispatch({ type: 'RESET_RESSOURCE'});
		// TODO: see where to put reset feedback
		dispatch({ type: 'RESET_FEEDBACK'});
		dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: user.choices.newQuestion });
	}, [user.choices.newQuestion])

	return (
		<div>
			{notifyArchiving(`Archive n°${archive.length}`)}
			<div className="ml-[114px] mt-[36px] border-t-4 border-[#000091] w-[792px]"></div>
		</div>
	);
}
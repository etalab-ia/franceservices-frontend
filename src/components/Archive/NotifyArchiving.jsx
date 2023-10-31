import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { tags } from "../../constants/tags";

export function NotifyArchiving() {
	const	archive = useSelector((state) => state.archive);
	const   history = useSelector((state) => state.history);
	const   stream = useSelector((state) => state.stream);
	const   user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		if (user.choices.oldQuestion === user.choices.newQuestion)
			return ;

		const	shuffled = tags.sort(() => 0.5 - Math.random());
		const	selected = shuffled.slice(0, 3);
		const	userMessage = history.messages[history.messages.length - 1]
		const	agentMessage = { text: stream.historyStream[0], sender: 'agent' }
		const	updatedMessage = [ userMessage, agentMessage ];

		console.log('q: ', user.question)

		dispatch({ 
			type: 'SET_ARCHIVE',
			nextDate: new Date().toLocaleDateString('fr'), 
			nextThemes: selected,
			nextSource: user.question.model_name,
			nextMessages: updatedMessage,
			// nextUserChoices: user.choices,
		});
		dispatch({ type: 'RESET_RESSOURCE'});
		dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: user.choices.newQuestion });
	}, [user.choices.newQuestion])

	return (
		<div>
			{notifyArchiving(`Archive n°${archive.length}`)}
			<div className="ml-[114px] mt-[36px] border-t-4 border-[#000091] w-[1000px]"></div>
		</div>
	);
}
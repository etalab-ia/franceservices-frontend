import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function NotifyArchiving() {

	const	archive = useSelector((state) => state.archive);
	const   history = useSelector((state) => state.history);
	const   stream = useSelector((state) => state.stream);
	const   ressources = useSelector((state) => state.ressources);
	const   user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	// TODO: change with new parameters receive from getSheets()
	const	tags = ['Tag 1', 'Tag 2', 'Tag 3'];

	useEffect(() => {
		dispatch({ 
			type: 'SET_ARCHIVE', 
			nextDate: new Date().toLocaleDateString('fr'), 
			nextThemes: tags,
			nextSource: ressources.choices.length !== 0 ? true : false,
			nextMessages: { history: history.messages[0], stream: { text: stream.historyStream[0], sender: 'agent' } }
		});
		dispatch({ type: 'RESET_RESSOURCE'});
	}, [user.choices.newQuestion])

	return (
		<div>
			{notifyArchiving(`Archive n°${archive.length}`)}
			<div className="ml-[114px] mt-[36px] border-t-4 border-[#000091] w-[792px]"></div>
		</div>
	);
}
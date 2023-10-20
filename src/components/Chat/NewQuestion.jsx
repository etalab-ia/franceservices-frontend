import { useEffect, useState } from "react";
import { redoUserQuestion } from "../../constants/chatbotProps";
import { BotQuestion } from "../Global/BotQuestion";
import { Avatar } from "./Avatar";
import { NOT_SET } from "../../constants/status";
import { NotifyArchiving } from "../Archive/NotifyArchiving";
import { useDispatch, useSelector } from "react-redux";

export function NewQuestion({ tabs }) {
	const	[display, setDisplay] = useState(NOT_SET);
	const	stream = useSelector((state) => state.stream);
	const	history = useSelector((state) => state.history);
	const	dispatch = useDispatch();

	console.log('active tab is: ', tabs.activeTab)

	useEffect(() => {
		// console.log('new effect')
		// dispatch({ type: 'SET_MESSAGES', nextMessage: { text: stream.historyStream, sender: 'agent' }}) 
	}, [stream.historyStream]);

	console.log('my message are: ', history.messages)
	return (
		<div className="col-message">
			<div className="row-message ml-[114px]">
				<Avatar user='agent' />
				<p className="flex items-center ml-4">{redoUserQuestion}</p>
			</div>
			<BotQuestion setDisplay={setDisplay}/>
			{display !== -1 && <NotifyArchiving />}
		</div>
	);
}
import { useEffect } from "react";
import { redoUserQuestion } from "../../constants/chatbotProps";
import { BotQuestion } from "../Global/BotQuestion";
import { Avatar } from "./Avatar";
import { NOT_SET } from "../../constants/status";
import { NotifyArchiving } from "../Archive/NotifyArchiving";
import { useDispatch, useSelector } from "react-redux";

export function NewQuestion() {
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		const	visibility = user.choices.newQuestion ? 'hidden' : 'visible';
		
		dispatch({ type: 'SET_INPUT_VISIBILITY', nextVisibility: visibility });
	}, [user.choices.newQuestion]);

	return (
		<div className="col-message">
			<div className="row-message ml-[114px]">
				<Avatar user='agent' />
				<p className="flex items-center ml-4">{redoUserQuestion}</p>
			</div>
			<BotQuestion id='newQuestion'/>
			{user.choices.newQuestion !== NOT_SET && <NotifyArchiving />}
		</div>
	);
}
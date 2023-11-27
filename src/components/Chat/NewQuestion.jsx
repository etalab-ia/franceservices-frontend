import { useEffect } from "react";
import { redoUserQuestion } from "../../constants/chatbotProps";
import { BotQuestion } from "../Global/BotQuestion";
import { Avatar } from "./Avatar";
import { NOT_SET } from "../../constants/status";
import { NotifyArchiving } from "../Archive/NotifyArchiving";
import { useDispatch, useSelector } from "react-redux";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function NewQuestion() {
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		const	visibility = user.choices.newQuestion ? 'hidden' : 'visible';

		dispatch({ type: 'SET_INPUT_VISIBILITY', nextVisibility: visibility });
	}, [user.choices.newQuestion]);

	return (
		<>
			<GlobalRowContainer>
				<Avatar
					user='agent'
				/>
				<p className="streaming fr-mb-2w fr-p-3v fr-ml-3v">
					{redoUserQuestion}
				</p>
			</GlobalRowContainer>
			<BotQuestion
				id='newQuestion'
				choice={user.choices.newQuestion}
			/>
			{user.choices.newQuestion !== NOT_SET && <NotifyArchiving />}
		</>
	);
}